// import React from "react";
// import { useLoaderData } from "react-router-dom";

// const ProjectDetails = () => {
//     const project = useLoaderData();

//     if (!project) {
//         return <p className="text-center text-red-500">Project not found!</p>;
//     }

//     return (
//         <div className="container mx-auto min-h-screen pt-10 px-6">
//             <h1 className="text-2xl md:text-4xl font-bold mb-5 md:mb-8">{project.title}</h1>
//             <img src={project.image} alt={project.title} className="w-full h-full lg:h-[600px] rounded-lg shadow-lg" />
//             <p className="text-lg mt-4">{project.description}</p>

//             <h3 className="text-xl font-semibold mt-6">Tech Stack:</h3>
//             <div className="flex flex-wrap gap-2 mt-2">
//                 {project.techStack.map((tech, index) => (
//                     <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
//                         {tech}
//                     </span>
//                 ))}
//             </div>

//             <div className="flex gap-4 mt-6">
//                 <a
//                     href={project.demoLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                     Live Demo
//                 </a>
//                 <a
//                     href={project.codeLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
//                 >
//                     View Code
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default ProjectDetails;



// import React, { useEffect } from "react";
// import { useLoaderData } from "react-router-dom";

// const ProjectDetails = () => {
//     const project = useLoaderData();

//     // Scroll to top when the component mounts
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }, []);

//     if (!project) {
//         return <p className="text-center text-red-500">Project not found!</p>;
//     }

//     return (
//         <div className="container max-w-5xl mx-auto min-h-screen pt-10 px-6">
//             <h1 className="text-2xl md:text-4xl font-bold mb-5 md:mb-8">{project.title}</h1>
//             <img src={project.image} alt={project.title} className="w-full h-full lg:h-[500px] rounded-lg shadow-lg" />
//             <p className="text-lg mt-4">{project.description}</p>

//             <h3 className="text-xl font-semibold mt-6">Tech Stack:</h3>
//             <div className="flex flex-wrap gap-2 mt-2">
//                 {project.techStack.map((tech, index) => (
//                     <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
//                         {tech}
//                     </span>
//                 ))}
//             </div>

//             <div className="flex gap-4 mt-6">
//                 <a
//                     href={project.demoLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                     Live Demo
//                 </a>
//                 <a
//                     href={project.codeLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
//                 >
//                     View Code
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default ProjectDetails;

// final
import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const ProjectDetails = () => {
    const project = useLoaderData();

    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (!project) {
        return <p className="text-center text-red-500">Project not found!</p>;
    }

    return (
        <div className="container max-w-5xl mx-auto min-h-screen py-10 px-6">
            <h1 className="text-2xl md:text-4xl font-semibold mb-5 md:mb-8"> Project: <span className="font-normal">{project.title}</span></h1>
            <img src={project.image} alt={project.title} className="w-full h-full lg:h-[500px] rounded-lg shadow-lg" />
            <p className="text-lg mt-6"><strong>Description:</strong> {project.description}</p>

            {/* Main Technology Stack */}
            <h3 className="text-xl font-bold mt-6 underline">Main Technology Stack</h3>

            {/* Frontend */}
            {project.frontend && project.frontend.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-4">Frontend:</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {project.frontend.map((tech, index) => (
                            <div key={index} className="flex items-center space-x-2 text-black bg-blue-50 px-3 py-2 rounded-lg shadow">
                                <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                <span className="text-sm font-medium">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Backend and Database */}
            {project.backend && project.backend.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-6">Backend and Database:</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {project.backend.map((tech, index) => (
                            <div key={index} className="flex items-center space-x-2 text-black bg-blue-50 px-3 py-2 rounded-lg shadow">
                                <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                <span className="text-sm font-medium">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Payment & Media Handling */}
            {project.handling && project.handling.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-6">Payment & Media Handling:</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {project.handling.map((tech, index) => (
                            <div key={index} className="flex items-center space-x-2 text-black bg-blue-50 px-3 py-2 rounded-lg shadow">
                                <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                <span className="text-sm font-medium">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Development & Deployment */}
            {project.development && project.development.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-6">Development & Deployment:</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {project.development.map((tech, index) => (
                            <div key={index} className="flex items-center space-x-2 text-black bg-blue-50 px-3 py-2 rounded-lg shadow">
                                <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                <span className="text-sm font-medium">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Button */}
            <div className="flex gap-4 mt-8">
                <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Live Project Link
                </a>
                <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Source Code
                </a>
            </div>

            {/* Challenges Section */}
            {project.challenges && project.challenges.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Challenges Faced:</h3>
                    <ul className="list-disc pl-5 mt-2">
                        {project.challenges.map((challenge, index) => (
                            <li key={index} className="text-lg">{challenge}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Future Plans Section */}
            {project.futurePlans && project.futurePlans.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Potential Improvements & Future Plans:</h3>
                    <ul className="list-disc pl-5 mt-2">
                        {project.futurePlans.map((plan, index) => (
                            <li key={index} className="text-lg">{plan}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
