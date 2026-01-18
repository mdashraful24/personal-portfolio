import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaServer, FaDatabase, FaCreditCard, FaCloud, FaLightbulb, FaCode, FaPalette, FaMobile, FaImages } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ProjectDetails = () => {
    const project = useLoaderData();
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // Check if Stripe is available in the handling array
    const hasStripe = project.handling?.some(tech =>
        tech.name.toLowerCase().includes('stripe')
    );

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="text-6xl mb-4">🚧</div>
                    <h2 className="text-2xl font-bold text-red-400">Project Not Found</h2>
                    <p className="text-gray-400 mt-2">The project you're looking for doesn't exist or has been moved.</p>
                </div>
            </div>
        );
    }

    const TechCategory = ({ title, techs, icon, color }) => (
        <div className="bg-gray-800 rounded-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: color + '20' }}>
                    {icon}
                </div>
                <h4 className="text-lg font-semibold text-white">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {techs?.map((tech, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium"
                        style={{ backgroundColor: color + '20', color: color }}
                    >
                        <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                        {tech.name}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="pb-10">
            <Helmet>
                <title>{project.title} || Ashraful Islam Ratul</title>
            </Helmet>

            {/* Header with Background */}
            <div className="relative border-b border-gray-700">
                <div className="container max-w-7xl mx-auto px-4 py-10">
                    <div className="flex flex-col lg:flex-row gap-5 md:gap-8 items-start">
                        {/* Project Image */}
                        <div className="w-full lg:max-w-lg"> {/* lg:w-2/5 */}
                            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-gray-700 transform transition-transform duration-500 lg:hover:scale-105">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="w-full lg:max-w-3xl"> {/* lg:w-3/5 */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-8 bg-blue-700 rounded-full"></div>
                                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                    {project.title}
                                </h1>
                            </div>

                            <p className="md:text-lg mb-6 text-justify">
                                {project.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    //     className="group flex items-center gap-2 px-4 py-2 md:py-3 bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors relative overflow-hidden active:scale-[0.98]"
                                    // >
                                    //     <span
                                    //         className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none"
                                    //     />
                                    //     <FaExternalLinkAlt />
                                    //     <span className="font-semibold">Live Demo</span>
                                    className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg overflow-hidden bg-blue-600 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <FaExternalLinkAlt />
                                        <span className="font-semibold">Live Demo</span>
                                    </span>
                                </a>
                                <a
                                    href={project.codeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 px-3 py-2 bg-black text-white font-medium rounded-lg shadow-sm transition-colors relative overflow-hidden active:scale-[0.98]"
                                >
                                    <span
                                        className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none"
                                    />
                                    <FaGithub />
                                    <span className="font-semibold">Source Code</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        {["overview", "technology", "challenges", "future"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 font-medium whitespace-nowrap border-b-4 transition-all duration-300 ${activeTab === tab
                                    ? "border-blue-400 text-blue-300"
                                    : "border-transparent text-gray-400 hover:text-gray-300"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="container max-w-7xl mx-auto px-4 pt-8">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-5 lg:gap-8">
                            <TechCategory
                                title="Frontend Technologies"
                                techs={project.frontend}
                                icon={<FaPalette className="text-blue-400" />}
                                color="#60a5fa"
                            />
                            <TechCategory
                                title="Backend & Database"
                                techs={project.backend}
                                icon={<FaServer className="text-green-400" />}
                                color="#34d399"
                            />

                            {/* Conditional Title for Payment/Media Section */}
                            {project.handling && project.handling.length > 0 && (
                                <TechCategory
                                    title={hasStripe ? "Payment & Media" : "Media Handling"}
                                    techs={project.handling}
                                    icon={hasStripe ? <FaCreditCard className="text-purple-400" /> : <FaImages className="text-purple-400" />}
                                    color="#a78bfa"
                                />
                            )}

                            <TechCategory
                                title="Development & Deployment"
                                techs={project.development}
                                icon={<FaCloud className="text-orange-400" />}
                                color="#fb923c"
                            />
                        </div>
                    </div>
                )}

                {/* Technology Tab */}
                {activeTab === "technology" && (
                    <div className="space-y-6">
                        <div className="bg-gray-800 rounded-xl p-5 lg:p-8">
                            <h3 className="text-2xl font-bold mb-6 text-white">Technical Architecture</h3>
                            <div className="space-y-6">
                                {project.frontend && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                                            <FaPalette /> Frontend Stack
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {project.frontend.map((tech, index) => (
                                                <div key={index} className="bg-gray-700 p-4 rounded-lg flex items-center gap-3 hover:bg-gray-600 transition-colors">
                                                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                                    <span className="text-gray-300 font-medium">{tech.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {project.backend && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                                            <FaDatabase /> Backend Stack
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {project.backend.map((tech, index) => (
                                                <div key={index} className="bg-gray-700 p-4 rounded-lg flex items-center gap-3 hover:bg-gray-600 transition-colors">
                                                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                                    <span className="text-gray-300 font-medium">{tech.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {project.handling && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                                            {hasStripe ? <FaCreditCard /> : <FaImages />}
                                            {hasStripe ? " Payment & Media" : " Media Handling"}
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {project.handling.map((tech, index) => (
                                                <div key={index} className="bg-gray-700 p-4 rounded-lg flex items-center gap-3 hover:bg-gray-600 transition-colors">
                                                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                                    <span className="text-gray-300 font-medium">{tech.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Challenges Tab */}
                {activeTab === "challenges" && project.challenges && (
                    <div className="bg-gray-800 rounded-xl p-5 lg:p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                            <FaLightbulb className="text-yellow-400" />
                            Challenges & Solutions
                        </h3>
                        <div className="space-y-4">
                            {project.challenges.map((challenge, index) => (
                                <div key={index} className="flex gap-4 p-4 bg-gray-700 rounded-lg border-l-4 border-yellow-400 hover:bg-gray-600 transition-colors">
                                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{challenge}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Future Plans Tab */}
                {activeTab === "future" && project.futurePlans && (
                    <div className="bg-gray-800 rounded-xl p-5 lg:p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                            <FaCode className="text-green-400" />
                            Future Roadmap
                        </h3>
                        <div className="grid gap-4">
                            {project.futurePlans.map((plan, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg border-l-4 border-green-400 hover:bg-gray-600 transition-colors group">
                                    <div className="w-3 h-3 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></div>
                                    <p className="text-gray-300 flex-1">{plan}</p>
                                    <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaMobile />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;
