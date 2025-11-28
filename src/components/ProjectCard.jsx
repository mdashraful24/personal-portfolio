import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, image }) => {

    return (
        <div className="shadow-md border border-gray-300 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-100 flex flex-col h-full">
            {/* Image Section */}
            <div>
                <img src={image} alt={title} className="w-full h-72 lg:object-cover" />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-grow justify-between">
                <h3 className="text-xl font-bold">{title}</h3>

                <div>
                    <Link to={`/projectDetails/${id}`}>
                        <button
                            className="group flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors relative overflow-hidden active:scale-[0.98]"
                        >
                            <span
                                className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none"
                            />
                            <FaArrowRightLong />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
