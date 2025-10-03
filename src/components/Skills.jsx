import { useEffect } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase, FaJs } from "react-icons/fa";
import { SiTailwindcss, SiDaisyui, SiExpress, SiC, SiCplusplus } from "react-icons/si";
import { Chart } from 'react-google-charts';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { BiLogoPostgresql } from 'react-icons/bi';

const skills = [
    { name: "HTML", level: 85, icon: <FaHtml5 className="text-orange-500 text-4xl" />, color: "bg-orange-100 border-orange-500" },
    { name: "CSS", level: 80, icon: <FaCss3Alt className="text-blue-500 text-4xl" />, color: "bg-blue-100 border-blue-500" },
    { name: "Tailwind CSS", level: 80, icon: <SiTailwindcss className="text-cyan-500 text-4xl" />, color: "bg-cyan-100 border-cyan-500" },
    { name: "DaisyUI", level: 60, icon: <SiDaisyui className="text-purple-500 text-4xl" />, color: "bg-purple-100 border-purple-500" },
    { name: "JavaScript", level: 70, icon: <FaJs className="text-yellow-500 text-4xl" />, color: "bg-yellow-100 border-yellow-500" },
    { name: "React", level: 75, icon: <FaReact className="text-blue-400 text-4xl" />, color: "bg-blue-100 border-blue-400" },
    { name: "Node.js", level: 40, icon: <FaNodeJs className="text-green-500 text-4xl" />, color: "bg-green-100 border-green-500" },
    { name: "Express.js", level: 40, icon: <SiExpress className="text-gray-700 text-4xl" />, color: "bg-gray-100 border-gray-500" },
    { name: "MongoDB Atlas", level: 30, icon: <FaDatabase className="text-green-600 text-4xl" />, color: "bg-green-100 border-green-500" },
    { name: "PostgreSQL", level: 30, icon: <BiLogoPostgresql className="text-sky-700 text-4xl" />, color: "bg-sky-100 border-sky-500" },
    { name: "C", level: 80, icon: <SiC className="text-blue-600 text-4xl" />, color: "bg-blue-100 border-blue-600" },
    { name: "C++", level: 85, icon: <SiCplusplus className="text-indigo-500 text-4xl" />, color: "bg-indigo-100 border-indigo-500" }
];

const Skills = () => {
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);

    const data = [
        ["Skill", "Proficiency"],
        ...skills.map(skill => [skill.name, skill.level])
    ];

    const options = {
        // title: "My Skills",
        pieHole: 0.4,
        is3D: false,
    };

    return (
        <div className="container max-w-7xl mx-auto px-4 text-center pb-8 md:py-8">
            <h2 className="text-3xl md:text-4xl font-bold">Skills</h2>
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        data-aos-anchor-placement="top-bottom"
                        className={`p-6 rounded-xl border shadow-md transition transform hover:scale-105 ${skill.color}`}
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg bg-white">
                                {skill.icon}
                            </div>
                            <p className="mt-4 text-lg font-semibold text-gray-800">{skill.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
