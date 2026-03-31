import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, image, techStack, description, githubUrl, liveUrl }) => {
    // Helper function to get tech stack colors
    const getTechColor = (tech) => {
        const colors = {
            React: "bg-blue-100 text-blue-700",
            Node: "bg-green-100 text-green-700",
            Express: "bg-gray-100 text-gray-700",
            MongoDB: "bg-green-100 text-green-700",
            Firebase: "bg-orange-100 text-orange-700",
            Tailwind: "bg-cyan-100 text-cyan-700",
            "React Router": "bg-red-100 text-red-700",
            DaisyUI: "bg-pink-100 text-pink-700",
            Vite: "bg-purple-100 text-purple-700"
        };
        return colors[tech] || "bg-gray-100 text-gray-600";
    };

    return (
        <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">

            {/* Image Container with Gradient Overlay */}
            <div className="relative overflow-hidden h-56 flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaGithub size={16} className="text-gray-700" />
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaExternalLinkAlt size={14} className="text-gray-700" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title with accent line */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                        {title}
                    </h3>
                    <div className="w-12 h-0.5 bg-blue-500 mt-2 group-hover:w-16 transition-all duration-300" />
                </div>

                {/* Description */}
                {description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Tech Stack with improved styling */}
                {techStack && techStack.length > 0 && (
                    <div className="mb-5">
                        <div className="flex flex-wrap gap-2">
                            {techStack.slice(0, 4).map((tech, index) => (
                                <span
                                    key={index}
                                    className={`px-2.5 py-1 text-xs font-medium rounded-md ${getTechColor(tech)}`}
                                >
                                    {tech}
                                </span>
                            ))}
                            {techStack.length > 4 && (
                                <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                                    +{techStack.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* View Details Button */}
                <div className="mt-auto">
                    <Link to={`/projectDetails/${id}`}>
                        <button
                            className="
                                w-full flex items-center justify-between
                                py-3 px-5 rounded-xl
                                bg-gradient-to-r from-gray-900 to-gray-800
                                text-white font-medium text-sm
                                hover:from-blue-600 hover:to-blue-700
                                transition-all duration-300
                                shadow-md hover:shadow-lg
                                group/btn
                            "
                        >
                            <span>Explore Project</span>
                            <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
