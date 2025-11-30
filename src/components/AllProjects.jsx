import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Helmet } from "react-helmet-async";

const AllProjects = () => {
    const [projects, setProjects] = useState([]);

    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        fetch("/projects.json")
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    return (
        <div id="projects" className="container max-w-7xl mx-auto min-h-screen px-4 py-10">
            <Helmet>
                <title>All Projects || Ashraful Islam Ratul</title>
            </Helmet>

            <div className="container mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">All Projects</h2>
                <p className="mt-4 md:text-lg max-w-lg mx-auto">Take a look at a selection of projects I've created. Each one showcases my skills and creativity.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

export default AllProjects;
