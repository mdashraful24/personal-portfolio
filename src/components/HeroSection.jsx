import { FaDownload, FaFacebook, FaGithub, FaLinkedin, FaBriefcase, FaCode, FaGraduationCap } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import img from '../../src/assets//image/img.png';
import './css/HeroSection.css'
import { Download } from "lucide-react";

// dark: bg - gradient - to - br dark: from - gray - 900 dark: via - gray - 800 dark: to - gray - 900
const HeroSection = ({ onHireMeClick }) => {
    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-950 dark:to-black lg:min-h-[calc(100vh-4rem)] overflow-hidden relative animate-fade-in">
            {/* Background decorative elements - Hidden in dark mode */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float dark:hidden" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float dark:hidden" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl animate-pulse-glow dark:hidden"></div>

            <div className="container max-w-7xl mx-auto px-4 py-14 md:py-16 lg:py-0 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row lg:min-h-[calc(100vh-4rem)] items-center justify-between gap-16">
                    {/* LEFT SIDE - Content */}
                    <div className="w-full lg:w-auto text-center lg:text-left space-y-6 md:space-y-8 px-0 stagger-children">
                        {/* Greeting Badge */}
                        <div className="inline-flex items-center gap-2.5 bg-[#2f2f38] dark:bg-gray-800 text-white backdrop-blur-sm px-4 py-1.5 rounded-full shadow border border-blue-100 dark:border-gray-700 mx-auto lg:mx-0">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-pulse-glow-open absolute inline-flex h-full w-full rounded-full"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium">Available for opportunities</span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4 md:space-y-6">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                                <p className="text-gray-600 dark:text-gray-400 mb-2 animate-slide-left delay-100">
                                    Hi, I'm
                                </p>
                                <p className="text-blue-600 dark:text-blue-400 animate-slide-right delay-200">
                                    Ashraful Islam Ratul
                                </p>
                            </h1>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full shadow animate-scale delay-300">
                                    <FaCode className="text-blue-500 dark:text-blue-400 text-sm" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Web Developer</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full shadow animate-scale delay-400">
                                    <FaGraduationCap className="text-indigo-500 dark:text-indigo-400 text-sm" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fresh Graduate</span>
                                </div>
                                <div className="flex items-center gap-1 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full shadow animate-scale delay-500">
                                    <HiOutlineLocationMarker className="text-rose-500 dark:text-rose-400 text-sm" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dhaka, Bangladesh</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="w-full max-w-xl mx-auto lg:text-lg leading-relaxed animate-fade-up delay-200 text-gray-600 dark:text-gray-300">
                            Full-stack developer focused on crafting clean UIs and solid backend logic. I create responsive, user-friendly applications backed by scalable systems and well-structured databases.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-up delay-300">
                            <a
                                href="/CV by Ashraful Islam Ratul.pdf"
                                download="CV by Ashraful Islam Ratul.pdf"
                                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-95 group"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Download size={18} className="group-hover:animate-bounce" />
                                    Download CV
                                </span>
                            </a>
                            <button
                                onClick={onHireMeClick}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold transition-all duration-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-md active:scale-95"
                            >
                                <FaBriefcase className="text-sm" />
                                Hire Me
                            </button>
                        </div>

                        {/* Social Links with Labels */}
                        <div className="flex flex-col items-center lg:items-start gap-4 pt-4 animate-fade-up delay-400">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Connect with me:</p>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <a
                                    href="https://github.com/mdashraful24"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:scale-105"
                                >
                                    <div className="p-1 bg-gray-900 dark:bg-gray-700 rounded-lg text-white transition-all duration-300 group-hover:rotate-12">
                                        <FaGithub className="text-lg" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ashraful-islam-ratul/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:scale-105"
                                >
                                    <div className="p-1 bg-blue-600 rounded-lg text-white transition-all duration-300 group-hover:rotate-12">
                                        <FaLinkedin className="text-lg" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
                                </a>
                                <a
                                    href="https://www.facebook.com/ashraful.islam.ratul2k"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:scale-105"
                                >
                                    <div className="p-1 bg-blue-700 dark:bg-blue-600 rounded-lg text-white transition-all duration-300 group-hover:rotate-12">
                                        <FaFacebook className="text-lg" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Profile Image with Badge */}
                    <div className="flex justify-center items-center relative group animate-blur-in lg:mr-9">
                        {/* Decorative rings - grayscale initially, color on group hover */}
                        <div className="absolute w-[310px] h-[310px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] rounded-full border-2 border-gray-400 dark:border-gray-600 grayscale group-hover:grayscale-0 group-hover:border-blue-600 dark:group-hover:border-blue-400 transition-all duration-700 animate-rotate-in"></div>

                        {/* Solar system orbiting icon - spins around the image, stops on group hover */}
                        <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full animate-orbit group-hover:animation-none">
                            <div className="absolute top-4 md:top-5 lg:top-4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-full p-2 md:p-2.5 shadow-lg animate-pulse-glow">
                                    <FaCode className="text-white text-sm md:text-base" />
                                </div>
                            </div>
                        </div>

                        {/* Profile Image Container */}
                        <div className="relative animate-scale delay-200">
                            {/* Image with grayscale to color transition on hover */}
                            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] dark:group-hover:shadow-[0_0_50px_rgba(59,130,246,0.7)]">
                                <img
                                    src={img}
                                    alt="Ashraful Islam Ratul"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Open to Work Badge */}
                            <div className="absolute -bottom-1 -right-2 z-20 animate-bounce-in delay-300">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                                    <div className="relative bg-[#2f2f38] dark:bg-gray-800 rounded-full p-1 shadow-lg hover:scale-110 transition-transform duration-300">
                                        <div className="flex items-center gap-2.5 px-2 md:px-3 py-0.5 md:py-1">
                                            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                                                <span className="animate-pulse-glow-open absolute inline-flex h-full w-full rounded-full"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-green-500"></span>
                                            </span>
                                            <span className="text-white font-bold text-xs md:text-sm uppercase">Open to Projects</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block animate-fade-up delay-500">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
