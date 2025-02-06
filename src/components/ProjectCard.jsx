// const ProjectCard = ({ title, description, techStack, demoLink, codeLink, image }) => {
//     return (
//         <div className="shadow-xl rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl flex flex-col h-full">
//             {/* Image Section */}
//             <div>
//                 <img src={image} alt={title} className="w-full h-64" />
//             </div>

import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

//             {/* Content Section */}
//             <div className="p-6 flex flex-col flex-grow">
//                 <h3 className="text-2xl font-bold">{title}</h3>
//                 <p className="text-gray-500 text-justify mt-3 flex-grow">{description}</p>

//                 {/* Tech Stack */}
//                 <div className="flex flex-wrap gap-2 mt-4">
//                     {techStack.map((tech, index) => (
//                         <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
//                             {tech}
//                         </span>
//                     ))}
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-4 mt-auto pt-6">
//                     <a
//                         href={demoLink}
//                         target="_blank"
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
//                     >
//                         Demo
//                     </a>
//                     <a
//                         href={codeLink}
//                         target="_blank"
//                         className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
//                     >
//                         Code
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectCard;











const ProjectCard = ({ id, title, description, techStack, demoLink, codeLink, image }) => {

    return (
        <div className="shadow-xl rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl flex flex-col h-full">
            {/* Image Section */}
            <div>
                <img src={image} alt={title} className="w-full h-64 lg:object-cover" />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-grow justify-between">
                <h3 className="text-2xl font-bold">{title}</h3>

                <div>
                    <Link to={`projectDetails/${id}`}>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <FaArrowRightLong />
                        </button>
                    </Link>
                </div>


                {/* <p className="text-gray-500 text-justify mt-3 flex-grow">{description}</p>

                Tech Stack
                <div className="flex flex-wrap gap-2 mt-4">
                    {techStack.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                            {tech}
                        </span>
                    ))}
                </div>

                Buttons
                <div className="flex gap-4 mt-auto pt-6">
                    <a
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Demo
                    </a>
                    <a
                        href={codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                    >
                        Code
                    </a>
                    <div>
                        <Link to={`projectDetails/${id}`}>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                            >
                                View More
                            </button>
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ProjectCard;
