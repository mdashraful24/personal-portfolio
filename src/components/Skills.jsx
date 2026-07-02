import { useEffect, useState, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase, FaJs, FaGithub, FaFigma, FaGitAlt, FaEnvelope, FaPhoneAlt, FaImage } from "react-icons/fa";
import { SiTailwindcss, SiDaisyui, SiExpress, SiC, SiCplusplus, SiNetlify, SiVercel, SiTypescript, SiCanva, SiFirebase, SiStripe, SiCloudinary, SiPostman, SiPix, SiDatabricks, SiPostgresql } from "react-icons/si";
import { SiJsonwebtokens } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiLogoPostgresql } from 'react-icons/bi';
import { VscVscode } from "react-icons/vsc";
import { Server, FileCode, Code2, Wrench, Palette, Plug } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import allSkills from '../data/skillsList.js';
import { tools, designTools } from '../data/toolsList.js';
import externalServices from '../data/serviceList.js';
import { TbRelationOneToMany } from 'react-icons/tb';

// Icon mapping for skills
const skillIconMap = {
    "React": <FaReact className="text-cyan-400 text-2xl" />,
    "HTML": <FaHtml5 className="text-orange-400 text-2xl" />,
    "CSS": <FaCss3Alt className="text-blue-400 text-2xl" />,
    "Tailwind CSS": <SiTailwindcss className="text-cyan-400 text-2xl" />,
    "DaisyUI": <SiDaisyui className="text-purple-400 text-2xl" />,
    "Node.js": <FaNodeJs className="text-green-400 text-2xl" />,
    "Express.js": <SiExpress className="text-gray-300 text-2xl" />,
    "MongoDB": <FaDatabase className="text-green-400 text-2xl" />,
    "PostgreSQL": <BiLogoPostgresql className="text-sky-400 text-2xl" />,
    "JavaScript": <FaJs className="text-yellow-400 text-2xl" />,
    "TypeScript": <SiTypescript className="text-blue-500 text-2xl" />,
    "C": <SiC className="text-blue-400 text-2xl" />,
    "C++": <SiCplusplus className="text-blue-400 text-2xl" />,
};

// Icon mapping for services
const serviceIconMap = {
    "Firebase": <SiFirebase className="text-yellow-400 text-2xl" />,
    "JWT": <SiJsonwebtokens className="text-blue-400 text-2xl" />,
    "bcrypt": <RiLockPasswordLine className="text-emerald-400 text-2xl" />,
    "Cloudinary": <SiCloudinary className="text-blue-500 text-2xl" />,
    "Nodemailer": <FaEnvelope className="text-blue-400 text-2xl" />,
    "Twilio": <FaPhoneAlt className="text-red-500 text-2xl" />,
    "Stripe": <SiStripe className="text-purple-400 text-2xl" />,
    "ImgBB": <FaImage className="text-pink-400 text-2xl" />,
};

// Icon mapping for tools
const toolIconMap = {
    "GitHub": <FaGithub className="text-gray-300 dark:text-gray-400 text-2xl" />,
    "VS Code": <VscVscode className="text-blue-400 text-2xl" />,
    "Netlify": <SiNetlify className="text-green-400 text-2xl" />,
    "Vercel": <SiVercel className="text-white dark:text-gray-300 text-2xl" />,
    "Git": <FaGitAlt className="text-orange-500 text-2xl" />,
    "Postman": <SiPostman className="text-orange-400 text-2xl" />,
    "Beekeeper S.": <SiDatabricks className="text-orange-400 text-2xl" />,
    "pgAdmin": <SiPostgresql className="text-sky-400 text-2xl" />,
    "drawSQL": <TbRelationOneToMany className="text-indigo-400 text-2xl" />,
};

// Icon mapping for design tools
const designToolIconMap = {
    "Figma": <FaFigma className="text-purple-400 text-2xl" />,
    "Pixso": <SiPix className="text-pink-500 text-2xl" />,
    "Canva": <SiCanva className="text-teal-400 text-2xl" />,
};

// Helper function to get icon dynamically
const getIcon = (skillName) => skillIconMap[skillName] || null;
const getToolIcon = (toolName) => toolIconMap[toolName] || null;
const getDesignToolIcon = (toolName) => designToolIconMap[toolName] || null;
const getServiceIcon = (serviceName) => serviceIconMap[serviceName] || serviceIconMap[serviceName?.toLowerCase()] || null;

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

    const servicesSkills = externalServices.map(service => ({
        name: service.name.toUpperCase(),
        icon: getServiceIcon(service.name)
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
                <div className="text-center mb-10" data-aos="fade-up">
                    <div className="flex items-center justify-center mb-4">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
                            Skills & Technologies
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <p className="md:text-[1.3rem] max-w-4xl mx-auto leading-relaxed dark:text-gray-300">
                        I work with frontend and backend development, databases, and deployment tools to build reliable, efficient, and easy-to-maintain digital projects.
                    </p>
                </div>

                {/* Skills Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                        className={`flex flex-col items-center text-gray-200 dark:text-gray-400 text-xs transition-all duration-500 ${visibleItems[`${cardIndex}-${itemIndex}`]
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
                                        <span className="dark:text-gray-300 font-bold mt-2">{item.name}</span>
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







// ! With tooltips
// import { useEffect, useState, useRef } from 'react';
// import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase, FaJs, FaGithub, FaFigma, FaGitAlt, FaEnvelope, FaPhoneAlt, FaImage } from "react-icons/fa";
// import { SiTailwindcss, SiDaisyui, SiExpress, SiC, SiCplusplus, SiNetlify, SiVercel, SiTypescript, SiCanva, SiFirebase, SiStripe, SiCloudinary, SiPostman, SiPix, SiDatabricks, SiPostgresql } from "react-icons/si";
// import { SiJsonwebtokens } from "react-icons/si";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { BiLogoPostgresql } from 'react-icons/bi';
// import { VscVscode } from "react-icons/vsc";
// import { Server, FileCode, Code2, Wrench, Palette, Plug, Loader2 } from 'lucide-react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import allSkills from '../data/skillsList.js';
// import { tools, designTools } from '../data/toolsList.js';
// import externalServices from '../data/serviceList.js';
// import skillDetails from '../data/skillTooltip.js';
// import { TbRelationOneToMany } from 'react-icons/tb';

// // Icon mapping for skills
// const skillIconMap = {
//     "React": <FaReact className="text-cyan-400 text-2xl" />,
//     "HTML": <FaHtml5 className="text-orange-400 text-2xl" />,
//     "CSS": <FaCss3Alt className="text-blue-400 text-2xl" />,
//     "Tailwind CSS": <SiTailwindcss className="text-cyan-400 text-2xl" />,
//     "DaisyUI": <SiDaisyui className="text-purple-400 text-2xl" />,
//     "Node.js": <FaNodeJs className="text-green-400 text-2xl" />,
//     "Express.js": <SiExpress className="text-gray-300 text-2xl" />,
//     "MongoDB": <FaDatabase className="text-green-400 text-2xl" />,
//     "PostgreSQL": <BiLogoPostgresql className="text-sky-400 text-2xl" />,
//     "JavaScript": <FaJs className="text-yellow-400 text-2xl" />,
//     "TypeScript": <SiTypescript className="text-blue-500 text-2xl" />,
//     "C": <SiC className="text-blue-400 text-2xl" />,
//     "C++": <SiCplusplus className="text-blue-400 text-2xl" />,
// };

// // Icon mapping for services
// const serviceIconMap = {
//     "Firebase": <SiFirebase className="text-yellow-400 text-2xl" />,
//     "JWT": <SiJsonwebtokens className="text-blue-400 text-2xl" />,
//     "bcrypt": <RiLockPasswordLine className="text-emerald-400 text-2xl" />,
//     "Cloudinary": <SiCloudinary className="text-blue-500 text-2xl" />,
//     "Nodemailer": <FaEnvelope className="text-blue-400 text-2xl" />,
//     "Twilio": <FaPhoneAlt className="text-red-500 text-2xl" />,
//     "Stripe": <SiStripe className="text-purple-400 text-2xl" />,
//     "ImgBB": <FaImage className="text-pink-400 text-2xl" />,
// };

// // Icon mapping for tools
// const toolIconMap = {
//     "GitHub": <FaGithub className="text-gray-300 dark:text-gray-400 text-2xl" />,
//     "VS Code": <VscVscode className="text-blue-400 text-2xl" />,
//     "Netlify": <SiNetlify className="text-green-400 text-2xl" />,
//     "Vercel": <SiVercel className="text-white dark:text-gray-300 text-2xl" />,
//     "Git": <FaGitAlt className="text-orange-500 text-2xl" />,
//     "Postman": <SiPostman className="text-orange-400 text-2xl" />,
//     "Beekeeper S.": <SiDatabricks className="text-orange-400 text-2xl" />,
//     "pgAdmin": <SiPostgresql className="text-sky-400 text-2xl" />,
//     "drawSQL": <TbRelationOneToMany className="text-indigo-400 text-2xl" />,
// };

// // Icon mapping for design tools
// const designToolIconMap = {
//     "Figma": <FaFigma className="text-purple-400 text-2xl" />,
//     "Pixso": <SiPix className="text-pink-500 text-2xl" />,
//     "Canva": <SiCanva className="text-teal-400 text-2xl" />,
// };

// // Helper function to get icon dynamically
// const getIcon = (skillName) => skillIconMap[skillName] || null;
// const getToolIcon = (toolName) => toolIconMap[toolName] || null;
// const getDesignToolIcon = (toolName) => designToolIconMap[toolName] || null;
// const getServiceIcon = (serviceName) => serviceIconMap[serviceName] || serviceIconMap[serviceName?.toLowerCase()] || null;

// // Helper function to get skill description
// const getSkillDescription = (skillName) => {
//     return skillDetails[skillName.toUpperCase()] || `${skillName} - Professional skill in my tech stack`;
// };

// const Skills = () => {
//     const [visibleCards, setVisibleCards] = useState([false, false, false, false, false, false]);
//     const [visibleItems, setVisibleItems] = useState({});
//     const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0, isLoading: false });
//     const sectionRef = useRef(null);
//     const hasAnimated = useRef(false);
//     const tooltipTimeout = useRef(null);
//     const loadingTimeout = useRef(null);

//     useEffect(() => {
//         AOS.init({
//             duration: 500,
//             once: true,
//             offset: 100
//         });

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 const [entry] = entries;
//                 if (entry.isIntersecting && !hasAnimated.current) {
//                     hasAnimated.current = true;
//                     visibleCards.forEach((_, cardIndex) => {
//                         setTimeout(() => {
//                             setVisibleCards(prev => {
//                                 const newState = [...prev];
//                                 newState[cardIndex] = true;
//                                 return newState;
//                             });
//                         }, cardIndex * 50);
//                     });
//                 }
//             },
//             {
//                 threshold: 0.2,
//                 rootMargin: "0px 0px -100px 0px"
//             }
//         );

//         if (sectionRef.current) {
//             observer.observe(sectionRef.current);
//         }

//         return () => {
//             if (sectionRef.current) {
//                 observer.unobserve(sectionRef.current);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         visibleCards.forEach((isVisible, cardIndex) => {
//             if (isVisible && !visibleItems[cardIndex]) {
//                 let itemCount = 0;
//                 if (cardIndex === 0) itemCount = frontendSkills.length;
//                 else if (cardIndex === 1) itemCount = backendSkills.length;
//                 else if (cardIndex === 2) itemCount = coreSkills.length;
//                 else if (cardIndex === 3) itemCount = servicesSkills.length;
//                 else if (cardIndex === 4) itemCount = toolsSkills.length;
//                 else if (cardIndex === 5) itemCount = designSkills.length;

//                 for (let i = 0; i < itemCount; i++) {
//                     setTimeout(() => {
//                         setVisibleItems(prev => ({
//                             ...prev,
//                             [`${cardIndex}-${i}`]: true
//                         }));
//                     }, i * 40);
//                 }

//                 setVisibleItems(prev => ({
//                     ...prev,
//                     [cardIndex]: true
//                 }));
//             }
//         });
//     }, [visibleCards]);

//     // Handle tooltip show/hide with loading
//     const handleMouseEnter = (e, description) => {
//         if (tooltipTimeout.current) {
//             clearTimeout(tooltipTimeout.current);
//         }
//         if (loadingTimeout.current) {
//             clearTimeout(loadingTimeout.current);
//         }

//         const rect = e.currentTarget.getBoundingClientRect();

//         // Show loading state immediately
//         setTooltip({
//             visible: true,
//             text: '',
//             x: rect.left + rect.width / 2,
//             y: rect.top - 10,
//             isLoading: true
//         });

//         // Simulate loading delay (you can adjust this time or replace with actual async call)
//         loadingTimeout.current = setTimeout(() => {
//             setTooltip({
//                 visible: true,
//                 text: description,
//                 x: rect.left + rect.width / 2,
//                 y: rect.top - 10,
//                 isLoading: false
//             });
//         }, 300); // 300ms loading delay for demo
//     };

//     const handleMouseLeave = () => {
//         if (tooltipTimeout.current) {
//             clearTimeout(tooltipTimeout.current);
//         }
//         if (loadingTimeout.current) {
//             clearTimeout(loadingTimeout.current);
//         }
//         tooltipTimeout.current = setTimeout(() => {
//             setTooltip({ visible: false, text: '', x: 0, y: 0, isLoading: false });
//         }, 100);
//     };

//     const handleMouseMove = (e) => {
//         if (tooltip.visible) {
//             setTooltip(prev => ({
//                 ...prev,
//                 x: e.clientX,
//                 y: e.clientY - 10
//             }));
//         }
//     };

//     // Fetch and organize skills by category from allSkills
//     const frontendSkills = allSkills
//         .filter(skill => skill.category === "frontend")
//         .map(skill => ({
//             name: skill.name.toUpperCase(),
//             icon: getIcon(skill.name),
//             description: getSkillDescription(skill.name)
//         }));

//     const backendSkills = allSkills
//         .filter(skill => skill.category === "backend" || skill.category === "database")
//         .map(skill => ({
//             name: skill.name.toUpperCase(),
//             icon: getIcon(skill.name),
//             description: getSkillDescription(skill.name)
//         }));

//     const coreSkills = allSkills
//         .filter(skill => skill.category === "language")
//         .map(skill => ({
//             name: skill.name.toUpperCase(),
//             icon: getIcon(skill.name),
//             description: getSkillDescription(skill.name)
//         }));

//     const servicesSkills = externalServices.map(service => ({
//         name: service.name.toUpperCase(),
//         icon: getServiceIcon(service.name),
//         description: getSkillDescription(service.name)
//     }));

//     const toolsSkills = tools.map(tool => ({
//         name: tool.name.toUpperCase(),
//         icon: getToolIcon(tool.name),
//         description: getSkillDescription(tool.name)
//     }));

//     const designSkills = designTools.map(tool => ({
//         name: tool.name.toUpperCase(),
//         icon: getDesignToolIcon(tool.name),
//         description: getSkillDescription(tool.name)
//     }));

//     const allSkillCards = [
//         { title: "Frontend", icon: <Code2 className="text-[#83838c] dark:text-gray-400 text-xl" />, items: frontendSkills },
//         { title: "Backend & DB", icon: <Server className="text-[#83838c] dark:text-gray-400 text-xl" />, items: backendSkills },
//         { title: "Languages", icon: <FileCode className="text-[#83838c] dark:text-gray-400 text-xl" />, items: coreSkills },
//         { title: "Services", icon: <Plug className="text-[#83838c] dark:text-gray-400 text-xl" />, items: servicesSkills },
//         { title: "Tools & Platforms", icon: <Wrench className="text-[#83838c] dark:text-gray-400 text-xl" />, items: toolsSkills },
//         { title: "UI/UX & Design", icon: <Palette className="text-[#83838c] dark:text-gray-400 text-xl" />, items: designSkills },
//     ];

//     return (
//         <div ref={sectionRef} className="dark:bg-black py-7 lg:py-20">
//             <div className="container max-w-7xl mx-auto px-4">
//                 {/* Header Section */}
//                 <div className="text-center mb-8" data-aos="fade-up">
//                     <div className="flex items-center justify-center mb-4">
//                         <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                         <span className="px-6 text-3xl md:text-4xl font-bold dark:text-white">
//                             Skills & Technologies
//                         </span>
//                         <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
//                     </div>
//                     <p className="md:text-[1.2rem] max-w-3xl mx-auto leading-relaxed dark:text-gray-300">
//                         I work with frontend and backend development, databases, and deployment tools to build reliable, efficient, and easy-to-maintain digital projects.
//                     </p>
//                 </div>

//                 {/* Skills Cards Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {allSkillCards.map((card, cardIndex) => (
//                         <div
//                             key={cardIndex}
//                             className={`group bg-[#3b3b45] dark:bg-black rounded-2xl p-6 shadow-lg border border-gray-600/20 hover:scale-105 dark:hover:scale-100 dark:border-gray-700 transition-all duration-300 dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${visibleCards[cardIndex]
//                                 ? 'opacity-100 translate-y-0'
//                                 : 'opacity-0 translate-y-12'
//                                 }`}
//                             style={{
//                                 transitionDelay: `${cardIndex * 50}ms`,
//                                 transitionProperty: 'opacity, transform, box-shadow'
//                             }}
//                         >
//                             {/* Title */}
//                             <div className="flex items-center gap-3 mb-6">
//                                 <div className="bg-[#2f2f38] dark:bg-gray-700 p-2.5 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
//                                     {card.icon}
//                                 </div>
//                                 <h2 className="text-xl font-semibold text-[#e8e8ea] dark:text-white">{card.title}</h2>
//                             </div>

//                             {/* Icons Row with individual item delays and tooltips */}
//                             <div className="flex flex-wrap gap-6">
//                                 {card.items.map((item, itemIndex) => (
//                                     <div
//                                         key={itemIndex}
//                                         className={`flex flex-col items-center text-gray-200 dark:text-gray-400 text-xs transition-all duration-500 cursor-help relative ${visibleItems[`${cardIndex}-${itemIndex}`]
//                                             ? 'opacity-100 translate-y-0 scale-100'
//                                             : 'opacity-0 translate-y-4 scale-95'
//                                             }`}
//                                         style={{
//                                             transitionDelay: `${itemIndex * 40}ms`
//                                         }}
//                                         onMouseEnter={(e) => handleMouseEnter(e, item.description)}
//                                         onMouseLeave={handleMouseLeave}
//                                         onMouseMove={handleMouseMove}
//                                     >
//                                         <div className="bg-[#2f2f38] dark:bg-gray-700 p-3 rounded-lg shadow">
//                                             {item.icon}
//                                         </div>
//                                         <span className="dark:text-gray-300 font-bold mt-2">{item.name}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Custom Tooltip with Loading State */}
//             {tooltip.visible && (
//                 <div
//                     className="hidden lg:block fixed z-50 pointer-events-none transition-opacity duration-200"
//                     style={{
//                         left: `${tooltip.x}px`,
//                         top: `${tooltip.y}px`,
//                         transform: 'translate(-50%, -100%)',
//                         maxWidth: '300px',
//                         opacity: tooltip.visible ? 1 : 0
//                     }}
//                 >
//                     <div className="bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-2xl p-3 border border-gray-700/50 backdrop-blur-sm min-w-[120px] min-h-[50px] flex items-center justify-center">
//                         {tooltip.isLoading ? (
//                             <div className="flex items-center gap-2">
//                                 <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
//                                 <span className="text-gray-300">Loading...</span>
//                             </div>
//                         ) : (
//                             <p className="leading-relaxed">{tooltip.text}</p>
//                         )}
//                         {/* Tooltip Arrow */}
//                         <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 dark:bg-gray-800 rotate-45 border-r border-b border-gray-700/50"></div>
//                     </div>
//                 </div>
//             )}
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
