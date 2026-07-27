import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../src/assets/logo3.png';
import logoTab from '../../src/assets/logo4.png';
import { Download, Menu, X } from "lucide-react";
import DarkLightTheme from "../shared/DarkLightTheme";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isHomeRoute = location.pathname === "/";

    // Define nav items with support for both section scrolling and route paths
    const navItems = [
        // { id: "home", label: "Home", path: "/", isSection: true },
        { id: "about", label: "About", path: "/", isSection: true },
        { id: "services", label: "Services", path: "/", isSection: true },
        { id: "skills", label: "Skills", path: "/", isSection: true },
        { id: "projects", label: "Projects", path: "/", isSection: true },
        { id: "experience", label: "Experience", path: "/", isSection: true },
        { id: "educations", label: "Education", path: "/", isSection: true },
        { id: "contact", label: "Contact", path: "/", isSection: true },
        // ...(user ? [{ id: "dashboard", label: "Dashboard", path: "/dashboard", isSection: false }] : []),
        // ...(!user ? [{ id: "login", label: "Login", path: "/login", isSection: false }] : [])
    ];

    useEffect(() => {
        if (location.pathname !== "/") {
            setActiveSection("");
            return;
        }

        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const scrollToSection = (id, isSmooth = true) => {
        navigate("/");

        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                if (isSmooth) {
                    window.scrollTo({
                        top: element.offsetTop - 70,
                        behavior: "smooth",
                    });
                } else {
                    window.scrollTo(0, element.offsetTop - 70);
                }
            }
        }, 100);
    };

    const handleSectionClick = (id, path, isSection) => {
        if (isSection) {
            scrollToSection(id, true);
        } else {
            navigate(path);
        }
        setMobileMenuOpen(false);
    };

    const handleLogoClick = () => {
        if (location.pathname === "/") {
            const element = document.getElementById("home");
            if (element) {
                window.scrollTo(0, element.offsetTop - 70);
            }
        } else {
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById("home");
                if (element) {
                    window.scrollTo(0, element.offsetTop - 70);
                }
            }, 100);
        }
        setMobileMenuOpen(false);
    };

    const isItemActive = (item) => {
        // Only apply active state on large screens (lg: and above)
        if (window.innerWidth >= 1024) {
            if (item.isSection) {
                return location.pathname === "/" && activeSection === item.id;
            }
            return location.pathname === item.path;
        }
        // On medium and small screens, never show active state
        return false;
    };

    // Desktop navigation
    const desktopNavLinks = (
        <>
            {navItems.map((item) => (
                // <li key={item.id} className="text-center group"></li>
                <li key={item.id} className={`text-center group ${item.id === "contact" ? "hidden md:block" : ""
                    }`}>
                    <a
                        onClick={() => handleSectionClick(item.id, item.path, item.isSection)}
                        className={`relative inline-block pb-1 transition-colors duration-300 cursor-pointer
                            ${isItemActive(item)
                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                : "hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                            }`}
                    >
                        {item.label}
                        <span className={`absolute left-1/2 bottom-0 h-0.5 from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 ease-out
                            ${isItemActive(item)
                                ? 'w-full -translate-x-1/2 opacity-100 bg-gradient-to-r'
                                : 'w-0 -translate-x-1/2 opacity-0 group-hover:w-full group-hover:opacity-100 bg-gradient-to-l'
                            }`} />
                    </a>
                </li>
            ))}
        </>
    );

    // Mobile navigation - Bottom Sheet Style with proper backgrounds
    const mobileNavLinks = (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            {/* Header with logo and close */}
            <div className="flex items-center justify-end px-4 pt-3 bg-white dark:bg-gray-900">
                {/* <img src={logo} alt="Logo" className="w-32" /> */}
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <X size={24} className="dark:text-gray-300" />
                </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 pb-6 bg-white dark:bg-gray-900 shadow-[0_30px_30px_rgba(59,130,246,0.5)]">
                <div className="space-y-5">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            onClick={() => handleSectionClick(item.id, item.path, item.isSection)}
                            className="flex items-center justify-center cursor-pointer"
                        >
                            <span className="text-lg dark:text-white">{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            {/* <div className="p-6 border-t border-gray-300 dark:border-gray-700 space-y-4 bg-white dark:bg-gray-900 shadow-lg dark:shadow-[0_30px_50px_rgba(59,130,246,0.5)]">
                <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-300 dark:bg-gray-800">
                    <span className="text-black dark:text-gray-300">Theme</span>
                    <DarkLightTheme />
                </div>

                <button
                    onClick={() => {
                        const link = document.createElement('a');
                        href = "/Ashraful_Islam_Ratul_MERN_Stack_Developer_CV.pdf"
                        download = "Ashraful_Islam_Ratul_MERN_Stack_Developer_CV.pdf"
                        link.click();
                        setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                    <Download size={18} />
                    <span>Download CV</span>
                </button>
            </div> */}
        </div>
    );

    const navbarClass = isHomeRoute
        ? "fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900 backdrop-blur-md shadow-md dark:shadow-none"
        : "fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black backdrop-blur-md shadow-md dark:shadow-none";

    return (
        <div className={navbarClass}>
            <div className="navbar container max-w-7xl mx-auto px-4 lg:pl-4 lg:py-3">
                <div className="navbar-start">
                    <a onClick={handleLogoClick} className="cursor-pointer">
                        {/* Small & Large */}
                        <div className=" dark:bg-white dark:rounded-lg">
                            <img
                                src={logo}
                                alt="Logo"
                                className="hidden md:block w-32 md:w-40"
                            />
                        </div>

                        {/* Medium only */}
                        <div className="block md:hidden font-mono text-xl font-bold tracking-tight space-x-1">
                            <span className="text-blue-500">&lt;</span>
                            <span className="dark:text-white">Ratul</span>
                            <span className="text-blue-500">/&gt;</span>
                        </div>
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex mt-1 lg:-mt-1">
                    <ul className="flex items-center gap-6 lg:gap-10 md:text-[1.05rem] lg:text-[1.3rem] cursor-pointer">
                        {desktopNavLinks}
                    </ul>
                </div>

                <div className="navbar-end gap-4 lg:gap-6">
                    <div>
                        <DarkLightTheme />
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Mobile Sidebar/Drawer Menu - only on small and medium screens */}
                    {mobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden"
                                onClick={() => setMobileMenuOpen(false)}
                            />

                            {/* Drawer */}
                            <div className="fixed right-0 top-0 bottom-0 w-full shadow-2xl z-50 transform transition-transform duration-300 ease-out lg:hidden animate-slideInRight">
                                {mobileNavLinks}
                            </div>
                        </>
                    )}

                    {/* CV button */}
                    {/* <a
                        href="/Ashraful_Islam_Ratul_MERN_Stack_Developer_CV.pdf"
                        download="Ashraful_Islam_Ratul_MERN_Stack_Developer_CV.pdf"
                        className="hidden lg:inline-flex items-center gap-1 relative px-2 py-1.5 rounded-lg overflow-hidden bg-blue-600 text-sm text-white font-semibold transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-95"
                    >
                        <Download size={16} className="relative z-10" />
                        <span className="relative z-10">CV</span>
                    </a> */}

                    {/* <span className="hidden md:block"
                    >
                        <DarkLightTheme />
                    </span> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
