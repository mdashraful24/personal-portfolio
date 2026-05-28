import { useEffect, useState, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase, FaJs, FaGithub, FaFigma } from "react-icons/fa";
import { SiTailwindcss, SiDaisyui, SiExpress, SiC, SiCplusplus, SiNetlify, SiVercel, SiTypescript, SiCanva, SiFirebase, SiStripe } from "react-icons/si";
import { SiJsonwebtokens } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiLogoPostgresql } from 'react-icons/bi';
import { VscVscode } from "react-icons/vsc";
import { Server, FileCode, Code2, Wrench, Palette, Plug } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import allSkills from '../data/skillsList.js';
import { tools, designTools } from '../data/toolsList.js';

// Icon mapping for skills
const skillIconMap = {
    "React": <FaReact className="text-cyan-400 text-xl" />,
    "HTML": <FaHtml5 className="text-orange-400 text-xl" />,
    "CSS": <FaCss3Alt className="text-blue-400 text-xl" />,
    "Tailwind CSS": <SiTailwindcss className="text-cyan-400 text-xl" />,
    "DaisyUI": <SiDaisyui className="text-purple-400 text-xl" />,
    "Node.js": <FaNodeJs className="text-green-400 text-xl" />,
    "Express": <SiExpress className="text-gray-300 text-xl" />,
    "MongoDB": <FaDatabase className="text-green-400 text-xl" />,
    "PostgreSQL": <BiLogoPostgresql className="text-sky-400 text-xl" />,
    "JavaScript": <FaJs className="text-yellow-400 text-xl" />,
    "TypeScript": <SiTypescript className="text-blue-500 text-xl" />,
    "C": <SiC className="text-blue-400 text-xl" />,
    "C++": <SiCplusplus className="text-blue-400 text-xl" />,
    "Firebase": <SiFirebase className="text-yellow-400 text-xl" />,
    "JWT": <SiJsonwebtokens className="text-blue-400 text-xl" />,
    "Bcrypt": <RiLockPasswordLine className="text-emerald-400 text-xl" />,
    "Stripe": <SiStripe className="text-purple-400 text-xl" />,
};

// Icon mapping for tools
const toolIconMap = {
    "GitHub": <FaGithub className="text-gray-300 dark:text-gray-400 text-xl" />,
    "VS Code": <VscVscode className="text-blue-400 text-xl" />,
    "Netlify": <SiNetlify className="text-green-400 text-xl" />,
    "Vercel": <SiVercel className="text-white dark:text-gray-300 text-xl" />,
};

// Icon mapping for design tools
const designToolIconMap = {
    "Figma": <FaFigma className="text-purple-400 text-xl" />,
    "Canva": <SiCanva className="text-teal-400 text-xl" />,
};

// Helper function to get icon dynamically
const getIcon = (skillName) => skillIconMap[skillName] || null;
const getToolIcon = (toolName) => toolIconMap[toolName] || null;
const getDesignToolIcon = (toolName) => designToolIconMap[toolName] || null;

const Skills = () => {
    const [visibleCards, setVisibleCards] = useState([false, false, false, false, false, false]);
    const [visibleItems, setVisibleItems] = useState({});
    const sectionRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        AOS.init({
            duration: 500,
            once: true,
            offset: 100
        });

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    visibleCards.forEach((_, cardIndex) => {
                        setTimeout(() => {
                            setVisibleCards(prev => {
                                const newState = [...prev];
                                newState[cardIndex] = true;
                                return newState;
                            });
                        }, cardIndex * 50);
                    });
                }
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -100px 0px"
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        visibleCards.forEach((isVisible, cardIndex) => {
            if (isVisible && !visibleItems[cardIndex]) {
                let itemCount = 0;
                if (cardIndex === 0) itemCount = frontendSkills.length;
                else if (cardIndex === 1) itemCount = backendSkills.length;
                else if (cardIndex === 2) itemCount = coreSkills.length;
                else if (cardIndex === 3) itemCount = servicesSkills.length;
                else if (cardIndex === 4) itemCount = toolsSkills.length;
                else if (cardIndex === 5) itemCount = designSkills.length;

                for (let i = 0; i < itemCount; i++) {
                    setTimeout(() => {
                        setVisibleItems(prev => ({
                            ...prev,
                            [`${cardIndex}-${i}`]: true
                        }));
                    }, i * 40);
                }

                setVisibleItems(prev => ({
                    ...prev,
                    [cardIndex]: true
                }));
            }
        });
    }, [visibleCards]);

    // Fetch and organize skills by category from allSkills
    const frontendSkills = allSkills
        .filter(skill => skill.category === "frontend")
        .map(skill => ({
            name: skill.name.toUpperCase(),
            icon: getIcon(skill.name)
        }));

    const backendSkills = allSkills
        .filter(skill => skill.category === "backend" || skill.category === "database")
        .map(skill => ({
            name: skill.name.toUpperCase(),
            icon: getIcon(skill.name)
        }));

    const coreSkills = allSkills
        .filter(skill => skill.category === "language")
        .map(skill => ({
            name: skill.name.toUpperCase(),
            icon: getIcon(skill.name)
        }));

    const servicesSkills = allSkills
        .filter(skill => skill.category === "service")
        .map(skill => ({
            name: skill.name.toUpperCase(),
            icon: getIcon(skill.name)
        }));

    const toolsSkills = tools.map(tool => ({
        name: tool.name.toUpperCase(),
        icon: getToolIcon(tool.name)
    }));

    const designSkills = designTools.map(tool => ({
        name: tool.name.toUpperCase(),
        icon: getDesignToolIcon(tool.name)
    }));

    const allSkillCards = [
        { title: "Frontend", icon: <Code2 className="text-[#83838c] dark:text-gray-400 text-xl" />, items: frontendSkills },
        { title: "Backend & DB", icon: <Server className="text-[#83838c] dark:text-gray-400 text-xl" />, items: backendSkills },
        { title: "Languages", icon: <FileCode className="text-[#83838c] dark:text-gray-400 text-xl" />, items: coreSkills },
        { title: "Services", icon: <Plug className="text-[#83838c] dark:text-gray-400 text-xl" />, items: servicesSkills },
        { title: "Tools & Platforms", icon: <Wrench className="text-[#83838c] dark:text-gray-400 text-xl" />, items: toolsSkills },
        { title: "UI/UX & Design", icon: <Palette className="text-[#83838c] dark:text-gray-400 text-xl" />, items: designSkills },
    ];

    return (
        <div ref={sectionRef} className="dark:bg-black py-7 lg:py-20">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-8" data-aos="fade-up">
                    <div className="flex items-center justify-center mb-4">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl font-bold dark:text-white">
                            Skills & Technologies
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <p className="md:text-lg max-w-3xl mx-auto leading-relaxed dark:text-gray-300">
                        I work with frontend and backend development, databases, and deployment tools to build reliable, efficient, and easy-to-maintain digital projects.
                    </p>
                </div>

                {/* Skills Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {allSkillCards.map((card, cardIndex) => (
                        <div
                            key={cardIndex}
                            className={`group bg-[#3b3b45] dark:bg-black rounded-2xl p-6 shadow-lg border border-gray-600/20 hover:scale-105 dark:hover:scale-100 dark:border-gray-700 transition-all duration-300 dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${visibleCards[cardIndex]
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-12'
                                }`}
                            style={{
                                transitionDelay: `${cardIndex * 50}ms`,
                                transitionProperty: 'opacity, transform, box-shadow'
                            }}
                        >
                            {/* Title */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-[#2f2f38] dark:bg-gray-700 p-2.5 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    {card.icon}
                                </div>
                                <h2 className="text-xl font-semibold text-[#e8e8ea] dark:text-white">{card.title}</h2>
                            </div>

                            {/* Icons Row with individual item delays */}
                            <div className="flex flex-wrap gap-6">
                                {card.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className={`flex flex-col items-center text-gray-300 dark:text-gray-400 text-xs transition-all duration-500 ${visibleItems[`${cardIndex}-${itemIndex}`]
                                            ? 'opacity-100 translate-y-0 scale-100'
                                            : 'opacity-0 translate-y-4 scale-95'
                                            }`}
                                        style={{
                                            transitionDelay: `${itemIndex * 40}ms`
                                        }}
                                    >
                                        <div className="bg-[#2f2f38] dark:bg-gray-700 p-3 rounded-lg shadow">
                                            {item.icon}
                                        </div>
                                        <span className="dark:text-gray-300 dark:font-bold mt-2">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;









// import { useEffect, useState } from 'react';
// import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase, FaJs, FaGithub } from "react-icons/fa";
// import { SiTailwindcss, SiDaisyui, SiExpress, SiC, SiCplusplus, SiNetlify, SiVercel } from "react-icons/si";
// import { BiLogoPostgresql } from 'react-icons/bi';
// import { VscVscode } from "react-icons/vsc";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// // Define icon colors based on technology
// const getIconColor = (name) => {
//     switch (name) {
//         case "HTML": return "text-orange-500";
//         case "CSS": return "text-blue-500";
//         case "Tailwind CSS": return "text-cyan-500";
//         case "DaisyUI": return "text-purple-500";
//         case "React": return "text-cyan-400";
//         case "Node.js": return "text-green-500";
//         case "Express": return "text-gray-600";
//         case "MongoDB": return "text-green-600";
//         case "PostgreSQL": return "text-sky-500";
//         case "JavaScript": return "text-yellow-500";
//         case "C": return "text-blue-600";
//         case "C++": return "text-indigo-500";
//         default: return "text-gray-600";
//     }
// };

// const getToolIconColor = (name) => {
//     switch (name) {
//         case "GitHub": return "text-gray-900";
//         case "VS Code": return "text-blue-600";
//         case "Netlify": return "text-green-500";
//         case "Vercel": return "text-black";
//         default: return "text-gray-600";
//     }
// };

// const skills = [
//     {
//         id: 1,
//         name: "HTML",
//         category: "frontend",
//         color: "from-orange-500 to-orange-700",
//         bgColor: "bg-orange-500/10",
//         description: "Semantic markup for web structure"
//     },
//     {
//         id: 2,
//         name: "CSS",
//         category: "frontend",
//         color: "from-blue-500 to-blue-700",
//         bgColor: "bg-blue-500/10",
//         description: "Styling and layout for web pages"
//     },
//     {
//         id: 3,
//         name: "Tailwind CSS",
//         category: "frontend",
//         color: "from-cyan-500 to-cyan-700",
//         bgColor: "bg-cyan-500/10",
//         description: "Utility-first CSS framework"
//     },
//     {
//         id: 4,
//         name: "DaisyUI",
//         category: "frontend",
//         color: "from-purple-500 to-pink-700",
//         bgColor: "bg-purple-500/10",
//         description: "Component library for Tailwind"
//     },
//     {
//         id: 6,
//         name: "React",
//         category: "frontend",
//         color: "from-blue-400 to-cyan-600",
//         bgColor: "bg-blue-500/10",
//         description: "Component-based UI library"
//     },
//     {
//         id: 7,
//         name: "Node.js",
//         category: "backend",
//         color: "from-green-500 to-green-700",
//         bgColor: "bg-green-500/10",
//         description: "JavaScript runtime environment"
//     },
//     {
//         id: 8,
//         name: "Express",
//         category: "backend",
//         color: "from-gray-600 to-gray-800",
//         bgColor: "bg-gray-500/10",
//         description: "Web application framework"
//     },
//     {
//         id: 9,
//         name: "MongoDB",
//         category: "database",
//         color: "from-green-600 to-green-800",
//         bgColor: "bg-green-600/10",
//         description: "NoSQL database"
//     },
//     {
//         id: 10,
//         name: "PostgreSQL",
//         category: "database",
//         color: "from-sky-500 to-sky-700",
//         bgColor: "bg-sky-500/10",
//         description: "Relational database system"
//     },
//     {
//         id: 5,
//         name: "JavaScript",
//         category: "language",
//         color: "from-yellow-500 to-yellow-700",
//         bgColor: "bg-yellow-500/10",
//         description: "Dynamic web programming"
//     },
//     {
//         id: 11,
//         name: "C",
//         category: "language",
//         color: "from-blue-600 to-blue-800",
//         bgColor: "bg-blue-600/10",
//         description: "System programming language"
//     },
//     {
//         id: 12,
//         name: "C++",
//         category: "language",
//         color: "from-indigo-500 to-purple-700",
//         bgColor: "bg-indigo-500/10",
//         description: "Object-oriented programming"
//     }
// ];

// const tools = [
//     { id: 1, name: "GitHub", description: "Version Control" },
//     { id: 2, name: "VS Code", description: "Code Editor" },
//     { id: 3, name: "Netlify", description: "Static Deployment" },
//     { id: 4, name: "Vercel", description: "Full-stack Deployment" },
// ];

// const Skills = () => {
//     const [activeCategory, setActiveCategory] = useState("all");
//     const [filteredSkills, setFilteredSkills] = useState(skills);

//     useEffect(() => {
//         AOS.init({
//             duration: 500,
//             once: true,
//             offset: 100
//         });
//     }, []);

//     useEffect(() => {
//         if (activeCategory === "all") {
//             setFilteredSkills(skills);
//         } else {
//             setFilteredSkills(skills.filter(skill => skill.category === activeCategory));
//         }
//     }, [activeCategory]);

//     // // Category filter buttons
//     // const categories = [
//     //     { id: "all", label: "All", color: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
//     //     { id: "frontend", label: "Frontend", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
//     //     { id: "backend", label: "Backend", color: "bg-green-100 text-green-800 hover:bg-green-200" },
//     //     { id: "database", label: "Database", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
//     //     { id: "language", label: "Languages", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
//     // ];

//     return (
//         <div className="bg-gradient-to-br from-slate-50 to-gray-100 py-10 lg:py-20">
//             <div className="container max-w-7xl mx-auto px-4">
//                 <div className="text-center mb-10" data-aos="fade-up">
//                     <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
//                     <p className="md:text-lg max-w-3xl mx-auto leading-relaxed">
//                         I work with frontend and backend development, databases, and deployment tools to build reliable, efficient, and easy-to-maintain digital projects.
//                     </p>
//                 </div>

//                 {/* Category Filter */}
//                 {/* <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="100">
//                     {categories.map((cat) => (
//                         <button
//                             key={cat.id}
//                             onClick={() => setActiveCategory(cat.id)}
//                             className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${activeCategory === cat.id
//                                     ? cat.id === "all" ? "bg-gray-800 text-white shadow-lg"
//                                         : cat.id === "frontend" ? "bg-blue-600 text-white shadow-lg"
//                                             : cat.id === "backend" ? "bg-green-600 text-white shadow-lg"
//                                                 : cat.id === "database" ? "bg-purple-600 text-white shadow-lg"
//                                                     : "bg-yellow-600 text-white shadow-lg"
//                                     : cat.color
//                                 }`}
//                         >
//                             {cat.label}
//                         </button>
//                     ))}
//                 </div> */}

//                 {/* Skills Grid - Fixed Height Cards */}
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
//                     {filteredSkills.map((skill, index) => (
//                         <div
//                             key={skill.id}
//                             data-aos="zoom-in"
//                             data-aos-delay={index * 50}
//                             className="group"
//                         >
//                             <div className="relative h-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col">

//                                 {/* Skill Content */}
//                                 <div className="p-5 flex-grow flex flex-col">
//                                     {/* Icon Container */}
//                                     <div className="relative mb-3 flex-shrink-0">
//                                         <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-50"></div>
//                                         <div className="relative flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-gray-50 to-white drop-shadow rounded-2xl shadow-sm border border-gray-100">
//                                             <div className={`${getIconColor(skill.name)} transform group-hover:scale-110 transition-transform duration-300`}>
//                                                 {/* Render icons directly with size */}
//                                                 {skill.name === "HTML" && <FaHtml5 size={32} />}
//                                                 {skill.name === "CSS" && <FaCss3Alt size={32} />}
//                                                 {skill.name === "Tailwind CSS" && <SiTailwindcss size={32} />}
//                                                 {skill.name === "DaisyUI" && <SiDaisyui size={32} />}
//                                                 {skill.name === "React" && <FaReact size={32} />}
//                                                 {skill.name === "Node.js" && <FaNodeJs size={32} />}
//                                                 {skill.name === "Express" && <SiExpress size={32} />}
//                                                 {skill.name === "MongoDB" && <FaDatabase size={32} />}
//                                                 {skill.name === "PostgreSQL" && <BiLogoPostgresql size={32} />}
//                                                 {skill.name === "JavaScript" && <FaJs size={32} />}
//                                                 {skill.name === "C" && <SiC size={32} />}
//                                                 {skill.name === "C++" && <SiCplusplus size={32} />}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Skill Info */}
//                                     <div className="flex-grow flex flex-col">
//                                         <h3 className="text-xl font-bold text-center transition-colors duration-300">
//                                             {skill.name}
//                                         </h3>
//                                         <p className="text-sm text-center my-2 flex-grow">
//                                             {skill.description}
//                                         </p>

//                                         {/* Category Tag */}
//                                         <div className="flex justify-center mt-auto">
//                                             <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize border 
//                                             ${skill.category === "frontend" ? "bg-blue-100 text-blue-600 border-blue-200" :
//                                                     skill.category === "backend" ? "bg-green-100 text-green-600 border-green-200" :
//                                                         skill.category === "database" ? "bg-purple-100 text-purple-600 border-purple-200" :
//                                                             "bg-yellow-100 text-yellow-600 border-yellow-200"
//                                                 }`}>
//                                                 {skill.category}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Tools Section */}
//                 <div data-aos="fade-up" data-aos-delay="200">
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {tools.map((tool, index) => (
//                             <div
//                                 key={tool.id}
//                                 data-aos="zoom-in"
//                                 data-aos-delay={index * 100}
//                                 className="group"
//                             >
//                                 <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 text-center transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col">

//                                     <div className="relative mb-3 flex-shrink-0">
//                                         <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-50"></div>
//                                         <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-gray-50 to-white drop-shadow rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
//                                             <div className={`${getToolIconColor(tool.name)} group-hover:scale-110 transition-all duration-500`}>
//                                                 {tool.name === "GitHub" && <FaGithub size={32} />}
//                                                 {tool.name === "VS Code" && <VscVscode size={32} />}
//                                                 {tool.name === "Netlify" && <SiNetlify size={32} />}
//                                                 {tool.name === "Vercel" && <SiVercel size={32} />}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="flex-grow flex flex-col">
//                                         <h3 className="text-lg font-bold mb-3">{tool.name}</h3>
//                                         <p className="text-sm">{tool.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Skills;


// import { useEffect } from 'react';
// import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase, FaJs, FaGithub } from "react-icons/fa";
// import { SiTailwindcss, SiDaisyui, SiExpress, SiC, SiCplusplus, SiNetlify, SiVercel } from "react-icons/si";
// import { BiLogoPostgresql } from 'react-icons/bi';
// import { VscVscode } from "react-icons/vsc";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const skills = [
//     { name: "HTML", level: 85, icon: <FaHtml5 />, color: "hover:border-orange-500 hover:text-orange-600" },
//     { name: "CSS", level: 80, icon: <FaCss3Alt />, color: "hover:border-blue-500 hover:text-blue-600" },
//     { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss />, color: "hover:border-cyan-500 hover:text-cyan-600" },
//     { name: "DaisyUI", level: 90, icon: <SiDaisyui />, color: "hover:border-purple-500 hover:text-purple-600" },
//     { name: "JavaScript", level: 70, icon: <FaJs />, color: "hover:border-yellow-500 hover:text-yellow-600" },
//     { name: "React", level: 75, icon: <FaReact />, color: "hover:border-blue-400 hover:text-blue-600" },
//     { name: "Node.js", level: 75, icon: <FaNodeJs />, color: "hover:border-green-500 hover:text-green-600" },
//     { name: "Express.js", level: 70, icon: <SiExpress />, color: "hover:border-gray-600 hover:text-gray-600" },
//     { name: "MongoDB Atlas", level: 60, icon: <FaDatabase />, color: "hover:border-green-600 hover:text-green-600" },
//     { name: "PostgreSQL", level: 40, icon: <BiLogoPostgresql />, color: "hover:border-sky-600 hover:text-sky-600" },
//     { name: "C", level: 80, icon: <SiC />, color: "hover:border-blue-600 hover:text-blue-600" },
//     { name: "C++", level: 85, icon: <SiCplusplus />, color: "hover:border-indigo-500 hover:text-indigo-600" }
// ];

// const tools = [
//     { name: "GitHub", icon: <FaGithub />, color: "hover:border-gray-900 hover:text-gray-900" },
//     { name: "VS Code", icon: <VscVscode />, color: "hover:border-blue-600 hover:text-blue-600" },
//     { name: "Netlify", icon: <SiNetlify />, color: "hover:border-green-500 hover:text-green-500" },
//     { name: "Vercel", icon: <SiVercel />, color: "hover:border-black hover:text-black" },
// ];

// const Skills = () => {
//     useEffect(() => {
//         AOS.init({ duration: 500, once: true });
//     }, []);

//     const getProficiencyText = (level) => {
//         if (level >= 80) return "Expert";
//         if (level >= 60) return "Advanced";
//         if (level >= 40) return "Intermediate";
//         return "Beginner";
//     };

//     const getProficiencyColor = (level) => {
//         if (level >= 80) return "text-green-600 bg-green-100 border-green-400 group-hover:text-green-700";
//         if (level >= 60) return "text-blue-600 bg-blue-100 border-blue-400 group-hover:text-blue-700";
//         if (level >= 40) return "text-yellow-600 bg-yellow-100 border-yellow-400 group-hover:text-yellow-700";
//         return "text-gray-600 bg-gray-100 border-gray-400 group-hover:text-gray-700";
//     };

//     return (
//         <div className='bg-gray-50 py-10 md:py-20 lg:py-32 xl:py-40'>
//             <div className="container max-w-7xl mx-auto px-4 text-center">
//                 <div className="text-center mb-10" data-aos="fade-up">
//                     <h2 className="text-3xl md:text-4xl font-bold md:mb-5">Skills & Technologies</h2>
//                     <p className="hidden md:block text-lg max-w-3xl mx-auto leading-relaxed">
//                         I work with frontend and backend development, databases, and deployment tools to build reliable, efficient, and easy-to-maintain digital projects.
//                     </p>
//                 </div>

//                 {/* Skills Grid */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                     {skills.map((skill, index) => (
//                         <div
//                             key={index}
//                             data-aos="fade-up"
//                             data-aos-delay={index * 50}
//                             className={`group relative bg-white rounded-2xl border-2 border-gray-200 p-6 text-center transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl ${skill.color}`}
//                         >
//                             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                             {/* Icon */}
//                             <div className="relative z-10 mb-4">
//                                 <div className="text-4xl text-gray-400 group-hover:text-current group-hover:scale-110 transition-transform duration-500">
//                                     {skill.icon}
//                                 </div>
//                             </div>

//                             {/* Skill name */}
//                             <h3 className="relative z-10 text-lg font-medium group-hover:text-current mb-2 group-hover:font-semibold transition-all duration-300">
//                                 {skill.name}
//                             </h3>

//                             {/* Proficiency level */}
//                             <div className={`relative z-10 inline-flex items-center px-3 py-1 border rounded-full text-xs font-bold ${getProficiencyColor(skill.level)}`}>
//                                 {getProficiencyText(skill.level)}
//                             </div>

//                             {/* Percentage indicator */}
//                             <div className="relative z-10 mt-3">
//                                 <div className="flex justify-between text-xs text-gray-400 mb-1">
//                                     <span>0%</span>
//                                     <span className="font-semibold text-gray-600">{skill.level}%</span>
//                                     <span>100%</span>
//                                 </div>
//                                 <div className="w-full bg-gray-200 rounded-full h-1.5">
//                                     <div
//                                         className="bg-current h-1.5 rounded-full transition-all duration-1000 ease-out"
//                                         style={{ width: `${skill.level}%` }}
//                                     ></div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Tools & Deployment */}
//                 <div className="mt-4 md:mt-8 text-center" data-aos="fade-up">
//                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
//                         {tools.map((tool, index) => (
//                             <div
//                                 key={index}
//                                 className={`group relative bg-white rounded-2xl border-2 border-gray-200 p-6 text-center transition-all duration-500 ease-out transform hover:shadow-2xl ${tool.color}`}
//                             >
//                                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                                 <div className="relative z-10 mb-4">
//                                     <div className="text-4xl text-gray-400 group-hover:text-current group-hover:scale-110 transition-transform duration-500">
//                                         {tool.icon}
//                                     </div>
//                                 </div>
//                                 <h3 className="relative z-10 text-lg font-medium text-gray-700 group-hover:text-current group-hover:font-semibold transition-all duration-300">
//                                     {tool.name}
//                                 </h3>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Skills Summary */}
//                 {/* <div className="mt-20 text-center" data-aos="fade-up">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//                         <div className="text-center p-6 rounded-xl bg-gray-50 border shadow hover:bg-white hover:shadow-lg transition-all duration-300">
//                             <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
//                             <div className="font-medium">Programming Languages</div>
//                         </div>
//                         <div className="text-center p-6 rounded-xl bg-gray-50 border shadow hover:bg-white hover:shadow-lg transition-all duration-300">
//                             <div className="text-3xl font-bold text-green-600 mb-2">80%</div>
//                             <div className="font-medium">Frontend Development</div>
//                         </div>
//                         <div className="text-center p-6 rounded-xl bg-gray-50 border shadow hover:bg-white hover:shadow-lg transition-all duration-300">
//                             <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
//                             <div className="font-medium">Backend Development</div>
//                         </div>
//                         <div className="text-center p-6 rounded-xl bg-gray-50 border shadow hover:bg-white hover:shadow-lg transition-all duration-300">
//                             <div className="text-3xl font-bold text-orange-600 mb-2">30%</div>
//                             <div className="font-medium">Database Management</div>
//                         </div>
//                     </div>
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export default Skills;
