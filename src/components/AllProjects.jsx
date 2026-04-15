import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Helmet } from "react-helmet-async";
import projectsData from '../data/projects.js';

const AllProjects = () => {
    const [myProjects, setMyProjects] = useState([]);
    const [teamProjects, setTeamProjects] = useState([]);
    const [clientProjects, setClientProjects] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setMyProjects(projectsData["my-project"] || []);
        setTeamProjects(projectsData["team-project"] || []);
        setClientProjects(projectsData["client-project"] || []);
    }, []);

    const getAllProjectsWithType = () => {
        return [
            ...myProjects.map(project => ({ ...project, type: "personal" })),
            ...teamProjects.map(project => ({ ...project, type: "team" })),
            ...clientProjects.map(project => ({ ...project, type: "client" }))
        ];
    };

    const allProjectsWithType = getAllProjectsWithType();

    const filteredProjects = activeTab === "all"
        ? allProjectsWithType
        : allProjectsWithType.filter(project => project.type === activeTab);

    return (
        <div className="dark:bg-black">
            <div id="projects" className="container max-w-7xl mx-auto min-h-screen px-4 pt-10 pb-16">
                <Helmet>
                    <title>All Projects | Ashraful Islam Ratul</title>
                </Helmet>

                <div className="container mx-auto text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold dark:text-white">All Projects</h2>
                    <p className="mt-4 md:text-lg mx-auto dark:text-gray-300">Take a look at a selection of projects I've created. Each one showcases my skills and creativity.</p>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mt-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-xl p-1 flex gap-3">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`flex item-center gap-1 px-3 py-2 md:py-2.5 rounded-lg text-sm transition ${activeTab === "all"
                                    ? "bg-blue-600 text-white font-semibold"
                                    : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 font-medium shadow-inner dark:text-gray-300"
                                    }`}
                            >
                                All Projects <span className="hidden md:block">({allProjectsWithType.length})</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`flex item-center gap-1 px-3 py-2 md:py-2.5 rounded-lg text-sm transition ${activeTab === "personal"
                                    ? "bg-blue-600 text-white font-semibold"
                                    : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 font-medium shadow-inner dark:text-gray-300"
                                    }`}
                            >
                                Personal <span className="hidden md:block">({myProjects.length})</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("team")}
                                className={`flex item-center gap-1 px-3 py-2 md:py-2.5 rounded-lg text-sm transition ${activeTab === "team"
                                    ? "bg-blue-600 text-white font-semibold"
                                    : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 font-medium shadow-inner dark:text-gray-300"
                                    }`}
                            >
                                Team <span className="hidden md:block">({teamProjects.length})</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("client")}
                                className={`flex item-center gap-1 px-3 py-2 md:py-2.5 rounded-lg text-sm transition ${activeTab === "client"
                                    ? "bg-blue-600 text-white font-semibold"
                                    : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 font-medium shadow-inner dark:text-gray-300"
                                    }`}
                            >
                                Client <span className="hidden md:block">({clientProjects.length})</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
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
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProjects;
