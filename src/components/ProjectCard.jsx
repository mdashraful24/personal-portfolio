import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, image, techStack }) => {
    return (
        <div className="group relative border shadow rounded-3xl overflow-hidden hover:text-white">
            {/* Glass Morphism Background */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl" />

            {/* Background Blur Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover blur-md scale-110"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-60 overflow-hidden rounded-xl m-3 mb-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
                        {title}
                    </h3>

                    {/* Tech Stack Pills */}
                    {techStack && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {techStack.slice(0, 3).map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-gray-700 text-xs rounded-full border border-white/30 group-hover:bg-white/40 group-hover:text-white transition-all duration-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto pt-4 border-t border-white/20">
                        <Link to={`/projectDetails/${id}`}>
                            <button className="group/btn w-full flex items-center justify-between px-4 py-3 bg-white/20 backdrop-blur-sm hover:text-gray-900 rounded-xl border shadow hover:border-white/30 hover:bg-white hover:shadow-lg transition-all duration-300">
                                <span className="font-semibold text-sm">View Project</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                                        Explore
                                    </span>
                                    <FaArrowRightLong className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
