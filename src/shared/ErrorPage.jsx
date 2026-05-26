import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import gif from '../../src/assets/404.gif'

const ErrorPage = () => {
    const navigate = useNavigate();

    const navItems = [
        // { id: "home", label: "Home", path: "/", isSection: true },
        { id: "about", label: "About", path: "/", isSection: true },
        { id: "skills", label: "Skills", path: "/", isSection: true },
        { id: "experience", label: "Experience", path: "/", isSection: true },
        { id: "projects", label: "Projects", path: "/", isSection: true },
        { id: "contact", label: "Contact", path: "/", isSection: true },
    ];

    const handleNavClick = (e, path, isSection, id) => {
        if (isSection && path === "/") {
            e.preventDefault();
            if (window.location.pathname !== "/") {
                navigate("/");
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
            } else {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    return (
        <>
            <title>404 - Page Not Found | Ashraful Islam Ratul</title>

            <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
                {/* Decorative Background Elements */}
                {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
                </div> */}

                <div className="relative max-w-4xl w-full">
                    {/* Main Card */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        {/* Content Section */}
                        <div className="p-10">
                            <div className="flex flex-col lg:flex-row items-center gap-10">

                                {/* Left Side - Animation/GIF */}
                                <div className="flex-1 relative">
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                                        <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-4">
                                            <img
                                                src={gif}
                                                alt="404 Error Illustration"
                                                className="w-full max-w-sm mx-auto rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        404 Error
                                    </div>
                                </div>

                                {/* Right Side - Content */}
                                <div className="flex-1 text-center lg:text-left space-y-6">
                                    {/* Title */}
                                    <h1 className="text-4xl font-black dark:text-white">
                                        Page Not Found
                                    </h1>

                                    {/* Description */}
                                    <p className="dark:text-gray-300 text-lg leading-relaxed">
                                        Oops! The page you're looking for seems to have wandered off into the digital wilderness.
                                        Don't worry though, we've got plenty of exciting content waiting for you on the homepage.
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                                        <Link
                                            to="/"
                                            className="group inline-flex items-center justify-center gap-2 p-3 bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            <FaHome className="group-hover:scale-110 transition-transform" />
                                            <span>Back to Homepage</span>
                                        </Link>

                                        <button
                                            onClick={() => navigate(-1)}
                                            className="inline-flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all duration-300 border border-gray-300 dark:border-gray-600 hover:scale-105"
                                        >
                                            <FaArrowLeft className="text-sm" />
                                            <span>Previous Page</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Navigation Links */}
                        <div className="p-4 bg-gray-50/80 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.path}
                                        onClick={(e) => handleNavClick(e, item.path, item.isSection, item.id)}
                                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Copyright */}
                            {/* <div className="text-center mt-3">
                                <p className="text-sm text-gray-500">
                                    © {new Date().getFullYear()} Ashraful Islam Ratul. All rights reserved.
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
