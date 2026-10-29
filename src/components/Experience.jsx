import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BsPersonWorkspace, BsBriefcase, BsCalendar } from "react-icons/bs";
import { FiExternalLink, FiMapPin, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegIdBadge, FaTools } from "react-icons/fa";
import { Award, Info, NotepadText } from "lucide-react";
import GlowCard from "../shared/GlowCard";
import projectsData from "../data/project/projects.js";
import "./css/Experience.css";
import { Link } from "react-router-dom";

const parseStartDate = (duration = "") => {
    const [start] = duration.split("-");
    const timestamp = Date.parse(`1 ${start?.trim()}`);
    return Number.isNaN(timestamp) ? 0 : timestamp;
};

const Experience = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const cardRefs = useRef([]);
    const scrollTimerRef = useRef(null);
    const controlsRowRef = useRef(null);
    const controlsRef = useRef(null);
    const viewAllRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isInView, setIsInView] = useState(false);

    const experiences = [
        ...(projectsData["team-project"] || []),
        ...(projectsData["client-project"] || []),
        ...(projectsData["working-project"] || []),
        // ...(projectsData["my-project"] || []),
    ]
        .filter(exp => exp.experienceShow === true)
        .sort((a, b) => parseStartDate(b.duration) - parseStartDate(a.duration));

    const carouselExperiences = experiences.slice(0, 3);
    const showViewAll = experiences.length > 3;

    // Intersection Observer for section scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        setIsInView(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const section = sectionRef.current;
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    // Cleanup pending scroll timer
    useEffect(() => {
        return () => {
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        };
    }, []);

    // Animate View All button from center to its between position
    useLayoutEffect(() => {
        if (!isInView || !showViewAll) return;

        const row = controlsRowRef.current;
        const controls = controlsRef.current;
        const button = viewAllRef.current;
        if (!row || !controls || !button) return;
        if (window.matchMedia("(max-width: 767px)").matches) return;

        const rowRect = row.getBoundingClientRect();
        const controlsRect = controls.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const rowCenter = rowRect.left + rowRect.width / 2;
        const controlsOffset =
            rowCenter - (controlsRect.left + controlsRect.width / 2);
        const buttonOffset =
            rowCenter - (buttonRect.left + buttonRect.width / 2);

        controls.style.transition = "none";
        controls.style.transform = `translateX(${controlsOffset}px)`;
        button.style.transition = "none";
        button.style.transform = `translateX(${buttonOffset}px)`;
        button.style.opacity = "0";

        const timer = setTimeout(() => {
            controls.style.transition =
                "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)";
            controls.style.transform = "translateX(0)";
            button.style.transition =
                "transform 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms ease";
            button.style.transform = "translateX(0)";
            button.style.opacity = "1";
        }, 30);

        return () => clearTimeout(timer);
    }, [isInView, showViewAll]);

    const updateActiveIndex = () => {
        const track = trackRef.current;
        if (!track) return;

        const trackRect = track.getBoundingClientRect();
        const edge = trackRect.left + 8;

        let closest = 0;
        let minDistance = Infinity;

        cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const distance = Math.abs(card.getBoundingClientRect().left - edge);
            if (distance < minDistance) {
                minDistance = distance;
                closest = index;
            }
        });

        setActiveIndex(closest);
    };

    const handleScroll = () => {
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => {
            scrollTimerRef.current = null;
            updateActiveIndex();
        }, 100);
    };

    const scrollToIndex = (index) => {
        const track = trackRef.current;
        const card = cardRefs.current[index];
        if (!track || !card) return;

        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const target = track.scrollLeft + (cardRect.left - trackRect.left);

        track.scrollTo({ left: target, behavior: "smooth" });
        setActiveIndex(index);
    };

    const goPrev = () => scrollToIndex(Math.max(activeIndex - 1, 0));
    const goNext = () => scrollToIndex(Math.min(activeIndex + 1, carouselExperiences.length - 1));

    if (experiences.length === 0) {
        return (
            <div className="bg-gray-100 dark:bg-black py-7 lg:py-20">
                <div className="container max-w-8xl mx-auto px-4 text-2xl font-semibold text-center">
                    <p className="text-gray-500 dark:text-gray-400">No experiences to display</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={sectionRef}
            id="experience"
            className="dark:bg-black py-7 lg:py-20 overflow-hidden"
        >
            <div className="container max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-10 px-4">
                    <div className="flex items-center mb-4 animate-on-scroll fade-in-left">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
                            Experience
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <p className="md:text-[1.3rem] max-w-3xl mx-auto leading-relaxed dark:text-gray-300 animate-on-scroll fade-in-right delay-1">
                        A showcase of my collaborative projects and team-based development experiences
                    </p>
                </div>

                {/* Carousel */}
                <div className="animate-on-scroll fade-in-right delay-2">
                    <div
                        ref={trackRef}
                        onScroll={handleScroll}
                        className="carousel-track flex snap-x snap-mandatory gap-6 overflow-x-auto pt-2 pb-4"
                    >
                        {carouselExperiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                className="group w-full flex-shrink-0 snap-start"
                            >
                                <GlowCard identifier={`exp-${exp.id}`} className="h-full">
                                    <div className="flex h-full flex-col p-6 lg:p-8">
                                        {/* Type, funding & duration */}
                                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-300 border border-blue-500/20">
                                                    <BsBriefcase />
                                                    {exp.projectType || "Project"}
                                                </span>

                                                {exp.fundedStatus && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-sm font-semibold text-green-400 border border-green-500/20">
                                                        <span>💰</span>
                                                        {exp.fundedStatus}
                                                    </span>
                                                )}
                                            </div>

                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-sm font-medium text-gray-300 border border-white/10">
                                                <BsCalendar size={14} />
                                                {exp.duration}
                                            </span>
                                        </div>

                                        <div className="grid flex-1 gap-6 lg:grid-cols-4">
                                            {/* Main info */}
                                            <div className="lg:col-span-2">
                                                <h3 className="mb-1 text-2xl font-bold text-white lg:text-3xl">
                                                    {exp.title}
                                                </h3>
                                                <p className="mb-3 text-[1.1rem] text-blue-300">
                                                    @ {exp.organization}
                                                </p>

                                                <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[1rem] text-gray-300">
                                                    {exp.designation && (
                                                        <div className="flex items-center gap-1.5">
                                                            <FaRegIdBadge size={15} className="text-blue-400 flex-shrink-0" />
                                                            <span className="font-semibold text-blue-200">{exp.designation}</span>
                                                        </div>
                                                    )}

                                                    {exp.projectStatus && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Info size={15} className="text-blue-400 flex-shrink-0" />
                                                            <span className="font-semibold text-blue-200">{exp.projectStatus}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-1.5">
                                                        <FiMapPin size={15} className="text-blue-400 flex-shrink-0" />
                                                        <span>{exp.location}</span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5">
                                                        <BsPersonWorkspace size={15} className="text-blue-400 flex-shrink-0" />
                                                        <span>{exp.stack || "Full Stack"}</span>
                                                    </div>
                                                </div>

                                                {exp.shortDescription && (
                                                    <p className="mb-4 text-[1.05rem] leading-relaxed text-gray-300 line-clamp-4">
                                                        {exp.shortDescription}
                                                    </p>
                                                )}

                                                {exp.topTech && exp.topTech.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {exp.topTech.slice(0, 8).map((tech, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="flex items-center gap-1 rounded-full bg-blue-500/5 px-2 py-0.5 text-[0.9rem] text-blue-400 border border-blue-500/20"
                                                            >
                                                                {tech.icon && (
                                                                    <img
                                                                        src={tech.icon}
                                                                        alt={tech.name}
                                                                        className="w-3 h-3 inline-block"
                                                                    />
                                                                )}
                                                                {tech.name}
                                                            </span>
                                                        ))}
                                                        {exp.topTech.length > 8 && (
                                                            <span className="rounded-full bg-blue-500/5 px-2 py-0.5 text-[0.9rem] text-blue-400 border border-blue-500/20">
                                                                +{exp.topTech.length - 8}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Valuable details */}
                                            <div className="lg:col-span-2 lg:border-l lg:border-blue-500/20 lg:pl-6">
                                                {exp.responsibilities && exp.responsibilities.length > 0 && (
                                                    <div>
                                                        <h4 className="mb-2 flex items-center gap-1.5 text-lg font-semibold text-white">
                                                            <NotepadText size={18} className="text-[#3b82f6]" />
                                                            Key Responsibilities
                                                        </h4>
                                                        <ul className="space-y-1 text-[1.03rem]">
                                                            {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3b82f6]"></span>
                                                                    <span>{resp}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {exp.achievements && exp.achievements.length > 0 && (
                                                    <div className={exp.responsibilities?.length ? "mt-4" : ""}>
                                                        <h4 className="mb-2 flex items-center gap-1.5 text-lg font-semibold text-white">
                                                            <Award size={18} className="text-[#3b82f6]" />
                                                            Key Achievements
                                                        </h4>
                                                        <ul className="space-y-1 text-[1.03rem]">
                                                            {exp.achievements.slice(0, 3).map((achievement, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                                    <span className="text-blue-400">•</span>
                                                                    <span>{achievement}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-blue-500/20 pt-4">
                                            <Link to={`/projectDetails/${exp.id}`}>
                                                <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 text-[1.02rem] font-semibold text-white transition-all duration-300 active:scale-[0.95] hover:shadow-lg hover:shadow-blue-500/30 group/btn">
                                                    <span>Project Details</span>
                                                    <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                </button>
                                            </Link>

                                            {exp.demoLink && (
                                                <a
                                                    href={exp.demoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-lg border border-blue-500/40 px-4 py-2 text-[1.02rem] font-semibold text-blue-300 transition-all duration-300 active:scale-[0.95] hover:bg-blue-500/10 hover:text-white"
                                                >
                                                    Live Demo
                                                    <FiExternalLink size={15} />
                                                </a>
                                            )}

                                            {exp.topTech && exp.topTech.length > 0 && (
                                                <span className="ml-auto hidden items-center gap-1.5 text-sm text-gray-400 sm:inline-flex">
                                                    <FaTools size={14} className="text-blue-400" />
                                                    {exp.topTech.length}+ technologies
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </GlowCard>
                            </div>
                        ))}
                    </div>

                    <div ref={controlsRowRef} className={`mt-5 flex flex-col items-center gap-6 md:flex-row ${showViewAll ? "md:justify-between" : "md:justify-center"}`}>
                        {/* Progress dots & arrows */}
                        <div ref={controlsRef} className="flex items-center justify-center gap-4">
                            <button
                                onClick={goPrev}
                                disabled={activeIndex === 0}
                                aria-label="Previous experience"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 transition-all duration-300 hover:bg-blue-500/15 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <FiChevronLeft size={20} />
                            </button>

                            <div className="flex items-center">
                                {carouselExperiences.map((exp, index) => {
                                    const isActive = activeIndex === index;

                                    return (
                                        <button
                                            key={exp.id}
                                            onClick={() => scrollToIndex(index)}
                                            aria-label={`Go to ${exp.title}`}
                                            aria-current={isActive}
                                            className="group/dot flex h-2 w-6 items-center justify-center"
                                        >
                                            <span
                                                className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ease-out ${isActive
                                                    ? "w-6 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                    : "w-2 group-hover/dot:w-3"
                                                    }`}
                                            >
                                                <span
                                                    className={`absolute inset-0 rounded-full bg-gray-300 transition-all duration-500 ease-out dark:bg-gray-700 group-hover/dot:bg-blue-400 ${isActive ? "opacity-0" : "opacity-100"
                                                        }`}
                                                />
                                                <span
                                                    className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-opacity duration-500 ease-out ${isActive ? "opacity-100" : "opacity-0"
                                                        }`}
                                                />
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={goNext}
                                disabled={activeIndex === carouselExperiences.length - 1}
                                aria-label="Next experience"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 transition-all duration-300 hover:bg-blue-500/15 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <FiChevronRight size={20} />
                            </button>
                        </div>

                        {/* View all */}
                        {showViewAll && (
                            <div ref={viewAllRef} className="flex justify-center">
                                <Link to="/all-experiences">
                                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-300/10 dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-500 text-blue-600 font-semibold rounded-xl dark:text-white hover:bg-white dark:hover:bg-blue-900 hover:border-blue-600 transition-all duration-300 active:scale-95 group/btn text-[1.1rem]">
                                        View All Experiences
                                        <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;








// import React, { useEffect, useRef, useState } from "react";
// import { BsPersonWorkspace, BsCode, BsAward, BsCalendar, BsBriefcase } from "react-icons/bs";
// import { FiExternalLink, FiMapPin } from "react-icons/fi";
// import GlowCard from "../shared/GlowCard";
// import projectsData from '../data/project/projects.js';
// import "./css/Experience.css";
// import { Link } from "react-router-dom";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { FaDatabase, FaRegIdBadge, FaTools } from "react-icons/fa";
// import { Award, Info, NotepadText } from "lucide-react";

// const Experience = () => {
//     const [activeExperience, setActiveExperience] = useState(0);
//     const [visibleExperiences, setVisibleExperiences] = useState(3); // Default to 3 for large screens
//     const sectionRef = useRef(null);
//     const contentWrapperRef = useRef(null);

//     // Get experiences from ALL categories where experienceShow is true
//     const allExperiences = [
//         ...(projectsData["team-project"] || []),
//         ...(projectsData["client-project"] || []),
//         ...(projectsData["working-project"] || []),
//         ...(projectsData["my-project"] || []),
//     ].filter(exp => exp.experienceShow === true);

//     // Responsive logic to show different number of experiences based on screen size
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 1024) { // lg breakpoint (1024px)
//                 setVisibleExperiences(3);
//             } else {
//                 setVisibleExperiences(2);
//             }
//         };

//         // Set initial value
//         handleResize();

//         // Add event listener
//         window.addEventListener('resize', handleResize);

//         // Cleanup
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Show experiences based on screen size
//     const experiences = allExperiences.slice(0, visibleExperiences);

//     // Reset active experience when visible experiences change
//     useEffect(() => {
//         if (activeExperience >= experiences.length) {
//             setActiveExperience(0);
//         }
//     }, [experiences.length, activeExperience]);

//     // Intersection Observer for scroll animations
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('in-view');
//                     }
//                 });
//             },
//             { threshold: 0.1 }
//         );

//         if (sectionRef.current) {
//             observer.observe(sectionRef.current);
//         }

//         return () => {
//             if (sectionRef.current) {
//                 observer.unobserve(sectionRef.current);
//             }
//         };
//     }, []);

//     // Handle content change animation when clicking different experiences
//     useEffect(() => {
//         if (contentWrapperRef.current) {
//             contentWrapperRef.current.style.animation = 'none';
//             // Force reflow
//             void contentWrapperRef.current.offsetHeight;
//             contentWrapperRef.current.style.animation = 'slideInContent 0.4s ease-out forwards';
//         }
//     }, [activeExperience]);

//     if (experiences.length === 0) {
//         return (
//             <div className="bg-gray-100 dark:bg-black py-7 lg:py-20">
//                 <div className="container max-w-8xl mx-auto px-4 text-2xl font-semibold text-center">
//                     <p className="text-gray-500 dark:text-gray-400">No experiences to display</p>
//                 </div>
//             </div>
//         );
//     }

//     const activeExp = experiences[activeExperience];

//     return (
//         <div
//             ref={sectionRef}
//             id="experience"
//             className="dark:bg-black py-7 lg:py-20 overflow-hidden lg:overflow-visible"
//         >
//             <div className="container max-w-7xl mx-auto px-4">
//                 {/* Header Section - Animated */}
//                 <div className="flex flex-col items-center text-center mb-10 px-4">
//                     <div className="flex items-center mb-4 animate-on-scroll fade-in-left">
//                         <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                         <span className="px-6 text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
//                             Experience
//                         </span>
//                         <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                     </div>
//                     <p className="md:text-[1.3rem] max-w-3xl mx-auto leading-relaxed dark:text-gray-300 animate-on-scroll fade-in-right delay-1">
//                         A showcase of my collaborative projects and team-based development experiences
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-8">
//                     {/* LEFT SIDE Content - Full Content Animation */}
//                     <div className="order-2 lg:order-1 lg:col-span-3">
//                         {activeExp && (
//                             <div
//                                 ref={contentWrapperRef}
//                                 className="experience-content-wrapper rounded-2xl bg-gradient-to-br from-[#0a0a1a] to-[#0f1030] p-6 shadow-xl shadow-blue-500/5 backdrop-blur-sm lg:p-8"
//                             >
//                                 {/* Each section inside has staggered animation on scroll */}
//                                 <div className="animate-on-scroll fade-in-left delay-2">
//                                     {/* Project Header */}
//                                     <div className="mb-4 border-b border-blue-500/20 pb-4">
//                                         <div className="mb-4 flex flex-wrap justify-between items-center gap-2">
//                                             <div className="flex items-center gap-2 text-[#3b82f6]">
//                                                 <BsBriefcase className="text-xl" />
//                                                 <span className="text-[1.1rem] font-medium">{activeExp.projectType || "Project"}</span>
//                                             </div>

//                                             {/* Funding Status Badge */}
//                                             {activeExp.fundedStatus && (
//                                                 <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2 py-1 text-sm font-semibold text-green-400 border border-green-500/30">
//                                                     <span>💰</span>
//                                                     {activeExp.fundedStatus}
//                                                 </span>
//                                             )}

//                                             {/* If it's a grant/scholarship */}
//                                             {/* {activeExp.grantType && (
//                                                 <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-400 border border-purple-500/30">
//                                                     {activeExp.grantType}
//                                                 </span>
//                                             )} */}
//                                         </div>
//                                         <h2 className="mb-2 text-2xl font-bold text-white lg:text-3xl">
//                                             {activeExp.title}
//                                         </h2>
//                                         <h3 className="mb-2 text-[1.25rem] text-blue-300">
//                                             @ {activeExp.organization}
//                                         </h3>

//                                         {/* Designation Section */}
//                                         {activeExp?.designation && (
//                                             <div className="mb-3 flex items-center gap-1.5 text-gray-300">
//                                                 <FaRegIdBadge className="text-blue-400" size={18} />
//                                                 {/* <span className="text-[1.2rem]">Role: </span> */}
//                                                 <span className="text-[1.2rem] font-semibold text-blue-200">{activeExp?.designation}</span>
//                                             </div>
//                                         )}

//                                         {/* Project Status */}
//                                         {activeExp?.projectStatus && (
//                                             <div className="mb-3 flex items-center gap-1.5 text-gray-300">
//                                                 <Info className="text-blue-400" size={18} />
//                                                 {/* <span className="text-[1.15rem]">Status: </span> */}
//                                                 <span className="text-[1.15rem] font-semibold text-blue-200">{activeExp?.projectStatus}</span>
//                                             </div>
//                                         )}

//                                         <div className="flex flex-wrap gap-4 text-[1.1rem] text-gray-300">
//                                             <div className="flex items-center gap-2">
//                                                 <BsCalendar size={16} className="text-blue-400" />
//                                                 <span>{activeExp.duration}</span>
//                                             </div>
//                                             <div className="flex items-center gap-1.5">
//                                                 <FiMapPin size={16} className="text-blue-400" />
//                                                 <span>{activeExp.location}</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <BsPersonWorkspace size={16} className="text-blue-400" />
//                                                 <span>{activeExp.stack || "Full Stack"}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Description - Animated */}
//                                 {activeExp.description && (
//                                     <div className="animate-on-scroll fade-in-left delay-3 mb-6 text-justify">
//                                         <p className="text-[1.2rem] text-gray-300">
//                                             {activeExp.shortDescription}
//                                         </p>
//                                     </div>
//                                 )}

//                                 {/* Responsibilities - Animated */}
//                                 {activeExp.responsibilities && activeExp.responsibilities.length > 0 && (
//                                     <div className="animate-on-scroll fade-in-left delay-4 mb-6">
//                                         <h4 className="mb-3 flex items-center gap-1.5 text-2xl font-semibold text-white">
//                                             <NotepadText size={22} className="text-[#3b82f6]" />
//                                             Key Responsibilities
//                                         </h4>
//                                         <ul className="space-y-0.5 text-[1.2rem]">
//                                             {activeExp.responsibilities.map((resp, idx) => (
//                                                 <li key={idx} className="flex items-start gap-2 text-gray-300">
//                                                     <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3b82f6]"></span>
//                                                     <span>{resp}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}

//                                 {/* Tech Stack - Animated */}
//                                 {activeExp.topTech && activeExp.topTech.length > 0 && (
//                                     <div className="animate-on-scroll fade-in-left delay-5 mb-6">
//                                         <h4 className="flex items-center gap-2 mb-3 text-2xl font-semibold text-white">
//                                             <FaTools size={17} className="text-[#3b82f6]" />
//                                             Tech Stack
//                                         </h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {activeExp.topTech.map((tech, idx) => (
//                                                 <span
//                                                     key={idx}
//                                                     className="rounded-full bg-blue-500/10 px-3 py-1 text-[1.05rem] font-semibold text-blue-400 border border-blue-500/20 flex items-center gap-1"
//                                                 >
//                                                     {tech.icon && (
//                                                         <img
//                                                             src={tech.icon}
//                                                             alt={tech.name}
//                                                             className="w-3.5 h-3.5 inline-block"
//                                                         />
//                                                     )}
//                                                     {tech.name}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Achievements - Animated */}
//                                 {activeExp.achievements && activeExp.achievements.length > 0 && (
//                                     <div className="animate-on-scroll fade-in-left delay-6 mb-6">
//                                         <h4 className="mb-3 flex items-center gap-1 text-2xl font-semibold text-white">
//                                             <Award size={20} className="text-[#3b82f6]" />
//                                             Key Achievements
//                                         </h4>
//                                         <ul className="space-y-0.5 text-[1.2rem]">
//                                             {activeExp.achievements.map((achievement, idx) => (
//                                                 <li key={idx} className="flex items-start gap-2 text-gray-300">
//                                                     <span className="text-blue-400">•</span>
//                                                     <span>{achievement}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}

//                                 {/* Buttons - Animated */}
//                                 <div className="animate-on-scroll fade-in-left delay-7 flex items-center gap-4">
//                                     {activeExp.demoLink && (
//                                         <a
//                                             href={activeExp.demoLink}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 text-[1.1rem] font-semibold text-white transition-all duration-300 active:scale-[0.95] hover:shadow-lg hover:shadow-blue-500/30"
//                                         >
//                                             Live Link
//                                             <FiExternalLink size={16} />
//                                         </a>
//                                     )}

//                                     <Link to={`/projectDetails/${activeExp.id}`}>
//                                         <button className="inline-flex items-center justify-between gap-2 px-4 py-2 border border-gray-500/50 bg-transparent hover:bg-blue-500/10 hover:border-blue-500/50 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-800 text-white font-semibold text-[1.1rem] hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.95] group/btn">
//                                             <span>Project Details</span>
//                                             <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* RIGHT SIDE Cards - Responsive grid */}
//                     <div className="order-1 lg:order-2 lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
//                         <div className="grid grid-cols-1 gap-6">
//                             {experiences.map((exp, index) => (
//                                 <div
//                                     key={exp.id}
//                                     className={`animate-on-scroll fade-in-right delay-${Math.min(index + 1, 8)}`}
//                                 >
//                                     <GlowCard
//                                         identifier={`exp-${exp.id}`}
//                                         isActive={activeExperience === index}
//                                         onClick={() => setActiveExperience(index)}
//                                     >
//                                         <div className="p-5">
//                                             {/* Duration Badge */}
//                                             <div className="flex items-center justify-between gap-2 mb-3">
//                                                 <div className="flex flex-wrap items-center gap-2">
//                                                     <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-300 border border-blue-500/20">
//                                                         {exp.duration}
//                                                     </span>

//                                                     {/* Funded Badge */}
//                                                     {exp.fundedStatus && (
//                                                         <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-sm font-semibold text-green-400 border border-green-500/20">
//                                                             <span>💰</span>
//                                                             <span>{exp.fundedStatus}</span>
//                                                         </span>
//                                                     )}
//                                                 </div>

//                                                 {/* Active Indicator */}
//                                                 {activeExperience === index && (
//                                                     <div className="flex items-center gap-3 text-sm text-blue-400">
//                                                         <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse-glow"></div>
//                                                         <span className="hidden sm:inline">Currently viewing</span>
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             {/* Title & Organization */}
//                                             <h3 className="mb-1 text-xl font-bold text-white line-clamp-2">
//                                                 {exp.title}
//                                             </h3>
//                                             <p className="mb-2 text-[1.05rem] text-blue-300">
//                                                 @ {exp.organization}
//                                             </p>

//                                             {/* Designation */}
//                                             {exp?.designation && (
//                                                 <div className="mb-2 flex items-center gap-1.5 text-[1.05rem] text-gray-300">
//                                                     <FaRegIdBadge size={14} className="text-blue-400 flex-shrink-0" />
//                                                     <span className="line-clamp-1">{exp?.designation}</span>
//                                                 </div>
//                                             )}

//                                             {/* Location & Type */}
//                                             <div className="mb-3 flex flex-wrap gap-3 text-[1.05rem] text-gray-300">
//                                                 <div className="flex items-center gap-1.5">
//                                                     <FiMapPin size={14} className="text-blue-400 flex-shrink-0" />
//                                                     <span className="line-clamp-1">{exp.location}</span>
//                                                 </div>
//                                                 <div className="flex items-center gap-1.5">
//                                                     <BsPersonWorkspace size={14} className="text-blue-400 flex-shrink-0" />
//                                                     <span className="line-clamp-1">{exp.stack || "Full Stack"}</span>
//                                                 </div>
//                                             </div>

//                                             {/* Tech Stack Preview - Responsive */}
//                                             {exp.topTech && exp.topTech.length > 0 && (() => {
//                                                 // Show 2 tech items on mobile, 4 on desktop
//                                                 const isMobile = window.innerWidth < 640;
//                                                 const visibleCount = isMobile ? 2 : 4;

//                                                 return (
//                                                     <div className="flex flex-wrap gap-1.5">
//                                                         {exp.topTech.slice(0, visibleCount).map((tech, idx) => (
//                                                             <span
//                                                                 key={idx}
//                                                                 className="rounded-full bg-blue-500/5 px-1.5 sm:px-2 py-0.5 text-[1rem] text-blue-400 border border-blue-500/20 flex items-center gap-1"
//                                                             >
//                                                                 {tech.icon && (
//                                                                     <img
//                                                                         src={tech.icon}
//                                                                         alt={tech.name}
//                                                                         className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 inline-block"
//                                                                     />
//                                                                 )}
//                                                                 <span className="hidden sm:inline">{tech.name}</span>
//                                                                 <span className="sm:hidden">{tech.name.substring(0, 6)}{tech.name.length > 6 ? '...' : ''}</span>
//                                                             </span>
//                                                         ))}

//                                                         {exp.topTech.length > visibleCount && (
//                                                             <span className="rounded-full bg-blue-500/5 px-1.5 sm:px-2 py-0.5 text-xs sm:text-sm text-blue-400 border border-blue-500/20">
//                                                                 +{exp.topTech.length - visibleCount}
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 );
//                                             })()}
//                                         </div>
//                                     </GlowCard>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="mt-6 flex justify-center lg:justify-start animate-on-scroll fade-in-right">
//                             <Link to="/all-experiences">
//                                 <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-300/10 dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-500 text-blue-600 font-semibold rounded-xl dark:text-white hover:bg-white dark:hover:bg-blue-900 hover:border-blue-600 transition-all duration-300 active:scale-95 group/btn text-[1.1rem]">
//                                     View All Experiences
//                                     <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
//                                 </button>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Experience;





// // ! All time favorite
// // import React, { useEffect, useRef, useState } from "react";
// // import { BsPersonWorkspace, BsCode, BsAward, BsCalendar, BsBriefcase } from "react-icons/bs";
// // import { FiExternalLink, FiMapPin } from "react-icons/fi";
// // import GlowCard from "../shared/GlowCard";
// // import projectsData from '../data/projects.js';
// // import "./css/Experience.css";
// // import { Link } from "react-router-dom";
// // import { FaArrowRightLong } from "react-icons/fa6";
// // import { FaDatabase, FaRegIdBadge, FaTools } from "react-icons/fa";
// // import { Award, NotepadText } from "lucide-react";

// // const Experience = () => {
// //     const [activeExperience, setActiveExperience] = useState(0);
// //     const sectionRef = useRef(null);
// //     const contentWrapperRef = useRef(null);

// //     // Get experiences from ALL categories where experienceShow is true
// //     const allExperiences = [
// //         ...(projectsData["client-project"] || []),
// //         ...(projectsData["team-project"] || []),
// //         ...(projectsData["working-project"] || []),
// //         ...(projectsData["my-project"] || []),
// //     ].filter(exp => exp.experienceShow === true);

// //     // Show only first 3 experiences in the compact Experience component
// //     const experiences = allExperiences.slice(0, 3);

// //     // Intersection Observer for scroll animations
// //     useEffect(() => {
// //         const observer = new IntersectionObserver(
// //             (entries) => {
// //                 entries.forEach(entry => {
// //                     if (entry.isIntersecting) {
// //                         entry.target.classList.add('in-view');
// //                     }
// //                 });
// //             },
// //             { threshold: 0.1 }
// //         );

// //         if (sectionRef.current) {
// //             observer.observe(sectionRef.current);
// //         }

// //         return () => {
// //             if (sectionRef.current) {
// //                 observer.unobserve(sectionRef.current);
// //             }
// //         };
// //     }, []);

// //     // Handle content change animation when clicking different experiences
// //     useEffect(() => {
// //         if (contentWrapperRef.current) {
// //             contentWrapperRef.current.style.animation = 'none';
// //             // Force reflow
// //             void contentWrapperRef.current.offsetHeight;
// //             contentWrapperRef.current.style.animation = 'slideInContent 0.4s ease-out forwards';
// //         }
// //     }, [activeExperience]);

// //     if (experiences.length === 0) {
// //         return (
// //             <div className="bg-gray-100 dark:bg-black py-7 lg:py-20">
// //                 <div className="container max-w-7xl mx-auto px-4 text-2xl font-semibold text-center">
// //                     <p className="text-gray-500 dark:text-gray-400">No experiences to display</p>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     const activeExp = experiences[activeExperience];

// //     return (
// //         <div
// //             ref={sectionRef}
// //             id="experience"
// //             className="bg-gray-100 dark:bg-black py-7 lg:py-20 overflow-hidden lg:overflow-visible"
// //         >
// //             <div className="container max-w-7xl mx-auto px-4">
// //                 {/* Header Section - Animated */}
// //                 <div className="flex flex-col items-center text-center mb-10 px-4">
// //                     <div className="flex items-center mb-4 animate-on-scroll fade-in-left">
// //                         <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
// //                         <span className="px-6 text-3xl md:text-4xl font-bold dark:text-white">
// //                             Experience
// //                         </span>
// //                         <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
// //                     </div>
// //                     <p className="md:text-lg max-w-3xl mx-auto leading-relaxed dark:text-gray-300 animate-on-scroll fade-in-right delay-1">
// //                         A showcase of my collaborative projects and team-based development experiences
// //                     </p>
// //                 </div>

// //                 <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
// //                     {/* LEFT SIDE Content - Full Content Animation */}
// //                     <div className="order-2 lg:order-1">
// //                         {activeExp && (
// //                             <div
// //                                 ref={contentWrapperRef}
// //                                 className="experience-content-wrapper rounded-2xl bg-gradient-to-br from-[#0a0a1a] to-[#0f1030] p-6 shadow-xl shadow-blue-500/5 backdrop-blur-sm lg:p-8"
// //                             >
// //                                 {/* Each section inside has staggered animation on scroll */}
// //                                 <div className="animate-on-scroll fade-in-left delay-2">
// //                                     {/* Project Header */}
// //                                     <div className="mb-4 border-b border-blue-500/20 pb-4">
// //                                         <div className="mb-2 flex items-center gap-2 text-[#3b82f6]">
// //                                             <BsBriefcase className="text-xl" />
// //                                             <span className="text-sm font-medium">{activeExp.projectType || "Project"}</span>
// //                                         </div>
// //                                         <h2 className="mb-2 text-2xl font-bold text-white lg:text-3xl">
// //                                             {activeExp.title}
// //                                         </h2>
// //                                         <h3 className="mb-2 text-lg text-blue-300">
// //                                             @ {activeExp.organization}
// //                                         </h3>

// //                                         {/* Designation Section */}
// //                                         {activeExp?.designation && (
// //                                             <div className="mb-3 flex items-center gap-1.5 text-gray-300">
// //                                                 <FaRegIdBadge className="text-blue-400" size={16} />
// //                                                 <span className="text-md font-semibold text-blue-200">{activeExp?.designation}</span>
// //                                             </div>
// //                                         )}

// //                                         <div className="flex flex-wrap gap-4 text-sm text-gray-400">
// //                                             <div className="flex items-center gap-2">
// //                                                 <BsCalendar size={14} className="text-blue-400" />
// //                                                 <span>{activeExp.duration}</span>
// //                                             </div>
// //                                             <div className="flex items-center gap-1.5">
// //                                                 <FiMapPin size={14} className="text-blue-400" />
// //                                                 <span>{activeExp.location}</span>
// //                                             </div>
// //                                             <div className="flex items-center gap-2">
// //                                                 <BsPersonWorkspace size={14} className="text-blue-400" />
// //                                                 <span>{activeExp.stack || "Full Stack"}</span>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 {/* Description - Animated */}
// //                                 {activeExp.description && (
// //                                     <div className="animate-on-scroll fade-in-left delay-3 mb-4">
// //                                         <p className="text-gray-300">
// //                                             {activeExp.shortDescription}
// //                                         </p>
// //                                     </div>
// //                                 )}

// //                                 {/* Responsibilities - Animated */}
// //                                 {activeExp.responsibilities && activeExp.responsibilities.length > 0 && (
// //                                     <div className="animate-on-scroll fade-in-left delay-4 mb-4">
// //                                         <h4 className="mb-3 flex items-center gap-1.5 text-lg font-semibold text-white">
// //                                             <NotepadText size={20} className="text-[#3b82f6]" />
// //                                             Key Responsibilities
// //                                         </h4>
// //                                         <ul className="space-y-0.5">
// //                                             {activeExp.responsibilities.map((resp, idx) => (
// //                                                 <li key={idx} className="flex items-start gap-2 text-gray-300">
// //                                                     <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3b82f6]"></span>
// //                                                     <span>{resp}</span>
// //                                                 </li>
// //                                             ))}
// //                                         </ul>
// //                                     </div>
// //                                 )}

// //                                 {/* Tech Stack - Animated */}
// //                                 {activeExp.topTech && activeExp.topTech.length > 0 && (
// //                                     <div className="animate-on-scroll fade-in-left delay-5 mb-4">
// //                                         <h4 className="flex items-center gap-2 mb-3 text-lg font-semibold text-white">
// //                                             <FaTools size={17} className="text-[#3b82f6]" />
// //                                             Tech Stack
// //                                         </h4>
// //                                         <div className="flex flex-wrap gap-2">
// //                                             {activeExp.topTech.map((tech, idx) => (
// //                                                 <span
// //                                                     key={idx}
// //                                                     className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 flex items-center gap-1"
// //                                                 >
// //                                                     {tech.icon && (
// //                                                         <img
// //                                                             src={tech.icon}
// //                                                             alt={tech.name}
// //                                                             className="w-3.5 h-3.5 inline-block"
// //                                                         />
// //                                                     )}
// //                                                     {tech.name}
// //                                                 </span>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 )}

// //                                 {/* Achievements - Animated */}
// //                                 {activeExp.achievements && activeExp.achievements.length > 0 && (
// //                                     <div className="animate-on-scroll fade-in-left delay-6 mb-6">
// //                                         <h4 className="mb-3 flex items-center gap-1 text-lg font-semibold text-white">
// //                                             <Award size={20} className="text-[#3b82f6]" />
// //                                             Key Achievements
// //                                         </h4>
// //                                         <ul className="space-y-0.5">
// //                                             {activeExp.achievements.map((achievement, idx) => (
// //                                                 <li key={idx} className="flex items-start gap-2 text-gray-300">
// //                                                     <span className="text-blue-400">•</span>
// //                                                     <span>{achievement}</span>
// //                                                 </li>
// //                                             ))}
// //                                         </ul>
// //                                     </div>
// //                                 )}

// //                                 {/* Buttons - Animated */}
// //                                 <div className="animate-on-scroll fade-in-left delay-7 flex items-center gap-4">
// //                                     {activeExp.demoLink && (
// //                                         <a
// //                                             href={activeExp.demoLink}
// //                                             target="_blank"
// //                                             rel="noopener noreferrer"
// //                                             className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 text-sm font-medium text-white transition-all duration-300 active:scale-[0.95] hover:shadow-lg hover:shadow-blue-500/30"
// //                                         >
// //                                             Live Link
// //                                             <FiExternalLink size={16} />
// //                                         </a>
// //                                     )}

// //                                     <Link to={`/projectDetails/${activeExp.id}`}>
// //                                         <button className="inline-flex items-center justify-between gap-2 px-4 py-2 border border-gray-500/50 bg-transparent hover:bg-blue-500/10 hover:border-blue-500/50 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-800 text-white font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.95] group/btn">
// //                                             <span>Project Details</span>
// //                                             <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
// //                                         </button>
// //                                     </Link>
// //                                 </div>
// //                             </div>
// //                         )}
// //                     </div>

// //                     {/* RIGHT SIDE Cards - Animated with staggered delays */}
// //                     <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
// //                         <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
// //                             {experiences.map((exp, index) => (
// //                                 <div
// //                                     key={exp.id}
// //                                     className={`animate-on-scroll fade-in-right delay-${Math.min(index + 1, 8)}`}
// //                                 >
// //                                     <GlowCard
// //                                         identifier={`exp-${exp.id}`}
// //                                         isActive={activeExperience === index}
// //                                         onClick={() => setActiveExperience(index)}
// //                                     >
// //                                         <div className="p-5">
// //                                             {/* Duration Badge */}
// //                                             <div className="flex items-center justify-between gap-2 mb-3">
// //                                                 <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400 border border-blue-500/20">
// //                                                     {exp.duration}
// //                                                 </span>

// //                                                 {/* Active Indicator */}
// //                                                 {activeExperience === index && (
// //                                                     <div className="flex items-center gap-3 text-sm text-blue-400">
// //                                                         <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse-glow"></div>
// //                                                         <span>Currently viewing</span>
// //                                                     </div>
// //                                                 )}
// //                                             </div>

// //                                             {/* Title & Organization */}
// //                                             <h3 className="mb-1 text-lg font-bold text-white">
// //                                                 {exp.title}
// //                                             </h3>
// //                                             <p className="mb-2 text-sm text-blue-300">
// //                                                 @ {exp.organization}
// //                                             </p>

// //                                             {/* Designation */}
// //                                             {exp?.designation && (
// //                                                 <div className="mb-2 flex items-center gap-1.5 text-sm text-gray-300">
// //                                                     <FaRegIdBadge size={12} className="text-blue-400" />
// //                                                     <span>{exp?.designation}</span>
// //                                                 </div>
// //                                             )}

// //                                             {/* Location & Type */}
// //                                             <div className="mb-3 flex flex-wrap gap-3 text-sm text-gray-300">
// //                                                 <div className="flex items-center gap-1.5">
// //                                                     <FiMapPin size={12} className="text-blue-400" />
// //                                                     <span>{exp.location}</span>
// //                                                 </div>
// //                                                 <div className="flex items-center gap-1.5">
// //                                                     <BsPersonWorkspace size={12} className="text-blue-400" />
// //                                                     <span>{exp.stack || "Full Stack"}</span>
// //                                                 </div>
// //                                             </div>

// //                                             {/* Tech Stack Preview */}
// //                                             {exp.topTech && exp.topTech.length > 0 && (() => {
// //                                                 const visibleCount = 4;

// //                                                 return (
// //                                                     <div className="flex flex-wrap gap-1.5">
// //                                                         {exp.topTech.slice(0, visibleCount).map((tech, idx) => (
// //                                                             <span
// //                                                                 key={idx}
// //                                                                 className="rounded-full bg-blue-500/5 px-2 py-0.5 text-sm text-blue-400 border border-blue-500/20 flex items-center gap-1"
// //                                                             >
// //                                                                 {tech.icon && (
// //                                                                     <img
// //                                                                         src={tech.icon}
// //                                                                         alt={tech.name}
// //                                                                         className="w-3.5 h-3.5 inline-block"
// //                                                                     />
// //                                                                 )}
// //                                                                 {tech.name}
// //                                                             </span>
// //                                                         ))}

// //                                                         {exp.topTech.length > visibleCount && (
// //                                                             <span className="rounded-full bg-blue-500/5 px-2 py-0.5 text-sm text-blue-400 border border-blue-500/20">
// //                                                                 +{exp.topTech.length - visibleCount}
// //                                                             </span>
// //                                                         )}
// //                                                     </div>
// //                                                 );
// //                                             })()}
// //                                         </div>
// //                                     </GlowCard>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                         <div className="mt-6 flex justify-center lg:justify-start animate-on-scroll fade-in-right">
// //                             <Link to="/all-experiences">
// //                                 <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-500 bg-transparent rounded-lg dark:text-white hover:bg-blue-500/10 hover:border-blue-500 transition group/btn">
// //                                     View all experiences
// //                                     <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
// //                                 </button>
// //                             </Link>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Experience;
