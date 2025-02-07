// import ProjectCard from "./ProjectCard";

// const ProjectsShowcase = () => {
//     const projects = [
//         {
//             title: "Learn Hive Website",
//             description: "A MERN stack platform designed to enhance interactions between educational institutions, tutors, and students, making skill learning and class management more efficient and accessible.",
//             techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
//             demoLink: "https://learnhive-4ed81.web.app/",
//             codeLink: "https://github.com/mdashraful24/Learn-hive-client",
//             image: "https://i.ibb.co.com/wZVSgzSt/Screenshot-27.png"
//         },
//         {
//             title: "Race Trackers Website",
//             description: "It is a comprehensive platform designed to simplify the organization and participation process for marathon events.",
//             techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
//             demoLink: "https://marathonproject-2a4f2.web.app/",
//             codeLink: "https://github.com/mdashraful24/mw-assignments11-client",
//             image: "https://i.ibb.co.com/rWhHRQL/Screenshot-30.png"
//         },
//         {
//             title: "Donation Website",
//             description: "A platform connecting donors with those in need, ensuring warm clothing reaches the right hands. Built with React, Tailwind CSS, Node.js, Express.js, and MongoDB for seamless donation management.",
//             techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
//             demoLink: "https://crowdcube-c99dd.web.app/",
//             codeLink: "https://github.com/mdashraful24/crowd-cube-client",
//             image: "https://i.ibb.co.com/S4dPxQrw/Screenshot-28.png"
//         }
//     ];

//     return (
//         <div id="projects" className="py-20 container mx-auto">
//             <div className="container mx-auto text-center mb-16 px-5">
//                 <h2 className="text-4xl font-bold">My Projects</h2>
//                 <p className="mt-4 text-lg">Here are some of the projects I've worked on.</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
//                 {projects.map((project, index) => (
//                     <ProjectCard
//                         key={index}
//                         title={project.title}
//                         description={project.description}
//                         techStack={project.techStack}
//                         demoLink={project.demoLink}
//                         codeLink={project.codeLink}
//                         image={project.image}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProjectsShowcase;




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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
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