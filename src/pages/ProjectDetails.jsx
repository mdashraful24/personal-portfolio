import { useEffect, useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaServer, FaDatabase, FaCreditCard, FaCloud, FaLightbulb, FaCode, FaPalette, FaMobile, FaImages, FaArrowLeft, FaStar, FaTools, FaRocket } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ProjectDetails = () => {
    const project = useLoaderData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const tabsContainerRef = useRef(null);
    const tabRefs = useRef({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll to active tab on initial load and when activeTab changes
    useEffect(() => {
        if (!isInitialLoad) {
            scrollToActiveTab();
        }
    }, [activeTab]);

    // Handle initial scroll to show the first tab properly
    useEffect(() => {
        if (isInitialLoad && tabsContainerRef.current) {
            // Small delay to ensure DOM is fully rendered
            setTimeout(() => {
                scrollToActiveTab();
                setIsInitialLoad(false);
            }, 150);
        }
    }, [project]); // Re-run when project loads

    // Check if Stripe is available in the handling array
    const hasStripe = project?.handling?.some(tech =>
        tech.name.toLowerCase().includes('stripe')
    );

    // Helper functions to check if data exists and is not empty
    const hasData = (data) => {
        return data && Array.isArray(data) && data.length > 0;
    };

    // Improved function to handle tab click with better scrolling
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        scrollToActiveTab();
    };

    // Separate function for scrolling to active tab
    const scrollToActiveTab = () => {
        const activeTabElement = tabRefs.current[activeTab];
        const container = tabsContainerRef.current;

        if (activeTabElement && container) {
            // Calculate the scroll position to center the active tab
            const containerRect = container.getBoundingClientRect();
            const activeTabRect = activeTabElement.getBoundingClientRect();

            // Calculate scroll position to make the tab visible with some padding
            const scrollLeft = activeTabElement.offsetLeft - (containerRect.width / 2) + (activeTabRect.width / 2);

            container.scrollTo({
                left: Math.max(0, scrollLeft),
                behavior: 'smooth'
            });
        }
    };

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

    const TechCategory = ({ title, techs, icon, color }) => {
        if (!hasData(techs)) return null;

        return (
            <div className="bg-gray-800 rounded-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: color + '20' }}>
                        {icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white">{title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {techs.map((tech, index) => (
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
    };

    // Define available tabs
    const availableTabs = [
        { id: "overview", label: "Overview", icon: <FaStar className="text-yellow-400" />, condition: true },
        { id: "technology", label: "Tech Stack", icon: <FaTools className="text-blue-400" />, condition: true },
        { id: "challenges", label: "Challenges", icon: <FaLightbulb className="text-orange-400" />, condition: hasData(project.challenges) },
        { id: "future", label: "Roadmap", icon: <FaRocket className="text-green-400" />, condition: hasData(project.futurePlans) }
    ].filter(tab => tab.condition);

    return (
        <div className="min-h-screen dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-gray-900 pt-7 pb-16">
            <Helmet>
                <title>{project.title} | Ashraful Islam Ratul</title>
            </Helmet>

            {/* Back Button */}
            <div className="hidden md:block container max-w-7xl mx-auto px-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-700 dark:text-blue-500 font-semibold backdrop-blur-sm rounded-full border border-blue-500 transition-all duration-300 dark:hover:bg-blue-500/50 dark:hover:text-white"
                >
                    <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-sm">Go Back</span>
                </button>
            </div>

            {/* Header with Background */}
            <div className="relative border-b border-gray-700">
                <div className="container max-w-7xl mx-auto px-4 pb-10">
                    <div className="flex flex-col lg:flex-row gap-5 md:gap-8 items-start">
                        {/* Project Image */}
                        <div className="w-full lg:max-w-lg">
                            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-gray-700 transform transition-transform duration-500">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
                                    }}
                                />
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="w-full lg:max-w-3xl">
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
                                {project.demoLink && (
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg overflow-hidden bg-blue-600 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <FaExternalLinkAlt />
                                            <span className="font-semibold">Live Demo</span>
                                        </span>
                                    </a>
                                )}
                                {project.codeLink && (
                                    <a
                                        href={project.codeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white font-medium rounded-lg shadow-sm transition-colors relative overflow-hidden active:scale-[0.98]"
                                    >
                                        <span
                                            className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none"
                                        />
                                        <FaGithub />
                                        <span className="font-semibold">Source Code</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs with Hidden Scrollbar */}
            <div className="border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
                <div className="container max-w-7xl mx-auto px-4">
                    <div
                        ref={tabsContainerRef}
                        className="flex justify-start md:justify-center items-center overflow-x-auto hide-scrollbar"
                        style={{
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE/Edge
                            WebkitOverflowScrolling: 'touch' // Better scrolling on iOS
                        }}
                    >
                        {availableTabs.map((tab) => (
                            <button
                                key={tab.id}
                                ref={(el) => tabRefs.current[tab.id] = el}
                                onClick={() => handleTabClick(tab.id)}
                                className="group relative px-4 sm:px-6 py-3 font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0"
                            >
                                <div className="flex items-center gap-2">
                                    {tab.icon}
                                    <span className={`whitespace-nowrap text-sm sm:text-base ${activeTab === tab.id ? 'text-blue-300' : 'text-gray-400 group-hover:text-gray-300'
                                        }`}>
                                        {tab.label}
                                    </span>
                                </div>

                                {/* Underline indicator */}
                                <span
                                    className={`absolute left-1/2 bottom-0 h-[0.16rem] from-blue-300 via-blue-500 to-blue-600 transition-all duration-300 ease-out transform -translate-x-1/2 ${activeTab === tab.id
                                        ? 'w-full opacity-100 bg-gradient-to-r'
                                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100 bg-gradient-to-l'
                                        }`}
                                />
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

                            {hasData(project.backend) && (
                                <TechCategory
                                    title="Backend & Database"
                                    techs={project.backend}
                                    icon={<FaServer className="text-green-400" />}
                                    color="#34d399"
                                />
                            )}

                            {hasData(project.handling) && (
                                <TechCategory
                                    title={hasStripe ? "Payment & Media" : "Media Handling"}
                                    techs={project.handling}
                                    icon={hasStripe ? <FaCreditCard className="text-purple-400" /> : <FaImages className="text-purple-400" />}
                                    color="#a78bfa"
                                />
                            )}

                            {hasData(project.development) && (
                                <TechCategory
                                    title="Development & Deployment"
                                    techs={project.development}
                                    icon={<FaCloud className="text-orange-400" />}
                                    color="#fb923c"
                                />
                            )}
                        </div>

                        {!hasData(project.frontend) &&
                            !hasData(project.backend) &&
                            !hasData(project.handling) &&
                            !hasData(project.development) && (
                                <div className="text-center py-12">
                                    <p className="text-gray-400">No technical details available for this project.</p>
                                </div>
                            )}
                    </div>
                )}

                {/* Technology Tab */}
                {activeTab === "technology" && (
                    <div className="space-y-6">
                        <div className="bg-gray-800 rounded-xl p-5 lg:p-8">
                            <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 text-white">
                                <FaTools className="text-blue-400" /> 
                                Technical Architecture
                            </h3>
                            <div className="space-y-6">
                                {hasData(project.frontend) && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                                            <FaPalette /> Frontend Stack
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {project.frontend.map((tech, index) => (
                                                <div key={index} className="bg-gray-700 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-600 transition-colors">
                                                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                                    <span className="text-gray-300 font-medium">{tech.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {hasData(project.backend) && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                                            <FaDatabase /> Backend Stack
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {project.backend.map((tech, index) => (
                                                <div key={index} className="bg-gray-700 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-600 transition-colors">
                                                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                                    <span className="text-gray-300 font-medium">{tech.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {hasData(project.handling) && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                                            {hasStripe ? <FaCreditCard /> : <FaImages />}
                                            {hasStripe ? " Payment & Media" : " Media Handling"}
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {project.handling.map((tech, index) => (
                                                <div key={index} className="bg-gray-700 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-600 transition-colors">
                                                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                                                    <span className="text-gray-300 font-medium">{tech.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {!hasData(project.frontend) &&
                                    !hasData(project.backend) &&
                                    !hasData(project.handling) && (
                                        <div className="text-center py-8">
                                            <p className="text-gray-400">No technology details available.</p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Challenges Tab */}
                {activeTab === "challenges" && hasData(project.challenges) && (
                    <div className="bg-gray-800 rounded-xl p-5 lg:p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                            <FaLightbulb className="text-yellow-400" />
                            Challenges & Solutions
                        </h3>
                        <div className="space-y-4">
                            {project.challenges.map((challenge, index) => (
                                <div key={index} className="flex gap-4 p-4 bg-gray-700 rounded-lg border-l-4 border-yellow-400 hover:bg-gray-600 transition-colors">
                                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-200 leading-relaxed">{challenge}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Future Plans Tab */}
                {activeTab === "future" && hasData(project.futurePlans) && (
                    <div className="bg-gray-800 rounded-xl p-5 lg:p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                            <FaRocket className="text-green-500" />
                            Future Roadmap
                        </h3>
                        <div className="grid gap-4">
                            {project.futurePlans.map((plan, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg border-l-4 border-green-500 hover:bg-gray-600 transition-colors group">
                                    <div className="w-3 h-3 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                    <p className="text-gray-200 flex-1">{plan}</p>
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







// import { useEffect, useState, useRef } from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import {
//     FaExternalLinkAlt, FaGithub, FaServer, FaDatabase,
//     FaCreditCard, FaCloud, FaLightbulb, FaCode, FaPalette,
//     FaMobile, FaImages, FaArrowLeft, FaRocket, FaCheckCircle,
//     FaTools, FaLayerGroup, FaStar, FaHeart, FaShareAlt,
//     FaDownload, FaClock, FaUserFriends, FaGlobe, FaArrowRight
// } from "react-icons/fa";
// import { Helmet } from "react-helmet-async";

// const ProjectDetails = () => {
//     const project = useLoaderData();
//     const navigate = useNavigate();
//     const [activeSection, setActiveSection] = useState("overview");
//     const [isLiked, setIsLiked] = useState(false);
//     const [showShare, setShowShare] = useState(false);
//     const sectionsRef = useRef({});
//     const observerRef = useRef(null);

//     useEffect(() => {
//         window.scrollTo(0, 0);

//         // Setup intersection observer for sections
//         observerRef.current = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         const sectionId = entry.target.id;
//                         setActiveSection(sectionId);
//                     }
//                 });
//             },
//             { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" }
//         );

//         // Observe all sections
//         const sections = ["overview", "technology", "challenges", "future"];
//         sections.forEach((section) => {
//             if (sectionsRef.current[section]) {
//                 observerRef.current.observe(sectionsRef.current[section]);
//             }
//         });

//         return () => {
//             if (observerRef.current) {
//                 observerRef.current.disconnect();
//             }
//         };
//     }, []);

//     const hasStripe = project?.handling?.some(tech =>
//         tech.name.toLowerCase().includes('stripe')
//     );

//     const hasData = (data) => {
//         return data && Array.isArray(data) && data.length > 0;
//     };

//     const scrollToSection = (sectionId) => {
//         const element = sectionsRef.current[sectionId];
//         if (element) {
//             const offset = 80;
//             const elementPosition = element.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - offset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: "smooth"
//             });
//             setActiveSection(sectionId);
//         }
//     };

//     const handleShare = async () => {
//         const shareData = {
//             title: project.title,
//             text: project.description,
//             url: window.location.href,
//         };

//         try {
//             await navigator.share(shareData);
//         } catch (err) {
//             setShowShare(!showShare);
//             setTimeout(() => setShowShare(false), 2000);
//         }
//     };

//     if (!project) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
//                 <div className="text-center animate-fade-in">
//                     <div className="text-8xl mb-6 animate-bounce">🚧</div>
//                     <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Project Not Found</h2>
//                     <p className="text-gray-400 mt-3">The project you're looking for doesn't exist or has been moved.</p>
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
//                     >
//                         Go Back
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const TechBadge = ({ tech, color }) => (
//         <div className="group relative">
//             <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500`}></div>
//             <div className="relative flex items-center gap-2 px-3 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
//                 <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
//                 <span className="text-sm text-gray-300 font-medium">{tech.name}</span>
//             </div>
//         </div>
//     );

//     const StatCard = ({ icon, label, value }) => (
//         <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
//             <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
//                     {icon}
//                 </div>
//                 <div>
//                     <p className="text-2xl font-bold text-white">{value}</p>
//                     <p className="text-xs text-gray-400">{label}</p>
//                 </div>
//             </div>
//         </div>
//     );

//     const sections = [
//         { id: "overview", label: "Overview", icon: <FaStar className="text-yellow-400" />, condition: true },
//         { id: "technology", label: "Tech Stack", icon: <FaCode className="text-blue-400" />, condition: true },
//         { id: "challenges", label: "Challenges", icon: <FaTools className="text-orange-400" />, condition: hasData(project.challenges) },
//         { id: "future", label: "Roadmap", icon: <FaRocket className="text-green-400" />, condition: hasData(project.futurePlans) }
//     ].filter(s => s.condition);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
//             <Helmet>
//                 <title>{project.title} | Ashraful Islam Ratul</title>
//             </Helmet>

//             {/* Hero Section with Parallax Effect */}
//             <div className="relative overflow-hidden">
//                 {/* Background Gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10"></div>

//                 {/* Fixed: Properly escaped SVG background pattern */}
//                 <div
//                     className="absolute inset-0 opacity-20"
//                     style={{
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                         backgroundRepeat: 'repeat'
//                     }}
//                 ></div>

//                 <div className="container max-w-7xl mx-auto px-4 pt-8 pb-12 relative">
//                     {/* Back Button */}
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="group mb-8 flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
//                     >
//                         <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform duration-300" />
//                         <span className="text-sm">Back to Projects</span>
//                     </button>

//                     {/* Main Content */}
//                     <div className="grid lg:grid-cols-2 gap-8 items-start">
//                         {/* Image Gallery */}
//                         <div className="space-y-4">
//                             <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-2">
//                                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                                 <img
//                                     src={project.image}
//                                     alt={project.title}
//                                     className="w-full h-auto rounded-xl transform group-hover:scale-105 transition-transform duration-700"
//                                     onError={(e) => {
//                                         e.target.src = "https://via.placeholder.com/800x500?text=Project+Preview";
//                                     }}
//                                 />
//                                 <div className="absolute top-4 right-4 flex gap-2">
//                                     <button
//                                         onClick={() => setIsLiked(!isLiked)}
//                                         className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
//                                     >
//                                         <FaHeart className={`transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
//                                     </button>
//                                     <button
//                                         onClick={handleShare}
//                                         className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
//                                     >
//                                         <FaShareAlt className="text-gray-400" />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Stats */}
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                 <StatCard icon={<FaCode />} label="Tech Stack" value={project.techStack?.length || 0} />
//                                 <StatCard icon={<FaClock />} label="Development" value={project.development?.length || 0} />
//                                 <StatCard icon={<FaUserFriends />} label="Team Size" value={project.teamSize || 1} />
//                                 <StatCard icon={<FaGlobe />} label="Status" value={project.status || "Live"} />
//                             </div>
//                         </div>

//                         {/* Project Info */}
//                         <div>
//                             <div className="mb-6">
//                                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-4">
//                                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                                     <span className="text-xs font-medium text-blue-400">Featured Project</span>
//                                 </div>
//                                 <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                                     {project.title}
//                                 </h1>
//                                 <p className="text-gray-300 leading-relaxed text-lg">
//                                     {project.description}
//                                 </p>
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="flex flex-wrap gap-4 mb-8">
//                                 {project.demoLink && (
//                                     <a
//                                         href={project.demoLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
//                                     >
//                                         <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
//                                         <span className="relative flex items-center gap-2">
//                                             <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform" />
//                                             Live Demo
//                                         </span>
//                                     </a>
//                                 )}
//                                 {project.codeLink && (
//                                     <a
//                                         href={project.codeLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="group flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-xl text-white font-medium border border-gray-700 hover:border-gray-600 hover:bg-gray-700 transition-all duration-300"
//                                     >
//                                         <FaGithub className="group-hover:rotate-12 transition-transform" />
//                                         Source Code
//                                     </a>
//                                 )}
//                                 <button
//                                     onClick={() => scrollToSection("technology")}
//                                     className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 rounded-xl text-gray-300 font-medium border border-gray-700 hover:bg-gray-800 transition-all"
//                                 >
//                                     <FaDownload className="animate-bounce" />
//                                     View Details
//                                 </button>
//                             </div>

//                             {/* Key Features */}
//                             {project.keyFeatures && (
//                                 <div className="space-y-3">
//                                     <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Key Features</h3>
//                                     <div className="flex flex-wrap gap-2">
//                                         {project.keyFeatures.slice(0, 3).map((feature, idx) => (
//                                             <span key={idx} className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300 border border-gray-700">
//                                                 {feature}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Sticky Navigation */}
//             <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
//                 <div className="container max-w-7xl mx-auto px-4">
//                     <div className="flex overflow-x-auto scrollbar-hide justify-center">
//                         {sections.map((section) => (
//                             <button
//                                 key={section.id}
//                                 onClick={() => scrollToSection(section.id)}
//                                 className={`group relative px-6 py-4 font-medium transition-all duration-300 ${activeSection === section.id
//                                     ? "text-blue-400"
//                                     : "text-gray-400 hover:text-gray-300"
//                                     }`}
//                             >
//                                 <div className="flex items-center gap-2">
//                                     {section.icon}
//                                     <span className="whitespace-nowrap">{section.label}</span>
//                                 </div>
//                                 {activeSection === section.id && (
//                                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//                                 )}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Content Sections */}
//             <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
//                 {/* Overview Section */}
//                 <div id="overview" ref={(el) => sectionsRef.current["overview"] = el} className="scroll-mt-24">
//                     <div className="space-y-8">
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
//                                 <FaLayerGroup className="text-blue-400 text-2xl" />
//                             </div>
//                             <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                                 Technical Overview
//                             </h2>
//                         </div>

//                         <div className="grid md:grid-cols-2 gap-6">
//                             {/* Frontend */}
//                             {hasData(project.frontend) && (
//                                 <div className="group">
//                                     <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 h-full">
//                                         <div className="flex items-center gap-3 mb-4">
//                                             <div className="p-2 bg-blue-500/10 rounded-lg">
//                                                 <FaPalette className="text-blue-400 text-xl" />
//                                             </div>
//                                             <h3 className="text-xl font-semibold text-white">Frontend</h3>
//                                         </div>
//                                         <div className="flex flex-wrap gap-2">
//                                             {project.frontend.map((tech, idx) => (
//                                                 <TechBadge key={idx} tech={tech} color="from-blue-500 to-cyan-500" />
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Backend */}
//                             {hasData(project.backend) && (
//                                 <div className="group">
//                                     <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300 h-full">
//                                         <div className="flex items-center gap-3 mb-4">
//                                             <div className="p-2 bg-green-500/10 rounded-lg">
//                                                 <FaServer className="text-green-400 text-xl" />
//                                             </div>
//                                             <h3 className="text-xl font-semibold text-white">Backend</h3>
//                                         </div>
//                                         <div className="flex flex-wrap gap-2">
//                                             {project.backend.map((tech, idx) => (
//                                                 <TechBadge key={idx} tech={tech} color="from-green-500 to-emerald-500" />
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Handling */}
//                             {hasData(project.handling) && (
//                                 <div className="group">
//                                     <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all duration-300 h-full">
//                                         <div className="flex items-center gap-3 mb-4">
//                                             <div className="p-2 bg-purple-500/10 rounded-lg">
//                                                 {hasStripe ? <FaCreditCard className="text-purple-400 text-xl" /> : <FaImages className="text-purple-400 text-xl" />}
//                                             </div>
//                                             <h3 className="text-xl font-semibold text-white">
//                                                 {hasStripe ? "Payment" : "Media"}
//                                             </h3>
//                                         </div>
//                                         <div className="flex flex-wrap gap-2">
//                                             {project.handling.map((tech, idx) => (
//                                                 <TechBadge key={idx} tech={tech} color="from-purple-500 to-pink-500" />
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Development */}
//                             {hasData(project.development) && (
//                                 <div className="group">
//                                     <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-orange-500/30 transition-all duration-300 h-full">
//                                         <div className="flex items-center gap-3 mb-4">
//                                             <div className="p-2 bg-orange-500/10 rounded-lg">
//                                                 <FaCloud className="text-orange-400 text-xl" />
//                                             </div>
//                                             <h3 className="text-xl font-semibold text-white">DevOps</h3>
//                                         </div>
//                                         <div className="flex flex-wrap gap-2">
//                                             {project.development.map((tech, idx) => (
//                                                 <TechBadge key={idx} tech={tech} color="from-orange-500 to-red-500" />
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Technology Section */}
//                 <div id="technology" ref={(el) => sectionsRef.current["technology"] = el} className="scroll-mt-24">
//                     <div className="space-y-6">
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl">
//                                 <FaCode className="text-green-400 text-2xl" />
//                             </div>
//                             <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                                 Complete Tech Stack
//                             </h2>
//                         </div>

//                         <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-gray-800">
//                             <div className="grid md:grid-cols-2 gap-8">
//                                 {/* Frontend Details */}
//                                 {hasData(project.frontend) && (
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
//                                             <FaPalette /> Frontend Technologies
//                                         </h3>
//                                         <div className="grid grid-cols-2 gap-3">
//                                             {project.frontend.map((tech, idx) => (
//                                                 <div key={idx} className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
//                                                     <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
//                                                     <span className="text-sm text-gray-300">{tech.name}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Backend Details */}
//                                 {hasData(project.backend) && (
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
//                                             <FaDatabase /> Backend Technologies
//                                         </h3>
//                                         <div className="grid grid-cols-2 gap-3">
//                                             {project.backend.map((tech, idx) => (
//                                                 <div key={idx} className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
//                                                     <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
//                                                     <span className="text-sm text-gray-300">{tech.name}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Challenges Section */}
//                 {hasData(project.challenges) && (
//                     <div id="challenges" ref={(el) => sectionsRef.current["challenges"] = el} className="scroll-mt-24">
//                         <div className="space-y-6">
//                             <div className="flex items-center gap-3 mb-6">
//                                 <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl">
//                                     <FaLightbulb className="text-orange-400 text-2xl" />
//                                 </div>
//                                 <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                                     Challenges & Solutions
//                                 </h2>
//                             </div>

//                             <div className="space-y-4">
//                                 {project.challenges.map((challenge, index) => (
//                                     <div key={index} className="group relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
//                                         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                                             <FaCheckCircle className="text-green-500" />
//                                         </div>
//                                         <div className="flex gap-4">
//                                             <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
//                                                 {index + 1}
//                                             </div>
//                                             <p className="text-gray-300 leading-relaxed flex-1">{challenge}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Future Plans Section */}
//                 {hasData(project.futurePlans) && (
//                     <div id="future" ref={(el) => sectionsRef.current["future"] = el} className="scroll-mt-24">
//                         <div className="space-y-6">
//                             <div className="flex items-center gap-3 mb-6">
//                                 <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
//                                     <FaRocket className="text-green-400 text-2xl" />
//                                 </div>
//                                 <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                                     Future Roadmap
//                                 </h2>
//                             </div>

//                             <div className="grid gap-4">
//                                 {project.futurePlans.map((plan, index) => (
//                                     <div key={index} className="group relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-5 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
//                                         <div className="flex items-center gap-4">
//                                             <div className="flex-shrink-0">
//                                                 <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
//                                                     <FaMobile className="text-white" />
//                                                 </div>
//                                             </div>
//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-2 mb-1">
//                                                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                                                     <span className="text-xs font-mono text-green-400">Phase {index + 1}</span>
//                                                 </div>
//                                                 <p className="text-gray-300">{plan}</p>
//                                             </div>
//                                             <div className="opacity-0 group-hover:opacity-100 transition-opacity">
//                                                 <FaArrowRight className="text-green-400" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Share Toast */}
//             {showShare && (
//                 <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in-up">
//                     Link copied to clipboard! 📋
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProjectDetails;