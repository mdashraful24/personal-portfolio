import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, image }) => {

    return (
        <div className="shadow-xl rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-100 hover:shadow-2xl flex flex-col h-full">
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
                            Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
