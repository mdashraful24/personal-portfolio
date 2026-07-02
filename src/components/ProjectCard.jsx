import { FaGithub, FaExternalLinkAlt, FaUser, FaUsers, FaBriefcase, FaCog } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Tooltip from "../shared/Tooltip";

const ProjectCard = ({ id, title, image, techStack, topTech, description, githubUrl, demoLink, type, frontend, backend, handling, development }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (image) {
            setImageSrc(image);
        } else {
            setImageError(true);
        }
    }, [image]);

    // Get badge based on project type
    const getTypeBadge = () => {
        switch (type) {
            case 'personal':
                return {
                    icon: <FaUser className="w-3.5 h-3.5" />,
                    text: 'Personal Project',
                    color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/90 dark:text-blue-200 dark:border-blue-800'
                };
            case 'team':
                return {
                    icon: <FaUsers className="w-4 h-4" />,
                    text: 'Team Project',
                    color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/90 dark:text-green-300 dark:border-green-800'
                };
            case 'client':
                return {
                    icon: <FaBriefcase className="w-3.5 h-3.5" />,
                    text: 'Client Project',
                    color: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/90 dark:text-purple-100 dark:border-purple-800'
                };
            case 'working':
                return {
                    icon: <FaCog className="w-3.5 h-3.5" />,
                    text: 'Working Project',
                    color: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/90 dark:text-yellow-200 dark:border-yellow-800'
                };
            default:
                return {
                    icon: <FaUser className="w-3.5 h-3.5" />,
                    text: 'Project',
                    color: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                };
        }
    };

    // Get technologies to display - prioritize topTech if available
    const getTechnologiesToDisplay = () => {
        if (topTech && Array.isArray(topTech) && topTech.length > 0) {
            return topTech;
        }

        const allTechs = [];

        if (frontend && Array.isArray(frontend)) {
            allTechs.push(...frontend);
        }
        if (backend && Array.isArray(backend)) {
            allTechs.push(...backend);
        }
        if (handling && Array.isArray(handling)) {
            allTechs.push(...handling);
        }
        if (development && Array.isArray(development)) {
            allTechs.push(...development);
        }

        if (allTechs.length === 0 && techStack && Array.isArray(techStack)) {
            return techStack.map(tech => ({ name: tech, icon: null }));
        }

        return allTechs;
    };

    const technologies = getTechnologiesToDisplay();
    const badge = getTypeBadge();

    return (
        <div className="group relative bg-white dark:bg-black rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">

            {/* Image Container with Gradient Overlay */}
            <div className="relative overflow-hidden h-56 flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                {!imageError && imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        <div className="text-center">
                            <div className="text-4xl mb-2">🖼️</div>
                            <p className="font-semibold dark:text-gray-300">Preview not available</p>
                        </div>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Project Type Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[0.9rem] font-semibold border ${badge.color}`}>
                        {badge.icon}
                        {badge.text}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {demoLink && demoLink !== "View Site" && (
                        <Tooltip text="Live Link" position="topTwo">
                            <a
                                href={demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-blue-700 transition-all duration-200 hover:scale-110 inline-flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaExternalLinkAlt size={18} className="dark:text-white" />
                            </a>
                        </Tooltip>
                    )}
                    {githubUrl && (
                        <Tooltip text="GitHub Repository" position="topFour">
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-blue-700 transition-all duration-200 hover:scale-110 inline-flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaGithub size={18} className="dark:text-white" />
                            </a>
                        </Tooltip>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title with accent line */}
                <div className="mb-3">
                    <h3 className="md:text-2xl font-bold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                        {title}
                    </h3>
                    <div className="w-12 h-0.5 bg-blue-500 mt-2 group-hover:w-16 transition-all duration-300" />
                </div>

                {/* Description */}
                {description && (
                    <p className="md:text-[1.2rem] dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                )}

                {/* View Details Button */}
                <div className="mt-auto">
                    <Link to={`/projectDetails/${id}`}>
                        <button
                            className="
                                w-full flex items-center justify-between
                                py-3 px-5 rounded-xl
                                bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-800
                                text-white font-medium
                                hover:from-blue-600 hover:to-blue-700
                                transition-all duration-300
                                shadow-md hover:shadow-lg
                                group/btn text-[1.1rem]
                            "
                        >
                            <span>Project Details</span>
                            <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;





// import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const ProjectCard = ({ id, title, image, techStack, description, githubUrl, liveUrl }) => {
//     // Helper function to get tech stack colors
//     const getTechColor = (tech) => {
//         const colors = {
//             React: "bg-blue-100 text-blue-700",
//             Node: "bg-green-100 text-green-700",
//             Express: "bg-gray-100 text-gray-700",
//             MongoDB: "bg-green-100 text-green-700",
//             Firebase: "bg-orange-100 text-orange-700",
//             Tailwind: "bg-cyan-100 text-cyan-700",
//             "React Router": "bg-red-100 text-red-700",
//             DaisyUI: "bg-pink-100 text-pink-700",
//             Vite: "bg-purple-100 text-purple-700"
//         };
//         return colors[tech] || "bg-gray-100 text-gray-600";
//     };

//     return (
//         <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">

//             {/* Image Container with Gradient Overlay */}
//             <div className="relative overflow-hidden h-56 flex-shrink-0">
//                 <img
//                     src={image}
//                     alt={title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                 {/* Action Buttons */}
//                 <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                     {githubUrl && (
//                         <a
//                             href={githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="p-2.5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <FaGithub size={16} className="text-gray-700" />
//                         </a>
//                     )}
//                     {liveUrl && (
//                         <a
//                             href={liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="p-2.5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <FaExternalLinkAlt size={14} className="text-gray-700" />
//                         </a>
//                     )}
//                 </div>
//             </div>

//             {/* Content Section */}
//             <div className="p-5 flex flex-col flex-grow">
//                 {/* Title with accent line */}
//                 <div className="mb-3">
//                     <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
//                         {title}
//                     </h3>
//                     <div className="w-12 h-0.5 bg-blue-500 mt-2 group-hover:w-16 transition-all duration-300" />
//                 </div>

//                 {/* Description */}
//                 {description && (
//                     <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
//                         {description}
//                     </p>
//                 )}

//                 {/* Tech Stack with improved styling */}
//                 {techStack && techStack.length > 0 && (
//                     <div className="mb-5">
//                         <div className="flex flex-wrap gap-2">
//                             {techStack.slice(0, 4).map((tech, index) => (
//                                 <span
//                                     key={index}
//                                     className={`px-2.5 py-1 text-xs font-medium rounded-md ${getTechColor(tech)}`}
//                                 >
//                                     {tech}
//                                 </span>
//                             ))}
//                             {techStack.length > 4 && (
//                                 <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
//                                     +{techStack.length - 4}
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* View Details Button */}
//                 <div className="mt-auto">
//                     <Link to={`/projectDetails/${id}`}>
//                         <button
//                             className="
//                                 w-full flex items-center justify-between
//                                 py-3 px-5 rounded-xl
//                                 bg-gradient-to-r from-gray-900 to-gray-800
//                                 text-white font-medium text-sm
//                                 hover:from-blue-600 hover:to-blue-700
//                                 transition-all duration-300
//                                 shadow-md hover:shadow-lg
//                                 group/btn
//                             "
//                         >
//                             <span>Explore Project</span>
//                             <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectCard;