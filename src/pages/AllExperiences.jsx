import React, { useState, useEffect } from 'react';
import projectsData from '../data/project/projects.js';
import GlowCard from '../shared/GlowCard';
import { Link } from 'react-router-dom';
import { BsPersonWorkspace, BsCalendar, BsBriefcase } from 'react-icons/bs';
import { FiExternalLink, FiMapPin } from 'react-icons/fi';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FaRegIdBadge, FaTools } from 'react-icons/fa';
import { Award, Info, NotepadText, X } from 'lucide-react';

const AllExperiences = () => {
    const [selectedExp, setSelectedExp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleCards, setVisibleCards] = useState([]);

    const allExperiences = [
        ...(projectsData['client-project'] || []),
        ...(projectsData['team-project'] || []),
        ...(projectsData['working-project'] || []),
        ...(projectsData['my-project'] || []),
    ].filter(exp => exp.experienceShow === true);

    // Staggered animation for cards
    useEffect(() => {
        // Reset visible cards
        setVisibleCards([]);

        // Show cards one by one with delay
        allExperiences.forEach((_, index) => {
            setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
            }, index * 100); // 100ms delay between each card
        });

        // Cleanup timeouts on unmount
        return () => {
            const timeouts = allExperiences.map((_, index) =>
                setTimeout(() => { }, index * 100)
            );
            timeouts.forEach(clearTimeout);
        };
    }, [allExperiences.length]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const openModal = (exp) => {
        setSelectedExp(exp);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExp(null);
    };

    // Handle escape key press
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (allExperiences.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <p className="text-gray-500 dark:text-gray-400">No experiences found.</p>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-black py-8'>
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-10 space-y-2">
                    <div className="flex items-center justify-center mb-4 animate-on-scroll fade-in-down">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
                            All Experiences
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <p className="dark:text-gray-300 md:text-[1.3rem] max-w-2xl mx-auto animate-on-scroll fade-in-up delay-1">
                        A full list of collaborative, team, and client-based projects
                    </p>
                </div>

                {/* Grid with auto-rows for equal height */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {allExperiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`
                                cursor-pointer transition-all duration-500 ease-out
                                flex
                                ${visibleCards.includes(index)  // hover:-translate-y-0.5 
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-12'
                                }
                            `}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                transitionProperty: 'opacity, transform'
                            }}
                            onClick={() => openModal(exp)}
                        >
                            <GlowCard identifier={`exp-all-${exp.id}`}>
                                <div className="p-5 flex flex-col h-full">
                                    {/* Project Type & Fund Status Badge */}
                                    <div className='mb-2 flex justify-between items-center gap-2'>
                                        <div className="flex items-center gap-2 text-blue-400">
                                            <BsBriefcase className="text-[1.05rem] flex-shrink-0" />
                                            <span className="text-[1.1rem] font-medium">{exp.projectType || 'Project'}</span>
                                        </div>

                                        {exp.fundedStatus && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2 py-0.5 text-sm font-semibold text-green-400 border border-green-500/30">
                                                <span>💰</span>
                                                {exp.fundedStatus}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title & Organization */}
                                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{exp.title}</h3>
                                    <p className="text-[1.1rem] text-blue-300 mb-2">@ {exp.organization}</p>

                                    {/* Designation Section */}
                                    {exp?.designation && (
                                        <div className="mb-3 flex items-center gap-1.5 text-gray-300">
                                            <FaRegIdBadge className="text-blue-400" size={18} />
                                            {/* <span className="text-[1.2rem]">Role: </span> */}
                                            <span className="text-[1.2rem] font-semibold text-blue-200">{exp?.designation}</span>
                                        </div>
                                    )}

                                    {/* Project Status */}
                                    {exp?.projectStatus && (
                                        <div className="mb-3 flex items-center gap-1.5 text-gray-300">
                                            <Info className="text-blue-400" size={18} />
                                            {/* <span className="text-[1rem]">Status: </span> */}
                                            <span className="text-[1rem] font-semibold text-blue-200">{exp?.projectStatus}</span>
                                        </div>
                                    )}

                                    {/* Location & Stack */}
                                    <div className="flex flex-wrap gap-3 text-[1.1rem] text-gray-300">
                                        <div className="flex items-center gap-1.5">
                                            <FiMapPin size={18} className="text-blue-400 flex-shrink-0" />
                                            <span>{exp.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <BsPersonWorkspace size={18} className="text-blue-400 flex-shrink-0" />
                                            <span>{exp.stack || 'Full Stack'}</span>
                                        </div>
                                    </div>

                                    {/* Tech Stack Preview - stays at bottom */}
                                    {exp.topTech && exp.topTech.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {exp.topTech.slice(0, 3).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="rounded-full bg-blue-500/5 px-2 py-0.5 text-[1.1rem] text-blue-400 border border-blue-500/20 flex items-center gap-1"
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
                                            {exp.topTech.length > 3 && (
                                                <span className="rounded-full bg-blue-500/5 px-2 py-0.5 text-[1.05rem] text-blue-400 border border-blue-500/20">
                                                    +{exp.topTech.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </GlowCard>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedExp && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                // onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#0a0a1a] to-[#0f1030] shadow-2xl shadow-blue-500/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-gray-300 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        {/* Content - Exact same design as Experience left side */}
                        <div className="p-6 lg:p-8">
                            {/* Project Header */}
                            <div className="mb-4 border-b border-blue-500/20 pb-4">
                                {/* Project Type & Fund Status Badge */}
                                <div className='mb-4 flex items-center gap-2'>
                                    <div className="flex items-center gap-2 text-blue-400">
                                        <BsBriefcase className="text-[1.05rem] flex-shrink-0" />
                                        <span className="text-[1.1rem] font-medium">{selectedExp.projectType || 'Project'}</span>
                                    </div>

                                    {selectedExp.fundedStatus && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2 py-0.5 text-sm font-semibold text-green-400 border border-green-500/30">
                                            <span>💰</span>
                                            {selectedExp.fundedStatus}
                                        </span>
                                    )}
                                </div>
                                <h2 className="mb-2 text-3xl font-bold text-white">
                                    {selectedExp.title}
                                </h2>
                                <h3 className="mb-2 text-[1.2rem] text-blue-300">
                                    @ {selectedExp.organization}
                                </h3>

                                {/* Designation Section */}
                                {selectedExp?.designation && (
                                    <div className="mb-3 flex items-center gap-1.5 text-gray-300">
                                        <FaRegIdBadge className="text-blue-400" size={18} />
                                        {/* <span className="text-[1.25rem]">Role: </span> */}
                                        <span className="text-[1.25rem] font-semibold text-blue-200">{selectedExp?.designation}</span>
                                    </div>
                                )}

                                {/* Project Status */}
                                {selectedExp?.projectStatus && (
                                    <div className="mb-3 flex items-center gap-1.5 text-gray-300">
                                        <Info className="text-blue-400" size={18} />
                                        {/* <span className="text-[1.15rem]">Status: </span> */}
                                        <span className="text-[1.15rem] font-semibold text-blue-200">{selectedExp?.projectStatus}</span>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-4 text-[1.1rem] text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <BsCalendar size={18} className="text-blue-400" />
                                        <span>{selectedExp.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FiMapPin size={18} className="text-blue-400" />
                                        <span>{selectedExp.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BsPersonWorkspace size={18} className="text-blue-400" />
                                        <span>{selectedExp.stack || "Full Stack"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {selectedExp.description && (
                                <div className="mb-6">
                                    <p className="text-[1.2rem] md:text-justify text-gray-300">
                                        {selectedExp.shortDescription || selectedExp.description}
                                    </p>
                                </div>
                            )}

                            {/* Responsibilities */}
                            {selectedExp.responsibilities && selectedExp.responsibilities.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="mb-3 flex items-center gap-1.5 text-2xl font-semibold text-white">
                                        <NotepadText size={22} className="text-[#3b82f6]" />
                                        Key Responsibilities
                                    </h4>
                                    <ul className="space-y-0.5 text-[1.2rem]">
                                        {selectedExp.responsibilities.map((resp, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3b82f6]"></span>
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tech Stack */}
                            {selectedExp.topTech && selectedExp.topTech.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="flex items-center gap-2 mb-3 text-2xl font-semibold text-white">
                                        <FaTools size={20} className="text-[#3b82f6]" />
                                        Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedExp.topTech.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="rounded-full bg-blue-500/10 px-3 py-1 text-[1.05rem] font-semibold text-blue-400 border border-blue-500/20 flex items-center gap-1"
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

                            {/* Achievements */}
                            {selectedExp.achievements && selectedExp.achievements.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="mb-3 flex items-center gap-1 text-2xl font-semibold text-white">
                                        <Award size={22} className="text-[#3b82f6]" />
                                        Key Achievements
                                    </h4>
                                    <ul className="space-y-0.5 text-[1.2rem]">
                                        {selectedExp.achievements.map((achievement, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                <span className="text-blue-400">•</span>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex items-center gap-4">
                                {selectedExp.demoLink && (
                                    <a
                                        href={selectedExp.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 text-[1.1rem] font-semibold text-white transition-all duration-300 active:scale-[0.95] hover:shadow-lg hover:shadow-blue-500/30"
                                    >
                                        Live Link
                                        <FiExternalLink size={16} />
                                    </a>
                                )}

                                <Link to={`/projectDetails/${selectedExp.id}`} onClick={closeModal}>
                                    <button className="inline-flex items-center justify-between gap-2 px-4 py-2 border border-gray-500/50 bg-transparent hover:bg-blue-500/10 hover:border-blue-500/50 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-800 text-white font-semibold text-[1.1rem] hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.95] group/btn">
                                        <span>Project Details</span>
                                        <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllExperiences;
