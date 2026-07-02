import { useEffect, useRef } from "react";
import education from "../data/educationalInfo.js";
import certifications from "../data/certificationInfo.js";
import "./css/education.css";
import {
    FaGraduationCap,
    FaCertificate,
    FaExternalLinkAlt,
} from "react-icons/fa";
import GlowCard from "../shared/GlowCard";
import { Calendar } from "lucide-react";

const Education = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const elements = sectionRef.current.querySelectorAll(".animate-item");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();

    }, []);

    return (
        <section
            ref={sectionRef}
            id="educations"
            className="dark:bg-black py-6 lg:py-20"
        >
            <div className="container max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
                            My Education
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <p className="md:text-[1.3rem] dark:text-gray-300 max-w-4xl mx-auto">
                        My academic journey has provided a solid foundation in computer
                        science while continuous learning through professional
                        certifications keeps my skills updated.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Line */}
                    <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-blue-600/80 dark:bg-blue-500/80 -translate-x-1/2"></div>
                    {education.map((item, index) => (
                        <div
                            key={index}
                            className={`animate-item relative flex mb-6 md:mb-10 ${index % 2 === 0
                                ? "md:flex-row"
                                : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Dot */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-slate-950 animate-pulse-glow justify-center items-center">
                                <FaGraduationCap className="text-slate-900" />
                            </div>

                            {/* Left side card with pr-6 */}
                            {index % 2 === 0 ? (
                                <div className="md:w-1/2 md:pr-7">
                                    <div className="card">
                                        <GlowCard>
                                            <div className="p-5 rounded-2xl">
                                                <span className="text-[1.05rem] text-blue-400 font-semibold">
                                                    {item.duration}
                                                </span>
                                                <h3 className="text-2xl text-white font-bold mt-3">
                                                    {item.degree}
                                                </h3>
                                                <h4 className="text-lg text-gray-200 mt-2">
                                                    {item.institute}
                                                </h4>
                                                <p className="text-[1.1rem] text-gray-300 mt-2 leading-7">
                                                    {item.description}
                                                </p>
                                                <div className={`flex flex-wrap gap-2 ${item.keyLearning?.length ? "mt-4" : "mt-0"
                                                    }`}>
                                                    {item.keyLearning.map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500 text-blue-300 text-[0.78rem]"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </GlowCard>
                                    </div>
                                </div>
                            ) : (
                                // Right side card with pl-6
                                <div className="md:w-1/2 md:pl-7">
                                    <div className="card">
                                        <GlowCard>
                                            <div className="p-5 rounded-2xl">
                                                <span className="text-[1.05rem] text-blue-400 font-semibold">
                                                    {item.duration}
                                                </span>
                                                <h3 className="text-2xl text-white font-bold mt-3">
                                                    {item.degree}
                                                </h3>
                                                <h4 className="text-lg text-gray-200 mt-2">
                                                    {item.institute}
                                                </h4>
                                                <p className="text-[1.1rem] text-gray-300 mt-2 leading-7">
                                                    {item.description}
                                                </p>
                                                <div className={`flex flex-wrap gap-2 ${item.keyLearning?.length ? "mt-4" : "mt-0"
                                                    }`}>
                                                    {item.keyLearning.map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500 text-blue-300 text-[0.78rem]"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </GlowCard>
                                    </div>
                                </div>
                            )}

                            <div className="hidden md:block md:w-1/2"></div>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <div className="animate-item">
                    <div className="text-left mb-8">
                        <h2 className="text-4xl font-bold">
                            Certifications
                        </h2>
                        <p className="text-[1.2rem] dark:text-gray-300 mt-2">
                            Continuous learning through online courses and certifications.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {certifications.map((cert, index) => (
                            <GlowCard key={index}>
                                <div className="p-5">
                                    <div className="flex justify-between items-center gap-2 mb-4">
                                        <p className="flex items-center gap-2 text-gray-200">
                                            <Calendar size={16} /> {cert.year}
                                        </p>
                                        <FaCertificate className="text-xl text-blue-500" />
                                    </div>
                                    <h3 className="text-2xl text-white font-bold">{cert.title}</h3>
                                    <p className="text-lg text-gray-200 mt-1">{cert.provider}</p>
                                    <p className="text-gray-200 mt-1">Credential Id: {cert.credentialId}</p>
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-full bg-blue-600 text-white font-semibold transition"
                                    >
                                        View Certificate
                                        <FaExternalLinkAlt size={14} />
                                    </a>
                                </div>
                            </GlowCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;