// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
// import { RiTailwindCssFill } from "react-icons/ri";
// import { SiExpress } from "react-icons/si";
// import { SiMongodb } from "react-icons/si";
// import { SiC } from "react-icons/si";
// import { SiCplusplus } from "react-icons/si";
// import { SiPostman } from "react-icons/si";
// import { VscVscode } from "react-icons/vsc";

// const skills = [
//     { category: "Frontend", name: "HTML", icon: <FaHtml5 className="text-orange-600" />, level: "90%" },
//     { category: "Frontend", name: "CSS", icon: <FaCss3Alt className="text-blue-600" />, level: "85%" },
//     { category: "Frontend", name: "JavaScript", icon: <FaJsSquare className="text-yellow-500" />, level: "80%" },
//     { category: "Frontend", name: "React", icon: <FaReact className="text-blue-400" />, level: "85%" },
//     { category: "Frontend", name: "Tailwind CSS", icon: <RiTailwindCssFill className="text-cyan-500" />, level: "80%" },
//     { category: "Backend", name: "Node.js", icon: <FaNodeJs className="text-green-600" />, level: "80%" },
//     { category: "Backend", name: "Express.js", icon: <SiExpress className="text-gray-700" />, level: "75%" },
//     { category: "Backend", name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: "85%" },
//     { category: "Languages", name: "C", icon: <SiC className="text-blue-500" />, level: "70%" },
//     { category: "Languages", name: "C++", icon: <SiCplusplus className="text-blue-700" />, level: "75%" },
//     { category: "Tools", name: "VS Code", icon: <VscVscode className="text-blue-600" />, level: "95%" },
//     { category: "Tools", name: "GitHub", icon: <FaGithub className="text-gray-900" />, level: "90%" },
//     { category: "Tools", name: "Postman", icon: <SiPostman className="text-orange-500" />, level: "80%" }
// ];

// const Skills = () => {
//     const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

//     return (
//         <div ref={ref} className="container max-w-7xl mx-auto px-5 md:py-16 lg:pt-16">
//             {/* Section Title */}
//             <div className="text-center mb-12">
//                 <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
//                 <p className="mt-4 md:text-lg text-gray-600">
//                     Technologies and tools I use to build modern and scalable web applications.
//                 </p>
//             </div>

//             {/* Skills Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {skills.map((skill, index) => (
//                     <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//                         transition={{ duration: 0.4, delay: index * 0.1 }}
//                         className="p-6 shadow-lg rounded-xl bg-gradient-to-r from-gray-100 to-white transition transform hover:-translate-y-2 hover:shadow-xl"
//                     >
//                         <div className="flex items-center space-x-4">
//                             <div className="text-5xl">{skill.icon}</div>
//                             <h4 className="text-xl font-semibold">{skill.name}</h4>
//                         </div>
//                         <div className="mt-3 h-3 w-full bg-gray-200 rounded-full">
//                             <motion.div
//                                 initial={{ width: "0%" }}
//                                 animate={{ width: inView ? skill.level : "0%" }}
//                                 transition={{ duration: 1 }}
//                                 className="h-full bg-blue-500 rounded-full"
//                             ></motion.div>
//                         </div>
//                         <p className="text-sm mt-1 text-gray-600">{skill.level} proficiency</p>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Skills;





import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiMongodb, SiC, SiCplusplus, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const frontendSkills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-600" />, level: "90%" },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-600" />, level: "87%" },
    { name: "JavaScript", icon: <FaJsSquare className="text-yellow-500" />, level: "80%" },
    { name: "React", icon: <FaReact className="text-blue-400" />, level: "85%" },
    { name: "Tailwind CSS", icon: <RiTailwindCssFill className="text-cyan-500" />, level: "90%" }
];

const backendSkills = [
    { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, level: "80%" },
    { name: "Express.js", icon: <SiExpress className="text-gray-700" />, level: "75%" },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: "85%" }
];

const tools = [
    { name: "VS Code", icon: <VscVscode className="text-blue-600" />, level: "95%" },
    { name: "GitHub", icon: <FaGithub className="text-gray-900" />, level: "90%" },
    { name: "Postman", icon: <SiPostman className="text-orange-500" />, level: "70%" }
];

const programmingLanguages = [
    { name: "C", icon: <SiC className="text-blue-500" />, level: "95%" },
    { name: "C++", icon: <SiCplusplus className="text-blue-700" />, level: "95%" }
];

const SkillsSection = ({ title, skills }) => (
    <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 shadow-lg rounded-xl bg-gradient-to-r from-gray-100 to-white transition transform hover:-translate-y-2 hover:shadow-xl"
                >
                    <div className="flex items-center space-x-4">
                        <div className="text-5xl">{skill.icon}</div>
                        <h4 className="text-xl font-semibold">{skill.name}</h4>
                    </div>
                    <div className="mt-3 h-2 w-full bg-gray-200 rounded-full">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: skill.level }}
                            transition={{ duration: 1 }}
                            className="h-full bg-blue-500 rounded-full"
                        ></motion.div>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">{skill.level} proficiency</p>
                </motion.div>
            ))}
        </div>
    </div>
);

const Skills = () => {
    const { ref } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <div ref={ref} className="container max-w-7xl mx-auto px-5 lg:pt-12">
            {/* Section Title */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
                <p className="mt-4 md:text-lg text-gray-600">
                    Technologies and tools I use to build modern and scalable web applications.
                </p>
            </div>

            {/* Separated Skill Sections */}
            <SkillsSection title="Frontend Development" skills={frontendSkills} />
            <SkillsSection title="Backend Development" skills={backendSkills} />
            <SkillsSection title="Programming Languages" skills={programmingLanguages} />
            <SkillsSection title="Tools & Platforms" skills={tools} />
        </div>
    );
};

export default Skills;







// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from "react-icons/fa";
// import { SiTailwindcss, SiExpress, SiMongodb } from "react-icons/si";

// const skills = [
//     { name: "HTML", icon: <FaHtml5 className="text-orange-600" /> },
//     { name: "CSS", icon: <FaCss3Alt className="text-blue-600" /> },
//     { name: "JavaScript", icon: <FaJsSquare className="text-yellow-500" /> },
//     { name: "React", icon: <FaReact className="text-blue-400" /> },
//     { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
//     { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
//     { name: "Express.js", icon: <SiExpress className="text-gray-700" /> },
//     { name: "MongoDB Atlas", icon: <SiMongodb className="text-green-500" /> }
// ];

// const Skills = () => {
//     // Hook to track when the component is in view
//     const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

//     return (
//         <div ref={ref} className="container max-w-7xl mx-auto px-5 md:py-16 lg:pt-16">
//             {/* Section Title */}
//             <div className="text-center mb-12">
//                 <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
//                 <p className="mt-4 md:text-lg text-gray-600 ">
//                     Technologies I use to build modern and scalable web applications.
//                 </p>
//             </div>

//             {/* Skills Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
//                 {skills.map((skill, index) => (
//                     <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//                         transition={{ duration: 0.0, delay: index * 0.2 }}
//                         className="flex flex-col items-center p-4 shadow-lg rounded-xl transition transform hover:-translate-y-2 hover:shadow-xl"
//                     >
//                         <div className="text-5xl">{skill.icon}</div>
//                         <p className="mt-3 text-lg">{skill.name}</p>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Skills;
