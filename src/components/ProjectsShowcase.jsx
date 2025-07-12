import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const ProjectsShowcase = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("/projects.json")
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    return (
        <div id="projects" className="pt-10 md:pt-20 container max-w-7xl mx-auto">
            <div className="container mx-auto text-center mb-10 md:mb-16 px-5">
                <h2 className="text-3xl md:text-4xl font-bold">My Projects</h2>
                <p className="mt-4 md:text-lg">Here are some of the projects I've worked on.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        techStack={project.techStack}
                        demoLink={project.demoLink}
                        codeLink={project.codeLink}
                        image={project.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectsShowcase;