import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaFolderOpen, FaCode, FaUsers, FaLaptopCode } from "react-icons/fa6";
import { motion } from "framer-motion";
import projectsData from '../data/projects.js';

const ProjectsShowcase = () => {
    const [myProjects, setMyProjects] = useState([]);
    const [teamProjects, setTeamProjects] = useState([]);
    const [clientProjects, setClientProjects] = useState([]);
    const [workingProjects, setWorkingProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setMyProjects(projectsData["my-project"] || []);
        setTeamProjects(projectsData["team-project"] || []);
        setClientProjects(projectsData["client-project"] || []);
        setWorkingProjects(projectsData["working-project"] || []);
    }, []);

    const displayedMyProjects = myProjects.slice(0, 2);
    const displayedTeamProjects = teamProjects.slice(0, 2);
    const displayedClientProjects = clientProjects.slice(0, 1);
    const displayedWorkingProjects = workingProjects.slice(0, 1);

    const allDisplayedProjects = [
        ...displayedMyProjects.map(project => ({ ...project, type: "personal" })),
        ...displayedTeamProjects.map(project => ({ ...project, type: "team" })),
        ...displayedClientProjects.map(project => ({ ...project, type: "client" })),
        ...displayedWorkingProjects.map(project => ({ ...project, type: "working" }))
    ];

    const handleViewMoreClick = () => {
        navigate("/all-projects");
    };

    const totalProjects = myProjects.length + teamProjects.length + clientProjects.length + workingProjects.length;
    const totalTechStacks = 15;

    return (
        <div className="dark:bg-black">
            <div id="projects" className="container max-w-7xl mx-auto px-4 py-6 lg:py-20">
                <div className="container mx-auto text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-center mb-4">
                            <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                            <span className="px-6 text-3xl md:text-4xl font-bold dark:text-white">
                                My Projects
                            </span>
                            <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        </div>
                        <p className="md:text-lg dark:text-gray-300">
                            Here are some of the projects I've worked on.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allDisplayedProjects.slice(0, 5).map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <ProjectCard
                                id={project.id}
                                title={project.title}
                                description={project.description}
                                techStack={project.techStack}
                                topTech={project.topTech}
                                frontend={project.frontend}
                                backend={project.backend}
                                handling={project.handling}
                                development={project.development}
                                demoLink={project.demoLink}
                                codeLink={project.codeLink}
                                githubUrl={project.codeLink}
                                image={project.image}
                                type={project.type}
                            />
                        </motion.div>
                    ))}

                    {/* Animated View All Card */}
                    {allDisplayedProjects[5] && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="relative rounded-2xl overflow-hidden cursor-pointer h-full min-h-[25rem] bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
                            onClick={handleViewMoreClick}
                        >
                            {/* Animated Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-[2px]">
                                <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl"></div>
                            </div>

                            {/* Content Container */}
                            <div className="relative h-full flex flex-col items-center justify-center p-5 text-center bg-white dark:bg-gray-900 rounded-2xl">
                                {/* Animated Icon */}
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg animate-pulse opacity-30"></div>
                                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-0 group-hover:rotate-12 transition-transform duration-500">
                                        <FaFolderOpen className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                {/* Title with Counter */}
                                <div className="mb-8">
                                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                        {totalProjects}+
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Projects Completed
                                    </p>
                                </div>

                                {/* Project Categories Stats */}
                                <div className="grid grid-cols-3 gap-4 w-full max-w-xs mb-6">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <FaLaptopCode className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <div className="text-xl font-bold dark:text-white">{myProjects.length}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Personal</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <FaUsers className="w-5 h-5 text-green-500 dark:text-green-400" />
                                        </div>
                                        <div className="text-xl font-bold dark:text-white">{teamProjects.length}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Team</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <FaCode className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                                        </div>
                                        <div className="text-xl font-bold dark:text-white">{clientProjects.length}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Client</div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-7">
                                    {totalTechStacks}+ technologies used across all projects
                                </p>

                                {/* Explore Button */}
                                <button
                                    className="w-full flex items-center justify-between py-3 px-5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-800 text-white font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                                >
                                    <span>Explore All Projects</span>
                                    <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectsShowcase;
