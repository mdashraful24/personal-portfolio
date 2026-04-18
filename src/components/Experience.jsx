import React, { useEffect, useRef, useState } from "react";
import { BsPersonWorkspace, BsCode, BsAward, BsCalendar, BsBriefcase } from "react-icons/bs";
import { FiExternalLink, FiMapPin } from "react-icons/fi";
import GlowCard from "../shared/GlowCard";
import projectsData from '../data/projects.js';
import "./css/Experience.css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Experience = () => {
    const [activeExperience, setActiveExperience] = useState(0);
    const sectionRef = useRef(null);
    const contentWrapperRef = useRef(null);

    const experiences = projectsData["team-project"] || [];

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Handle content change animation when clicking different experiences
    useEffect(() => {
        if (contentWrapperRef.current) {
            contentWrapperRef.current.style.animation = 'none';
            // Force reflow
            void contentWrapperRef.current.offsetHeight;
            contentWrapperRef.current.style.animation = 'slideInContent 0.4s ease-out forwards';
        }
    }, [activeExperience]);

    if (experiences.length === 0) {
        return null;
    }

    const activeExp = experiences[activeExperience];

    return (
        <div
            ref={sectionRef}
            id="experience"
            className="bg-gradient-to-br from-white to-[#0f0f23]/20 dark:bg-gradient-to-br dark:from-black dark:to-black py-7 lg:py-20 overflow-hidden"
        >
            <div className="container max-w-7xl mx-auto px-4">
                {/* Header Section - Animated */}
                <div className="flex flex-col items-center text-center mb-10 px-4">
                    <div className="flex items-center mb-4 animate-on-scroll fade-in-left">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl font-bold dark:text-white">
                            Experience
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <p className="md:text-lg max-w-3xl mx-auto leading-relaxed dark:text-gray-300 animate-on-scroll fade-in-right delay-1">
                        A showcase of my collaborative projects and team-based development experiences
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* LEFT SIDE Content - Full Content Animation */}
                    <div className="order-2 lg:order-1">
                        {activeExp && (
                            <div
                                ref={contentWrapperRef}
                                className="experience-content-wrapper rounded-2xl bg-gradient-to-br from-[#0a0a1a] to-[#0f1030] p-6 shadow-xl shadow-blue-500/5 backdrop-blur-sm lg:p-8"
                            >
                                {/* Each section inside has staggered animation on scroll */}
                                <div className="animate-on-scroll fade-in-left delay-2">
                                    {/* Project Header */}
                                    <div className="mb-4 border-b border-blue-500/20 pb-4">
                                        <div className="mb-2 flex items-center gap-2 text-[#3b82f6]">
                                            <BsBriefcase className="text-xl" />
                                            <span className="text-sm font-medium">{activeExp.projectType || "Team Project"}</span>
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold text-white lg:text-3xl">
                                            {activeExp.title}
                                        </h2>
                                        <h3 className="mb-2 text-xl text-blue-300">
                                            @ {activeExp.organization}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <BsCalendar size={14} className="text-blue-400" />
                                                <span>{activeExp.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiMapPin size={14} className="text-blue-400" />
                                                <span>{activeExp.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BsPersonWorkspace size={14} className="text-blue-400" />
                                                <span>{activeExp.stack || "Full Stack"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description - Animated */}
                                {activeExp.description && (
                                    <div className="animate-on-scroll fade-in-left delay-3 mb-4">
                                        <p className="text-gray-300">
                                            {activeExp.shortDescription}
                                        </p>
                                    </div>
                                )}

                                {/* Responsibilities - Animated */}
                                {activeExp.responsibilities && activeExp.responsibilities.length > 0 && (
                                    <div className="animate-on-scroll fade-in-left delay-4 mb-4">
                                        <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                                            <BsCode className="text-[#3b82f6]" />
                                            Key Responsibilities
                                        </h4>
                                        <ul className="space-y-0.5">
                                            {activeExp.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3b82f6]"></span>
                                                    <span>{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Tech Stack - Animated */}
                                {activeExp.topTech && activeExp.topTech.length > 0 && (
                                    <div className="animate-on-scroll fade-in-left delay-5 mb-4">
                                        <h4 className="mb-3 text-lg font-semibold text-white">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {activeExp.topTech.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 flex items-center gap-1"
                                                >
                                                    {tech.icon && (
                                                        <img
                                                            src={tech.icon}
                                                            alt={tech.name}
                                                            className="w-3.5 h-3.5 inline-block"
                                                        />
                                                    )}
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Achievements - Animated */}
                                {activeExp.achievements && activeExp.achievements.length > 0 && (
                                    <div className="animate-on-scroll fade-in-left delay-6 mb-6">
                                        <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                                            <BsAward className="text-[#3b82f6]" />
                                            Key Achievements
                                        </h4>
                                        <ul className="space-y-0.5">
                                            {activeExp.achievements.map((achievement, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                    <span className="text-blue-400">•</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Buttons - Animated */}
                                <div className="animate-on-scroll fade-in-left delay-7 flex items-center gap-4">
                                    {activeExp.demoLink && (
                                        <a
                                            href={activeExp.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 text-sm font-medium text-white transition-all duration-300 active:scale-[0.95] hover:shadow-lg hover:shadow-blue-500/30"
                                        >
                                            Live Link
                                            <FiExternalLink size={16} />
                                        </a>
                                    )}

                                    <Link to={`/projectDetails/${activeExp.id}`}>
                                        <button className="inline-flex items-center justify-between gap-2 px-4 py-2 border border-gray-500/50 bg-transparent hover:bg-blue-500/10 hover:border-blue-500/50 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-800 text-white font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.95] group/btn">
                                            <span>Project Details</span>
                                            <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDE Cards - Animated with staggered delays */}
                    <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
                        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                            {experiences.map((exp, index) => (
                                <div
                                    key={exp.id}
                                    className={`animate-on-scroll fade-in-right delay-${Math.min(index + 1, 8)}`}
                                >
                                    <GlowCard
                                        identifier={`exp-${exp.id}`}
                                        isActive={activeExperience === index}
                                        onClick={() => setActiveExperience(index)}
                                    >
                                        <div className="p-5">
                                            {/* Duration Badge */}
                                            <div className="mb-3">
                                                <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400 border border-blue-500/20">
                                                    {exp.duration}
                                                </span>
                                            </div>

                                            {/* Title & Organization */}
                                            <h3 className="mb-1 text-lg font-bold text-white">
                                                {exp.title}
                                            </h3>
                                            <p className="mb-2 text-sm text-blue-300">
                                                {exp.organization}
                                            </p>

                                            {/* Location & Type */}
                                            <div className="mb-3 flex flex-wrap gap-3 text-xs text-gray-300">
                                                <div className="flex items-center gap-1">
                                                    <FiMapPin size={12} className="text-blue-400" />
                                                    <span>{exp.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BsPersonWorkspace size={12} className="text-blue-400" />
                                                    <span>{exp.stack || "Full Stack"}</span>
                                                </div>
                                            </div>

                                            {/* Tech Stack Preview */}
                                            {exp.topTech && exp.topTech.length > 0 && (() => {
                                                const visibleCount = 4;

                                                return (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {exp.topTech.slice(0, visibleCount).map((tech, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="rounded-full bg-blue-500/5 px-2 py-0.5 text-sm text-blue-400 border border-blue-500/20 flex items-center gap-1"
                                                            >
                                                                {tech.icon && (
                                                                    <img
                                                                        src={tech.icon}
                                                                        alt={tech.name}
                                                                        className="w-3.5 h-3.5 inline-block"
                                                                    />
                                                                )}
                                                                {tech.name}
                                                            </span>
                                                        ))}

                                                        {exp.topTech.length > visibleCount && (
                                                            <span className="rounded-full bg-blue-500/5 px-2 py-0.5 text-sm text-blue-400 border border-blue-500/20">
                                                                +{exp.topTech.length - visibleCount}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })()}

                                            {/* Active Indicator */}
                                            {activeExperience === index && (
                                                <div className="mt-3 flex items-center gap-2 text-sm text-blue-400">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                                                    <span>Currently viewing</span>
                                                </div>
                                            )}
                                        </div>
                                    </GlowCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;






{/* RIGHT SIDE Cards */ }
// {/* <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
//     <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
//         {experiences.map((exp, index) => (
//             <GlowCard
//                 key={exp.id}
//                 identifier={`exp-${exp.id}`}
//                 isActive={activeExperience === index}
//                 onClick={() => setActiveExperience(index)}
//             >
//                 <div className="p-5">
//                     {/* Duration Badge */}
//                     <div className="mb-3">
//                         <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400 border border-blue-500/20">
//                             {exp.duration}
//                         </span>
//                     </div>

//                     {/* Title & Organization */}
//                     <h3 className="mb-1 text-lg font-bold text-white">
//                         {exp.title}
//                     </h3>
//                     <p className="mb-2 text-sm text-blue-300">
//                         {exp.organization}
//                     </p>

//                     {/* Location & Type */}
//                     <div className="mb-3 flex flex-wrap gap-3 text-xs text-gray-300">
//                         <div className="flex items-center gap-1">
//                             <FiMapPin size={12} className="text-blue-400" />
//                             <span>{exp.location}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                             <BsPersonWorkspace size={12} className="text-blue-400" />
//                             <span>{exp.stack || "Full Stack"}</span>
//                         </div>
//                     </div>

//                     {/* Tech Stack Preview */}
//                     {exp.topTech && exp.topTech.length > 0 && (() => {
//                         const visibleCount = 4;

//                         return (
//                             <div className="flex flex-wrap gap-1.5">
//                                 {exp.topTech.slice(0, visibleCount).map((tech, idx) => (
//                                     <span
//                                         key={idx}
//                                         className="rounded-full bg-blue-500/5 px-2 py-0.5 text-sm text-blue-400 border border-blue-500/20 flex items-center gap-1"
//                                     >
//                                         {tech.icon && (
//                                             <img
//                                                 src={tech.icon}
//                                                 alt={tech.name}
//                                                 className="w-3.5 h-3.5 inline-block"
//                                             />
//                                         )}
//                                         {tech.name}
//                                     </span>
//                                 ))}

//                                 {exp.topTech.length > visibleCount && (
//                                     <span className="rounded-full bg-blue-500/5 px-2 py-0.5 text-sm text-blue-400 border border-blue-500/20">
//                                         +{exp.topTech.length - visibleCount}
//                                     </span>
//                                 )}
//                             </div>
//                         );
//                     })()}

//                     {/* Active Indicator */}
//                     {activeExperience === index && (
//                         <div className="mt-3 flex items-center gap-2 text-sm text-blue-400">
//                             <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse-glow"></div>
//                             <span>Currently viewing</span>
//                         </div>
//                     )}
//                 </div>
//             </GlowCard>
//         ))}
//     </div>
// </div> */}






// import React, { useEffect, useRef, useState } from "react";
// import { BsPersonWorkspace, BsCode, BsAward, BsCalendar, BsBriefcase } from "react-icons/bs";
// import { FiExternalLink, FiMapPin } from "react-icons/fi";
// import GlowCard from "../shared/GlowCard";
// import projectsData from '../data/projects.js';
// import "./css/Experience.css";
// import { Link } from "react-router-dom";
// import { FaArrowRightLong } from "react-icons/fa6";

// const Experience = () => {
//     const [activeExperience, setActiveExperience] = useState(0);

//     // Fetch team project data from projectsData
//     const experiences = projectsData["team-project"] || [];

//     // If no data, show nothing or a loading state
//     if (experiences.length === 0) {
//         return null;
//     }

//     const activeExp = experiences[activeExperience];

//     return ( // from-[#0a0a1a] to-[#0f0f23]
//         <div id="experience" className="bg-gradient-to-br from-white to-[#0f0f23]/20 dark:bg-gradient-to-br dark:from-black dark:to-black py-7 lg:py-20">
//             {/* Header */}
//             <div className="flex flex-col items-center text-center mb-10 px-4">
//                 <div className="flex items-center mb-4">
//                     <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                     <span className="px-6 text-3xl md:text-4xl font-bold dark:text-white">
//                         Experience
//                     </span>
//                     <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                 </div>
//                 <p className="md:text-lg max-w-3xl mx-auto leading-relaxed dark:text-gray-300">
//                     A showcase of my collaborative projects and team-based development experiences
//                 </p>
//             </div>

//             <div className="container max-w-7xl mx-auto px-4">
//                 <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
//                     {/* LEFT SIDE Content */}
//                     <div className="order-2 lg:order-1">
//                         {activeExp && (
//                             <div className="animate-fadeIn rounded-2xl bg-gradient-to-br from-[#0a0a1a] to-[#0f1030] p-6 shadow-xl shadow-blue-500/5 backdrop-blur-sm lg:p-8">

//                                 {/* Project Header */}
//                                 <div className="mb-4 border-b border-blue-500/20 pb-4">
//                                     <div className="mb-2 flex items-center gap-2 text-[#3b82f6]">
//                                         <BsBriefcase className="text-xl" />
//                                         <span className="text-sm font-medium">{activeExp.projectType || "Team Project"}</span>
//                                     </div>
//                                     <h2 className="mb-2 text-2xl font-bold text-white lg:text-3xl">
//                                         {activeExp.title}
//                                     </h2>
//                                     <h3 className="mb-2 text-xl text-blue-300">
//                                         @ {activeExp.organization}
//                                     </h3>
//                                     <div className="flex flex-wrap gap-4 text-sm text-gray-400">
//                                         <div className="flex items-center gap-2">
//                                             <BsCalendar size={14} className="text-blue-400" />
//                                             <span>{activeExp.duration}</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <FiMapPin size={14} className="text-blue-400" />
//                                             <span>{activeExp.location}</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <BsPersonWorkspace size={14} className="text-blue-400" />
//                                             <span>{activeExp.stack || "Full Stack"}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Description */}
//                                 {activeExp.description && (
//                                     <div className="mb-4">
//                                         <p className="text-gray-300">
//                                             {activeExp.shortDescription}
//                                         </p>
//                                     </div>
//                                 )}

//                                 {/* Responsibilities */}
//                                 {activeExp.responsibilities && activeExp.responsibilities.length > 0 && (
//                                     <div className="mb-4">
//                                         <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
//                                             <BsCode className="text-[#3b82f6]" />
//                                             Key Responsibilities
//                                         </h4>
//                                         <ul className="space-y-0.5">
//                                             {activeExp.responsibilities.map((resp, idx) => (
//                                                 <li key={idx} className="flex items-start gap-2 text-gray-300">
//                                                     <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3b82f6]"></span>
//                                                     <span>{resp}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}

//                                 {/* Technologies - Top Tech */}
//                                 {activeExp.topTech && activeExp.topTech.length > 0 && (
//                                     <div className="mb-4">
//                                         <h4 className="mb-3 text-lg font-semibold text-white">Tech Stack</h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {activeExp.topTech.map((tech, idx) => (
//                                                 <span
//                                                     key={idx}
//                                                     className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 flex items-center gap-1"
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

//                                 {/* Achievements */}
//                                 {activeExp.achievements && activeExp.achievements.length > 0 && (
//                                     <div className="mb-6">
//                                         <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
//                                             <BsAward className="text-[#3b82f6]" />
//                                             Key Achievements
//                                         </h4>
//                                         <ul className="space-y-0.5">
//                                             {activeExp.achievements.map((achievement, idx) => (
//                                                 <li key={idx} className="flex items-start gap-2 text-gray-300">
//                                                     <span className="text-blue-400">•</span>
//                                                     <span>{achievement}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}

//                                 <div className="flex items-center gap-4">
//                                     {/* Live Link Button */}
//                                     {activeExp.demoLink && (
//                                         <a
//                                             href={activeExp.demoLink}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 text-sm font-medium text-white transition-all duration-300 active:scale-[0.95] hover:shadow-lg hover:shadow-blue-500/30"
//                                         >
//                                             Live Link
//                                             <FiExternalLink size={16} />
//                                         </a>
//                                     )}

//                                     <Link to={`/projectDetails/${activeExp.id}`}>
//                                         <button
//                                             className="inline-flex items-center justify-between gap-2 px-4 py-2 border border-gray-500/50 bg-transparent hover:bg-blue-500/10 hover:border-blue-500/50 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-800 text-white font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.95] group/btn"
//                                         >
//                                             <span>Project Details</span>
//                                             <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* RIGHT SIDE Cards */}
//                     <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
//                         <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
//                             {experiences.map((exp, index) => (
//                                 <GlowCard
//                                     key={exp.id}
//                                     identifier={`exp-${exp.id}`}
//                                     isActive={activeExperience === index}
//                                     onClick={() => setActiveExperience(index)}
//                                 >
//                                     <div className="p-5">
//                                         {/* Duration Badge */}
//                                         <div className="mb-3">
//                                             <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400 border border-blue-500/20">
//                                                 {exp.duration}
//                                             </span>
//                                         </div>

//                                         {/* Title & Organization */}
//                                         <h3 className="mb-1 text-lg font-bold text-white">
//                                             {exp.title}
//                                         </h3>
//                                         <p className="mb-2 text-sm text-blue-300">
//                                             {exp.organization}
//                                         </p>

//                                         {/* Location & Type */}
//                                         <div className="mb-3 flex flex-wrap gap-3 text-xs text-gray-300">
//                                             <div className="flex items-center gap-1">
//                                                 <FiMapPin size={12} className="text-blue-400" />
//                                                 <span>{exp.location}</span>
//                                             </div>
//                                             <div className="flex items-center gap-1">
//                                                 <BsPersonWorkspace size={12} className="text-blue-400" />
//                                                 <span>{exp.stack || "Full Stack"}</span>
//                                             </div>
//                                         </div>

//                                         {/* Tech Stack Preview */}
//                                         {exp.topTech && exp.topTech.length > 0 && (() => {
//                                             const visibleCount = 4;

//                                             return (
//                                                 <div className="flex flex-wrap gap-1.5">
//                                                     {exp.topTech.slice(0, visibleCount).map((tech, idx) => (
//                                                         <span
//                                                             key={idx}
//                                                             className="rounded-full bg-blue-500/5 px-2 py-0.5 text-sm text-blue-400 border border-blue-500/20 flex items-center gap-1"
//                                                         >
//                                                             {tech.icon && (
//                                                                 <img
//                                                                     src={tech.icon}
//                                                                     alt={tech.name}
//                                                                     className="w-3.5 h-3.5 inline-block"
//                                                                 />
//                                                             )}
//                                                             {tech.name}
//                                                         </span>
//                                                     ))}

//                                                     {exp.topTech.length > visibleCount && (
//                                                         <span className="rounded-full bg-blue-500/5 px-2 py-0.5 text-sm text-blue-400 border border-blue-500/20">
//                                                             +{exp.topTech.length - visibleCount}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                             );
//                                         })()}

//                                         {/* Active Indicator */}
//                                         {activeExperience === index && (
//                                             <div className="mt-3 flex items-center gap-2 text-sm text-blue-400">
//                                                 <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse-glow"></div>
//                                                 <span>Currently viewing</span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </GlowCard>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Experience;
