import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb } from "react-icons/si";

const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-600" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-600" /> },
    { name: "JavaScript", icon: <FaJsSquare className="text-yellow-500" /> },
    { name: "React", icon: <FaReact className="text-blue-400" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-700" /> },
    { name: "MongoDB Atlas", icon: <SiMongodb className="text-green-500" /> }
];

const Skills = () => {
    // Hook to track when the component is in view
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <div ref={ref} className="container mx-auto px-6 pt-16">
            {/* Section Title */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Skills</h2>
                <p className="mt-2">
                    Technologies I use to build modern and scalable web applications.
                </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.1, delay: index * 0.3 }}
                        className="flex flex-col items-center p-4 shadow-lg rounded-xl transition transform hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="text-5xl">{skill.icon}</div>
                        <p className="mt-3 text-lg">{skill.name}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Skills;















// import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
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
//     // { name: "Database", icon: <FaDatabase className="text-teal-600" /> },
// ];

// const Skills = () => {
//     return (
//         <div className="container mx-auto px-6 py-16">
//             {/* Section Title */}
//             <div className="text-center mb-12">
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//                     My <span className="text-blue-600">Skills</span>
//                 </h2>
//                 <p className="text-gray-500 mt-2">
//                     Technologies I use to build modern and scalable web applications.
//                 </p>
//             </div>

//             {/* Skills Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
//                 {skills.map((skill, index) => (
//                     <div
//                         key={index}
//                         className="flex flex-col items-center p-4 bg-white shadow-lg rounded-xl transition transform hover:-translate-y-2 hover:shadow-xl"
//                     >
//                         <div className="text-5xl">{skill.icon}</div>
//                         <p className="mt-3 text-lg font-medium text-gray-700">{skill.name}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Skills;
