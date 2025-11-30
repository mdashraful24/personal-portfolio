import { useEffect } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase, FaJs, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiDaisyui, SiExpress, SiC, SiCplusplus, SiNetlify, SiVercel } from "react-icons/si";
import { BiLogoPostgresql } from 'react-icons/bi';
import { VscVscode } from "react-icons/vsc";
import AOS from 'aos';
import 'aos/dist/aos.css';

const skills = [
    { name: "HTML", level: 85, icon: <FaHtml5 />, color: "hover:border-orange-500 hover:text-orange-600" },
    { name: "CSS", level: 80, icon: <FaCss3Alt />, color: "hover:border-blue-500 hover:text-blue-600" },
    { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss />, color: "hover:border-cyan-500 hover:text-cyan-600" },
    { name: "DaisyUI", level: 90, icon: <SiDaisyui />, color: "hover:border-purple-500 hover:text-purple-600" },
    { name: "JavaScript", level: 70, icon: <FaJs />, color: "hover:border-yellow-500 hover:text-yellow-600" },
    { name: "React", level: 75, icon: <FaReact />, color: "hover:border-blue-400 hover:text-blue-600" },
    { name: "Node.js", level: 75, icon: <FaNodeJs />, color: "hover:border-green-500 hover:text-green-600" },
    { name: "Express.js", level: 70, icon: <SiExpress />, color: "hover:border-gray-600 hover:text-gray-600" },
    { name: "MongoDB Atlas", level: 60, icon: <FaDatabase />, color: "hover:border-green-600 hover:text-green-600" },
    { name: "PostgreSQL", level: 40, icon: <BiLogoPostgresql />, color: "hover:border-sky-600 hover:text-sky-600" },
    { name: "C", level: 80, icon: <SiC />, color: "hover:border-blue-600 hover:text-blue-600" },
    { name: "C++", level: 85, icon: <SiCplusplus />, color: "hover:border-indigo-500 hover:text-indigo-600" }
];

const tools = [
    { name: "GitHub", icon: <FaGithub />, color: "hover:border-gray-900 hover:text-gray-900" },
    { name: "VS Code", icon: <VscVscode />, color: "hover:border-blue-600 hover:text-blue-600" },
    { name: "Netlify", icon: <SiNetlify />, color: "hover:border-green-500 hover:text-green-500" },
    { name: "Vercel", icon: <SiVercel />, color: "hover:border-black hover:text-black" },
];

const Skills = () => {
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);

    const getProficiencyText = (level) => {
        if (level >= 80) return "Expert";
        if (level >= 60) return "Advanced";
        if (level >= 40) return "Intermediate";
        return "Beginner";
    };

    const getProficiencyColor = (level) => {
        if (level >= 80) return "text-green-600 bg-green-100 border-green-400 group-hover:text-green-700";
        if (level >= 60) return "text-blue-600 bg-blue-100 border-blue-400 group-hover:text-blue-700";
        if (level >= 40) return "text-yellow-600 bg-yellow-100 border-yellow-400 group-hover:text-yellow-700";
        return "text-gray-600 bg-gray-100 border-gray-400 group-hover:text-gray-700";
    };

    return (
        <div className='bg-gray-50 py-10 md:py-20 lg:py-32 xl:py-40'>
            <div className="container max-w-7xl mx-auto px-4 text-center">
                <div className="text-center mb-10" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold md:mb-5">Skills & Technologies</h2>
                    <p className="hidden md:block text-lg max-w-3xl mx-auto leading-relaxed">
                        I work with frontend and backend development, databases, and deployment tools to build reliable, efficient, and easy-to-maintain digital projects.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                            className={`group relative bg-white rounded-2xl border-2 border-gray-200 p-6 text-center transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl ${skill.color}`}
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Icon */}
                            <div className="relative z-10 mb-4">
                                <div className="text-4xl text-gray-400 group-hover:text-current group-hover:scale-110 transition-transform duration-500">
                                    {skill.icon}
                                </div>
                            </div>

                            {/* Skill name */}
                            <h3 className="relative z-10 text-lg font-medium group-hover:text-current mb-2 group-hover:font-semibold transition-all duration-300">
                                {skill.name}
                            </h3>

                            {/* Proficiency level */}
                            <div className={`relative z-10 inline-flex items-center px-3 py-1 border rounded-full text-xs font-bold ${getProficiencyColor(skill.level)}`}>
                                {getProficiencyText(skill.level)}
                            </div>

                            {/* Percentage indicator */}
                            <div className="relative z-10 mt-3">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>0%</span>
                                    <span className="font-semibold text-gray-600">{skill.level}%</span>
                                    <span>100%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className="bg-current h-1.5 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tools & Deployment */}
                <div className="mt-4 md:mt-8 text-center" data-aos="fade-up">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {tools.map((tool, index) => (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-2xl border-2 border-gray-200 p-6 text-center transition-all duration-500 ease-out transform hover:shadow-2xl ${tool.color}`}
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 mb-4">
                                    <div className="text-4xl text-gray-400 group-hover:text-current group-hover:scale-110 transition-transform duration-500">
                                        {tool.icon}
                                    </div>
                                </div>
                                <h3 className="relative z-10 text-lg font-medium text-gray-700 group-hover:text-current group-hover:font-semibold transition-all duration-300">
                                    {tool.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Summary */}
                {/* <div className="mt-20 text-center" data-aos="fade-up">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 rounded-xl bg-gray-50 border shadow hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                            <div className="font-medium">Programming Languages</div>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-gray-50 border shadow hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="text-3xl font-bold text-green-600 mb-2">80%</div>
                            <div className="font-medium">Frontend Development</div>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-gray-50 border shadow hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
                            <div className="font-medium">Backend Development</div>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-gray-50 border shadow hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="text-3xl font-bold text-orange-600 mb-2">30%</div>
                            <div className="font-medium">Database Management</div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Skills;
