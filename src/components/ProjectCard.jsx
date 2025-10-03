import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, image }) => {

    return (
        <div className="shadow-xl border rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-100 hover:shadow-2xl flex flex-col h-full">
            {/* Image Section */}
            <div>
                <img src={image} alt={title} className="w-full h-72 lg:object-cover" />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-grow justify-between">
                <h3 className="text-xl font-bold">{title}</h3>

                <div>
                    <Link to={`projectDetails/${id}`}>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition animate-pulse"
                        >
                            <FaArrowRightLong />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
