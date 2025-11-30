import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, image, techStack, description, githubUrl, liveUrl }) => {
    return (
        <div className="group bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative overflow-hidden flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay with buttons */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaGithub size={18} />
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaExternalLinkAlt size={16} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content - Flex container to push button to bottom */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                </h3>

                {description && (
                    <p className="text-sm mb-4 line-clamp-2 flex-grow-0">
                        {description}
                    </p>
                )}

                {/* Tech Stack */}
                {techStack && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {techStack.slice(0, 4).map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* View Details Button - This will always be at the bottom */}
                <div className="mt-auto">
                    <Link to={`/projectDetails/${id}`}>
                        <button
                            className="
                                relative w-full flex items-center justify-center gap-2 
                                py-3 px-4 rounded-xl overflow-hidden
                                bg-gray-900 text-white font-medium
                                transition-all duration-300 ease-in-out
                                group-hover:bg-blue-600
                                before:absolute before:inset-0 before:bg-gradient-to-r 
                                before:from-blue-700 before:to-blue-800 
                                before:transition-all before:duration-500 before:-translate-x-full 
                                group-hover:before:translate-x-0 before:z-0
                            "
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Details
                                <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
