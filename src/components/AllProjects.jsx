import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Helmet } from "react-helmet-async";
import projectsData from '../data/projects.js';

const AllProjects = () => {
    const [myProjects, setMyProjects] = useState([]);
    const [teamProjects, setTeamProjects] = useState([]);
    const [clientProjects, setClientProjects] = useState([]);
    const [workingProjects, setWorkingProjects] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    // Define tab configuration
    const tabs = [
        { id: "all", label: "All Projects", count: null },
        { id: "personal", label: "Personal", count: myProjects.length },
        { id: "team", label: "Team", count: teamProjects.length },
        { id: "client", label: "Client", count: clientProjects.length },
        { id: "working", label: "Working", count: workingProjects.length }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setMyProjects(projectsData["my-project"] || []);
        setTeamProjects(projectsData["team-project"] || []);
        setClientProjects(projectsData["client-project"] || []);
        setWorkingProjects(projectsData["working-project"] || []);
    }, []);

    const getAllProjectsWithType = () => {
        return [
            ...myProjects.map(project => ({ ...project, type: "personal" })),
            ...teamProjects.map(project => ({ ...project, type: "team" })),
            ...clientProjects.map(project => ({ ...project, type: "client" })),
            ...workingProjects.map(project => ({ ...project, type: "working" }))
        ];
    };

    const allProjectsWithType = getAllProjectsWithType();

    // Update the "all" tab count dynamically
    const allProjectsCount = allProjectsWithType.length;

    const filteredProjects = activeTab === "all"
        ? allProjectsWithType
        : allProjectsWithType.filter(project => project.type === activeTab);

    return (
        <div className="dark:bg-gradient-to-b dark:from-black dark:via-black dark:to-gray-950">
            <div id="projects" className="container max-w-7xl mx-auto min-h-screen px-4 pt-7 md:pt-10 pb-16">
                <Helmet>
                    <title>All Projects | Ashraful Islam Ratul</title>
                </Helmet>

                <div className="container mx-auto text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl font-bold dark:text-white">
                            All Projects
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <p className="md:text-lg mx-auto dark:text-gray-300">Take a look at a selection of projects I've created. Each one showcases my skills and creativity.</p>

                    {/* Tab Navigation - Clean & DRY */}
                    <div className="flex justify-center my-10 lg:my-12">
                        <div className="md:bg-white md:dark:bg-gray-800 md:shadow-md md:border md:dark:border-gray-700 md:rounded-xl md:p-2 flex flex-wrap justify-center items-center gap-3">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1 px-3 py-2 md:py-2.5 rounded-lg shadow-md text-sm transition ${activeTab === tab.id
                                            ? "bg-blue-600 text-white font-semibold"
                                            : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 font-medium shadow-inner dark:text-gray-300"
                                        }`}
                                >
                                    {tab.label}
                                    <span>
                                        ({tab.id === "all" ? allProjectsCount : tab.count})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
