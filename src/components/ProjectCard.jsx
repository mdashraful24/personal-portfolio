import { motion } from "framer-motion";

const ProjectCard = ({ title, description, techStack, demoLink, codeLink, image }) => {
    return (
        <motion.div
            className="shadow-xl rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl flex flex-col h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Image Section */}
            <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-gray-500 text-justify mt-3 flex-grow">{description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {techStack.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-auto pt-6">
                    <a
                        href={demoLink}
                        target="_blank"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Demo
                    </a>
                    <a
                        href={codeLink}
                        target="_blank"
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                    >
                        Code
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
