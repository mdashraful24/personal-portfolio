import { useEffect, useState, useRef } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import projectsData from '../data/projects.js';

const AllProjects = () => {
    const [projects, setProjects] = useState({
        my: [], team: [], client: [], working: []
    });
    const [activeTab, setActiveTab] = useState("all");
    const [visibleItems, setVisibleItems] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const observerRef = useRef();

    // Tab configuration with icons
    const tabs = [
        { id: "all", label: "All", getCount: () => allProjects.length, icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
        { id: "personal", label: "Personal", type: "my", getCount: () => projects.my.length, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
        { id: "team", label: "Team", type: "team", getCount: () => projects.team.length, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
        { id: "client", label: "Client", type: "client", getCount: () => projects.client.length, icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { id: "working", label: "Working", type: "working", getCount: () => projects.working.length, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }
    ];

    // Get all projects with type
    const allProjects = [
        ...projects.my.map(p => ({ ...p, type: "personal" })),
        ...projects.team.map(p => ({ ...p, type: "team" })),
        ...projects.client.map(p => ({ ...p, type: "client" })),
        ...projects.working.map(p => ({ ...p, type: "working" }))
    ];

    const filteredProjects = activeTab === "all"
        ? allProjects
        : allProjects.filter(p => p.type === activeTab);

    // Load projects data
    useEffect(() => {
        setProjects({
            my: projectsData["my-project"] || [],
            team: projectsData["team-project"] || [],
            client: projectsData["client-project"] || [],
            working: projectsData["working-project"] || []
        });
        window.scrollTo(0, 0);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => window.innerWidth >= 768 && setMobileMenuOpen(false);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Intersection Observer for animations
    useEffect(() => {
        setVisibleItems({});
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-id');
                        if (id) {
                            setVisibleItems(prev => ({ ...prev, [id]: true }));
                            observerRef.current.unobserve(entry.target);
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        setTimeout(() => {
            document.querySelectorAll('[data-observe]').forEach(item => observerRef.current.observe(item));
        }, 100);

        return () => observerRef.current?.disconnect();
    }, [activeTab, filteredProjects.length]);

    // Handle tab click with scroll to top on all screens
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setMobileMenuOpen(false);

        // Scroll to top smoothly on all screen sizes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reusable Icon Component
    const Icon = ({ path, className = "w-4 h-4" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
        </svg>
    );

    // Reusable Tab Button Component
    const TabButton = ({ tab, isActive, onClick, isMobile = false }) => (
        <button
            onClick={onClick}
            className={`
                group relative p-2 rounded-lg text-[1rem] font-semibold transition-all duration-200
                flex items-center justify-between w-full
                ${isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                ${isMobile ? "flex-col gap-1 py-2 px-2" : ""}
            `}
        >
            <span className={`flex items-center gap-2 lg:gap-3 ${isMobile ? "flex-col" : ""}`}>
                <Icon path={tab.icon} className={`hidden md:block ${isMobile ? "w-5 h-5" : "w-4 h-4"} flex-shrink-0`} />
                {!isMobile && <span className="truncate">{tab.label}</span>}
                {isMobile && <span className="text- font-medium">{tab.label}</span>}
            </span>
            {!isMobile && (
                <span className={`px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${isActive ? "dark:bg-white/20 border border-blue-300" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}>
                    {tab.id === "all" ? allProjects.length : tab.getCount()}
                </span>
            )}
        </button>
    );

    return (
        <div className="dark:bg-black">
            <div className="container max-w-7xl mx-auto min-h-screen px-4 pt-4 md:pt-8 pb-20 md:pb-12">
                <title>All Projects | Ashraful Islam Ratul</title>

                {/* Dashboard Layout */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">

                    {/* Left Sidebar */}
                    <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-64 lg:w-72 flex-shrink-0 transition-all duration-300`}>
                        <div className="md:sticky md:top-24">
                            {/* Header */}
                            <div className="hidden md:block text-center md:text-left mb-4">
                                <div className="flex items-center justify-center md:justify-start mb-3 lg:mb-4">
                                    <span className="h-0.5 w-8 lg:w-12 bg-gradient-to-r from-transparent to-blue-700"></span>
                                    <span className="px-3 lg:px-4 text-2xl lg:text-3xl font-bold dark:text-white">All Projects</span>
                                    <span className="h-0.5 w-8 lg:w-12 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                                </div>
                                <p className="md:text-[1.05rem] dark:text-gray-300">Take a look at a selection of projects I've created. Each one showcases my skills and creativity.</p>
                            </div>

                            {/* Tab Navigation */}
                            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-gray-200 dark:border-gray-800">
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    {tabs.map(tab => (
                                        <TabButton
                                            key={tab.id}
                                            tab={tab}
                                            isActive={activeTab === tab.id}
                                            onClick={() => handleTabClick(tab.id)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Info Card */}
                            <div className="hidden md:block mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Icon path="M13 10V3L4 14h7v7l9-11h-7z" className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold dark:text-white">Total Impact</h4>
                                </div>
                                <p className="leading-relaxed">
                                    <span className="font-bold">{allProjects.length}+</span> projects have been worked on using cutting-edge technology and creative solutions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="block md:hidden text-center mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-200 dark:border-gray-800">
                            <h2 className="text-3xl font-semibold dark:text-white capitalize">
                                {activeTab === "all" ? "All Projects" : `${tabs.find(t => t.id === activeTab)?.label} Projects`}
                            </h2>
                            <p className="text-xl mt-1">
                                Showing <span className="dark:text-blue-500 font-bold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 xl:gap-7">
                            {filteredProjects.map((project, index) => (
                                <div key={project.id} data-observe data-id={project.id} className="relative">
                                    <div className={`transition-all duration-700 ease-out ${visibleItems[project.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                        style={{ transitionDelay: `${Math.min(index * 50, 500)}ms` }}>
                                        <div className="group relative">
                                            <div className="relative bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:-translate-y-1">
                                                <ProjectCard
                                                    id={project.id}
                                                    title={project.title}
                                                    description={project.description}
                                                    techStack={project.techStack}
                                                    topTech={project.topTech}
                                                    frontend={project.frontend}
                                                    backend={project.backend}
                                                    handling={project.handling}
                                                    development={project.development}
                                                    demoLink={project.demoLink}
                                                    codeLink={project.codeLink}
                                                    githubUrl={project.codeLink}
                                                    image={project.image}
                                                    type={project.type}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="text-center py-8 sm:py-12">
                                <p className="dark:text-gray-400 text-base sm:text-lg animate-pulse">
                                    No projects found in this category.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 py-2 px-4 z-50">
                    <div className="flex justify-around gap-1">
                        {tabs.slice(0, 5).map(tab => (
                            <TabButton
                                key={tab.id}
                                tab={tab}
                                isActive={activeTab === tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                isMobile={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProjects;




// ! Just Use Sometimes
// import { useEffect, useState, useRef } from "react";
// import ProjectCard from "../components/ProjectCard.jsx";
// import { Helmet } from "react-helmet-async";
// import projectsData from '../data/projects.js';

// const AllProjects = () => {
//     const [myProjects, setMyProjects] = useState([]);
//     const [teamProjects, setTeamProjects] = useState([]);
//     const [clientProjects, setClientProjects] = useState([]);
//     const [workingProjects, setWorkingProjects] = useState([]);
//     const [activeTab, setActiveTab] = useState("all");
//     const [visibleItems, setVisibleItems] = useState({});
//     const observerRef = useRef();

//     // Define tab configuration
//     const tabs = [
//         { id: "all", label: "All Projects", count: null },
//         { id: "personal", label: "Personal", count: myProjects.length },
//         { id: "team", label: "Team", count: teamProjects.length },
//         { id: "client", label: "Client", count: clientProjects.length },
//         { id: "working", label: "Working", count: workingProjects.length }
//     ];

//     // Helper function to get all projects with types
//     const getAllProjectsWithType = () => {
//         return [
//             ...myProjects.map(project => ({ ...project, type: "personal" })),
//             ...teamProjects.map(project => ({ ...project, type: "team" })),
//             ...clientProjects.map(project => ({ ...project, type: "client" })),
//             ...workingProjects.map(project => ({ ...project, type: "working" }))
//         ];
//     };

//     // Derived state
//     const allProjectsWithType = getAllProjectsWithType();
//     const allProjectsCount = allProjectsWithType.length;
//     const filteredProjects = activeTab === "all"
//         ? allProjectsWithType
//         : allProjectsWithType.filter(project => project.type === activeTab);

//     // Initial scroll to top
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // Load projects data
//     useEffect(() => {
//         setMyProjects(projectsData["my-project"] || []);
//         setTeamProjects(projectsData["team-project"] || []);
//         setClientProjects(projectsData["client-project"] || []);
//         setWorkingProjects(projectsData["working-project"] || []);
//     }, []);

//     // Set up intersection observer for animations
//     useEffect(() => {
//         setVisibleItems({});

//         if (observerRef.current) {
//             observerRef.current.disconnect();
//         }

//         observerRef.current = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         const id = entry.target.getAttribute('data-id');
//                         if (id) {
//                             setVisibleItems(prev => ({ ...prev, [id]: true }));
//                             observerRef.current.unobserve(entry.target);
//                         }
//                     }
//                 });
//             },
//             { threshold: 0.1, rootMargin: '50px' }
//         );

//         // Small delay to ensure DOM is ready
//         setTimeout(() => {
//             const items = document.querySelectorAll('[data-observe]');
//             items.forEach(item => observerRef.current.observe(item));
//         }, 100);

//         return () => {
//             if (observerRef.current) {
//                 observerRef.current.disconnect();
//             }
//         };
//     }, [activeTab, filteredProjects.length]);

//     return (
//         <div className="dark:bg-gradient-to-b dark:from-black dark:via-black dark:to-gray-950">
//             <div id="projects" className="container max-w-7xl mx-auto min-h-screen px-4 pt-7 md:pt-10 pb-16">
//                 <Helmet>
//                     <title>All Projects | Ashraful Islam Ratul</title>
//                 </Helmet>

//                 {/* Dashboard Layout - Sidebar + Content */}
//                 <div className="flex flex-col md:flex-row gap-8">

//                     {/* Left Sidebar - Sticky Navigation */}
//                     <div className="md:w-72 lg:w-80 flex-shrink-0">
//                         <div className="md:sticky md:top-24">
//                             {/* Header Section */}
//                             <div className="text-center md:text-left mb-6">
//                                 <div className="flex items-center justify-center md:justify-start mb-4">
//                                     <span className="h-0.5 w-12 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                                     <span className="px-4 text-2xl md:text-3xl font-bold dark:text-white">
//                                         Projects
//                                     </span>
//                                 </div>
//                                 <p className="text-sm md:text-base dark:text-gray-300">
//                                     Browse through my collection of work
//                                 </p>
//                             </div>

//                             {/* Tab Navigation - Vertical Layout */}
//                             <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-gray-200 dark:border-gray-800">
//                                 <div className="flex flex-col gap-2">
//                                     {tabs.map(tab => (
//                                         <button
//                                             key={tab.id}
//                                             onClick={() => setActiveTab(tab.id)}
//                                             className={`
//                                                 group relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
//                                                 flex items-center justify-between
//                                                 ${activeTab === tab.id
//                                                     ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-md"
//                                                     : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
//                                                 }
//                                             `}
//                                         >
//                                             <span className="flex items-center gap-3">
//                                                 {/* Icon indicators */}
//                                                 {tab.id === "all" && (
//                                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                                                     </svg>
//                                                 )}
//                                                 {tab.id === "personal" && (
//                                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                     </svg>
//                                                 )}
//                                                 {tab.id === "team" && (
//                                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                                                     </svg>
//                                                 )}
//                                                 {tab.id === "client" && (
//                                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                                     </svg>
//                                                 )}
//                                                 {tab.id === "working" && (
//                                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                     </svg>
//                                                 )}
//                                                 {tab.label}
//                                             </span>
//                                             <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id
//                                                 ? "bg-white/20 text-white"
//                                                 : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
//                                                 }`}>
//                                                 {tab.id === "all" ? allProjectsCount : tab.count}
//                                             </span>
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Optional: Additional Info Card */}
//                             <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-800">
//                                 <div className="flex items-center gap-3 mb-2">
//                                     <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
//                                         <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                                         </svg>
//                                     </div>
//                                     <h4 className="font-semibold text-sm dark:text-white">Total Impact</h4>
//                                 </div>
//                                 <p className="text-xs text-gray-600 dark:text-gray-400">
//                                     {allProjectsCount}+ projects delivered with cutting-edge technologies and creative solutions.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Content Area */}
//                     <div className="flex-1 min-w-0">
//                         {/* Tab Header (Optional - shows current active tab) */}
//                         <div className="mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
//                             <h2 className="text-xl font-semibold dark:text-white capitalize">
//                                 {activeTab === "all" ? "All Projects" :
//                                     activeTab === "personal" ? "Personal Projects" :
//                                         activeTab === "team" ? "Team Projects" :
//                                             activeTab === "client" ? "Client Projects" : "Working Projects"}
//                             </h2>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                                 Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
//                             </p>
//                         </div>

//                         {/* Projects Grid with Smooth Animation */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
//                             {filteredProjects.map((project, index) => (
//                                 <div
//                                     key={project.id}
//                                     data-observe
//                                     data-id={project.id}
//                                     className="relative"
//                                 >
//                                     <div
//                                         className={`
//                                             transition-all duration-700 ease-out
//                                             ${visibleItems[project.id]
//                                                 ? 'opacity-100 translate-y-0'
//                                                 : 'opacity-0 translate-y-8'
//                                             }
//                                         `}
//                                         style={{
//                                             transitionDelay: `${index * 50}ms`
//                                         }}
//                                     >
//                                         <div className="group relative">
//                                             <div className="relative bg-white dark:bg-gray-900 rounded-xl transition-transform duration-300 group-hover:-translate-y-1">
//                                                 <ProjectCard
//                                                     id={project.id}
//                                                     title={project.title}
//                                                     description={project.description}
//                                                     techStack={project.techStack}
//                                                     topTech={project.topTech}
//                                                     frontend={project.frontend}
//                                                     backend={project.backend}
//                                                     handling={project.handling}
//                                                     development={project.development}
//                                                     demoLink={project.demoLink}
//                                                     codeLink={project.codeLink}
//                                                     githubUrl={project.codeLink}
//                                                     image={project.image}
//                                                     type={project.type}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {filteredProjects.length === 0 && (
//                             <div className="text-center py-12">
//                                 <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
//                                     No projects found in this category.
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllProjects;


// ! All Time Favorite
// import { useEffect, useState, useRef } from "react";
// import ProjectCard from "../components/ProjectCard.jsx";
// import { Helmet } from "react-helmet-async";
// import projectsData from '../data/projects.js';

// const AllProjects = () => {
//     const [myProjects, setMyProjects] = useState([]);
//     const [teamProjects, setTeamProjects] = useState([]);
//     const [clientProjects, setClientProjects] = useState([]);
//     const [workingProjects, setWorkingProjects] = useState([]);
//     const [activeTab, setActiveTab] = useState("all");
//     const [visibleItems, setVisibleItems] = useState({});
//     const observerRef = useRef();

//     // Define tab configuration
//     const tabs = [
//         { id: "all", label: "All Projects", count: null },
//         { id: "personal", label: "Personal", count: myProjects.length },
//         { id: "team", label: "Team", count: teamProjects.length },
//         { id: "client", label: "Client", count: clientProjects.length },
//         { id: "working", label: "Working", count: workingProjects.length }
//     ];

//     // Helper function to get all projects with types
//     const getAllProjectsWithType = () => {
//         return [
//             ...myProjects.map(project => ({ ...project, type: "personal" })),
//             ...teamProjects.map(project => ({ ...project, type: "team" })),
//             ...clientProjects.map(project => ({ ...project, type: "client" })),
//             ...workingProjects.map(project => ({ ...project, type: "working" }))
//         ];
//     };

//     // Derived state
//     const allProjectsWithType = getAllProjectsWithType();
//     const allProjectsCount = allProjectsWithType.length;
//     const filteredProjects = activeTab === "all"
//         ? allProjectsWithType
//         : allProjectsWithType.filter(project => project.type === activeTab);

//     // Initial scroll to top
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // Load projects data
//     useEffect(() => {
//         setMyProjects(projectsData["my-project"] || []);
//         setTeamProjects(projectsData["team-project"] || []);
//         setClientProjects(projectsData["client-project"] || []);
//         setWorkingProjects(projectsData["working-project"] || []);
//     }, []);

//     // Set up intersection observer for animations
//     useEffect(() => {
//         setVisibleItems({});

//         if (observerRef.current) {
//             observerRef.current.disconnect();
//         }

//         observerRef.current = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         const id = entry.target.getAttribute('data-id');
//                         if (id) {
//                             setVisibleItems(prev => ({ ...prev, [id]: true }));
//                             observerRef.current.unobserve(entry.target);
//                         }
//                     }
//                 });
//             },
//             { threshold: 0.1, rootMargin: '50px' }
//         );

//         // Small delay to ensure DOM is ready
//         setTimeout(() => {
//             const items = document.querySelectorAll('[data-observe]');
//             items.forEach(item => observerRef.current.observe(item));
//         }, 100);

//         return () => {
//             if (observerRef.current) {
//                 observerRef.current.disconnect();
//             }
//         };
//     }, [activeTab, filteredProjects.length]);

//     return (
//         <div className="dark:bg-gradient-to-b dark:from-black dark:via-black dark:to-gray-950">
//             <div id="projects" className="container max-w-7xl mx-auto min-h-screen px-4 pt-7 md:pt-10 pb-16">
//                 <Helmet>
//                     <title>All Projects | Ashraful Islam Ratul</title>
//                 </Helmet>

//                 <div className="container mx-auto text-center mb-8">
//                     <div className="flex items-center justify-center mb-4">
//                         <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                         <span className="px-6 text-3xl md:text-4xl font-bold dark:text-white">
//                             All Projects
//                         </span>
//                         <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                     </div>
//                     <p className="md:text-lg mx-auto dark:text-gray-300">Take a look at a selection of projects I've created. Each one showcases my skills and creativity.</p>

//                     {/* Tab Navigation */}
//                     <div className="flex justify-center my-10 lg:my-12">
//                         <div className="inline-flex flex-wrap justify-center md:bg-gray-100 md:dark:bg-gray-800 rounded-xl p-1 gap-1">
//                             {tabs.map(tab => (
//                                 <button
//                                     key={tab.id}
//                                     onClick={() => setActiveTab(tab.id)}
//                                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
//                                         ${activeTab === tab.id
//                                             ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
//                                             : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                                         }`}
//                                 >
//                                     {tab.label}
//                                     <span className={`ml-1 text-xs ${activeTab === tab.id ? "" : "opacity-70"}`}>
//                                         ({tab.id === "all" ? allProjectsCount : tab.count})
//                                     </span>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Projects Grid with Smooth Animation */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//                     {filteredProjects.map((project, index) => (
//                         <div
//                             key={project.id}
//                             data-observe
//                             data-id={project.id}
//                             className="relative"
//                         >
//                             <div
//                                 className={`
//                                     transition-all duration-700 ease-out
//                                     ${visibleItems[project.id]
//                                         ? 'opacity-100 translate-y-0'
//                                         : 'opacity-0 translate-y-8'
//                                     }
//                                 `}
//                                 style={{
//                                     transitionDelay: `${index * 50}ms`
//                                 }}
//                             >
//                                 <div className="group relative">
//                                     <div className="relative bg-white dark:bg-gray-900 rounded-xl transition-transform duration-300 group-hover:-translate-y-1">
//                                         <ProjectCard
//                                             id={project.id}
//                                             title={project.title}
//                                             description={project.description}
//                                             techStack={project.techStack}
//                                             topTech={project.topTech}
//                                             frontend={project.frontend}
//                                             backend={project.backend}
//                                             handling={project.handling}
//                                             development={project.development}
//                                             demoLink={project.demoLink}
//                                             codeLink={project.codeLink}
//                                             githubUrl={project.codeLink}
//                                             image={project.image}
//                                             type={project.type}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {filteredProjects.length === 0 && (
//                     <div className="text-center py-12">
//                         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
//                             No projects found in this category.
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AllProjects;