import { useEffect, useRef, useState } from "react";
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
    const [activeTab, setActiveTab] = useState("academic"); // "academic" or "certifications"

    // Function to setup observer for animation
    const setupObserver = () => {
        if (!sectionRef.current) return;

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

        return observer;
    };

    useEffect(() => {
        const observer = setupObserver();
        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    // Re-run observer when tab changes
    useEffect(() => {
        const timer = setTimeout(() => {
            const observer = setupObserver();
            return () => {
                if (observer) observer.disconnect();
            };
        }, 100);

        return () => clearTimeout(timer);
    }, [activeTab]);

    return (
        <section
            ref={sectionRef}
            id="educations"
            className="dark:bg-black py-6 lg:py-20"
        >
            <div className="container max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center mb-6">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
                            My Education
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <p className="md:text-[1.3rem] dark:text-gray-300 max-w-4xl mx-auto">
                        My educational background provides a solid foundation, while professional certifications showcase my dedication to staying current with industry standards and best practices.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mb-10 lg:mb-14">
                    <div className="inline-flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-md">
                        <button
                            onClick={() => setActiveTab("academic")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[1.05rem] font-semibold transition-all duration-300 ${activeTab === "academic"
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            <FaGraduationCap className="text-xl" />
                            Academic
                        </button>
                        <button
                            onClick={() => setActiveTab("certifications")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[1.05rem] font-semibold transition-all duration-300 ${activeTab === "certifications"
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            <FaCertificate className="text-xl" />
                            Certifications
                        </button>
                    </div>
                </div>

                {/* Academic Timeline */}
                {activeTab === "academic" && (
                    <div className="relative">
                        {/* Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-blue-600/80 dark:bg-blue-500/80 -translate-x-1/2"></div>
                        {education && education.length > 0 ? (
                            education.map((item, index) => (
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
                                                        <p className="flex items-center gap-2 text-gray-200">
                                                            <Calendar size={16} /> {item.duration}
                                                        </p>
                                                        <h3 className="text-2xl text-white font-bold mt-3">
                                                            {item.degree}
                                                        </h3>
                                                        <h4 className="text-xl text-gray-200 mt-2">
                                                            {item.institute}
                                                        </h4>
                                                        <p className="text-[1.1rem] text-gray-300 mt-3 leading-7">
                                                            {item.description}
                                                        </p>
                                                        <div className={`flex flex-wrap gap-2 ${item.keyLearning?.length ? "mt-4" : "mt-0"
                                                            }`}>
                                                            {item.keyLearning && item.keyLearning.map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500 text-blue-200 text-[0.8rem] font-semibold"
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
                                                        <p className="flex items-center gap-2 text-gray-200">
                                                            <Calendar size={16} /> {item.duration}
                                                        </p>
                                                        <h3 className="text-2xl text-white font-bold mt-3">
                                                            {item.degree}
                                                        </h3>
                                                        <h4 className="text-xl text-gray-200 mt-2">
                                                            {item.institute}
                                                        </h4>
                                                        <p className="text-[1.1rem] text-gray-300 mt-3 leading-7">
                                                            {item.description}
                                                        </p>
                                                        <div className={`flex flex-wrap gap-2 ${item.keyLearning?.length ? "mt-4" : "mt-0"
                                                            }`}>
                                                            {item.keyLearning && item.keyLearning.map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500 text-blue-200 text-[0.8rem] font-semibold"
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
                            ))
                        ) : (
                            <p className="text-center text-gray-400 dark:text-gray-500 py-10">
                                No education data available
                            </p>
                        )}
                    </div>
                )}

                {/* Certifications Timeline */}
                {activeTab === "certifications" && (
                    <div className="relative">
                        {/* Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-blue-600/80 dark:bg-blue-500/80 -translate-x-1/2"></div>

                        {certifications && certifications.length > 0 ? (
                            certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className={`animate-item relative flex mb-6 md:mb-10 ${index % 2 === 0
                                        ? "md:flex-row"
                                        : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Dot */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-slate-950 animate-pulse-glow justify-center items-center">
                                        <FaCertificate className="text-slate-900" />
                                    </div>

                                    {/* Left side card with pr-6 */}
                                    {index % 2 === 0 ? (
                                        <div className="md:w-1/2 md:pr-7">
                                            <div className="card">
                                                <GlowCard>
                                                    <div className="p-5 rounded-2xl">
                                                        <div className="flex justify-between items-center gap-2 mb-4">
                                                            <p className="flex items-center gap-2 text-gray-200">
                                                                <Calendar size={16} /> {cert.year}
                                                            </p>
                                                            <FaCertificate className="text-xl text-blue-500" />
                                                        </div>
                                                        <h3 className="text-2xl text-white font-bold">
                                                            {cert.title}
                                                        </h3>
                                                        <p className="text-lg text-gray-300 mt-1">
                                                            {cert.provider}
                                                        </p>
                                                        <p className="text-gray-300 mt-1">
                                                            <span className="font-bold">Credential ID:</span> {cert.credentialId}
                                                        </p>
                                                        {/* Key Skills Section - Added here */}
                                                        <div className={`flex flex-wrap gap-2 ${cert.keySkills?.length ? "mt-4" : "mt-0"}`}>
                                                            {cert.keySkills && cert.keySkills.map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500 text-blue-200 text-[0.8rem] font-semibold"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <a
                                                            href={cert.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-blue-600 text-[1.05rem] text-white font-semibold transition hover:bg-blue-700"
                                                        >
                                                            View Certificate
                                                            <FaExternalLinkAlt size={14} />
                                                        </a>
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
                                                        <div className="flex justify-between items-center gap-2 mb-4">
                                                            <p className="flex items-center gap-2 text-gray-200">
                                                                <Calendar size={16} /> {cert.year}
                                                            </p>
                                                            <FaCertificate className="text-xl text-blue-500" />
                                                        </div>
                                                        <h3 className="text-2xl text-white font-bold">
                                                            {cert.title}
                                                        </h3>
                                                        <p className="text-lg text-gray-300 mt-1">
                                                            {cert.provider}
                                                        </p>
                                                        <p className="text-gray-300 mt-1">
                                                            Credential Id: {cert.credentialId}
                                                        </p>
                                                        {/* Key Skills Section - Added here */}
                                                        <div className={`flex flex-wrap gap-2 ${cert.keySkills?.length ? "mt-4" : "mt-0"}`}>
                                                            {cert.keySkills && cert.keySkills.map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500 text-blue-200 text-[0.8rem] font-semibold"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <a
                                                            href={cert.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-blue-600 text-[1.05rem] text-white font-semibold transition hover:bg-blue-700"
                                                        >
                                                            View Certificate
                                                            <FaExternalLinkAlt size={14} />
                                                        </a>
                                                    </div>
                                                </GlowCard>
                                            </div>
                                        </div>
                                    )}
                                    <div className="hidden md:block md:w-1/2"></div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 dark:text-gray-500 py-10">
                                No certifications available
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Education;