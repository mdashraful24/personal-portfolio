import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const ProjectsShowcase = () => {
    const [myProjects, setMyProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/projects.json")
            .then(response => response.json())
            .then(data => {
                // Only set myProjects, ignore team projects
                setMyProjects(data["my-project"] || []);
            })
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    // Get only first 3 personal projects
    const displayedMyProjects = myProjects.slice(0, 3);

    const handleViewMoreClick = () => {
        navigate("/all-projects");
    };

    return (
        <div id="projects" className="container max-w-7xl mx-auto px-4 py-10 md:py-20 lg:py-32 xl:py-40">
            <div className="container mx-auto text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">My Projects</h2>
                <p className="mt-4 md:text-lg">Here are some of the projects I've worked on.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* First 2 regular project cards */}
                {displayedMyProjects.slice(0, 2).map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        techStack={project.techStack}
                        demoLink={project.demoLink}
                        codeLink={project.codeLink}
                        image={project.image}
                        type="personal"
                    />
                ))}

                {/* Third card as View More - Full card overlay */}
                {displayedMyProjects[2] && (
                    <div
                        className="rounded-2xl shadow hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer relative"
                        onClick={handleViewMoreClick}
                    >
                        {/* Background Image */}
                        <img
                            src={displayedMyProjects[2].image}
                            alt={displayedMyProjects[2].title}
                            className="w-full h-full object-cover absolute inset-0 brightness-50"
                        />

                        {/* Full Card Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center p-6 text-center">
                            <div className="text-white">
                                <h3 className="text-2xl font-medium">View All Projects</h3>
                            </div>
                        </div>

                        {/* Original card content (hidden but maintains layout) */}
                        <div className="opacity-0">
                            <div className="h-72"></div>
                            <div className="p-6 flex flex-grow justify-between items-center">
                                <h3 className="text-xl font-bold">{displayedMyProjects[2].title}</h3>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
                                    <FaArrowRightLong />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsShowcase;
