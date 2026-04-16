import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../src/assets/logo3.png';
import { Download, Menu, X } from "lucide-react";
import DarkLightTheme from "../shared/DarkLightTheme";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Define nav items with support for both section scrolling and route paths
    const navItems = [
        { id: "home", label: "Home", path: "/", isSection: true },
        { id: "about", label: "About", path: "/", isSection: true },
        { id: "skills", label: "Skills", path: "/", isSection: true },
        { id: "experience", label: "Experience", path: "/", isSection: true },
        { id: "projects", label: "Projects", path: "/", isSection: true },
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
        if (item.isSection) {
            return location.pathname === "/" && activeSection === item.id;
        }
        return location.pathname === item.path;
    };

    // Desktop navigation
    const desktopNavLinks = (
        <>
            {navItems.map((item) => (
                <li key={item.id} className="text-center group">
                    <a
                        onClick={() => handleSectionClick(item.id, item.path, item.isSection)}
                        className={`relative inline-block pb-1 transition-colors duration-300 cursor-pointer
                            ${isItemActive(item)
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            }`}
                    >
                        {item.label}
                        <span className={`absolute left-1/2 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 ease-out
                            ${isItemActive(item)
                                ? 'w-full -translate-x-1/2 opacity-100'
                                : 'w-0 -translate-x-1/2 opacity-0 group-hover:w-full group-hover:opacity-100'
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
            <div className="flex items-center justify-end p-4 bg-white dark:bg-gray-900">
                {/* <img src={logo} alt="Logo" className="w-32" /> */}
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <X size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 pb-6 bg-white dark:bg-gray-900">
                <div className="space-y-5">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            onClick={() => handleSectionClick(item.id, item.path, item.isSection)}
                            className={`flex items-center justify-center cursor-pointer`}
                        >
                            <span className="text-lg">{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-6 border-t border-gray-300 dark:border-gray-700 space-y-4 bg-white dark:bg-gray-900 shadow-lg dark:shadow-[0_30px_50px_rgba(59,130,246,0.5)]">
                <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-300 dark:bg-gray-800">
                    <span className="text-black dark:text-gray-300">Theme</span>
                    <DarkLightTheme />
                </div>

                <button
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/resume.pdf';
                        link.download = 'Resume by Ashraful Islam Ratul.pdf';
                        link.click();
                        setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                    <Download size={18} />
                    <span>Download Resume</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black backdrop-blur-md shadow-md">
            <div className="navbar container max-w-7xl mx-auto px-4 lg:pl-4 lg:py-0">
                <div className="navbar-start">
                    <a onClick={handleLogoClick} className="cursor-pointer dark:bg-white dark:rounded-xl">
                        <img src={logo} alt="Logo" className="w-40 lg:w-48" />
                    </a>
                </div>

                <div className="navbar-center hidden md:flex">
                    <ul className="flex items-center gap-6 lg:gap-10 lg:text-lg cursor-pointer">
                        {desktopNavLinks}
                    </ul>
                </div>

                <div className="navbar-end md:gap-3 lg:gap-6">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden"
                        aria-label="Open menu"
                    >
                        <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Mobile Sidebar/Drawer Menu */}
                    {mobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            {/* <div
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden"
                                onClick={() => setMobileMenuOpen(false)}
                            /> */}

                            {/* Drawer */}
                            <div className="fixed right-0 top-0 bottom-0 w-full shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden animate-slideInRight">
                                {mobileNavLinks}
                            </div>
                        </>
                    )}

                    {/* Resume button */}
                    <a
                        href="/resume.pdf"
                        download="Resume by Ashraful Islam Ratul.pdf"
                        className="hidden md:inline-flex items-center gap-2 relative px-2 lg:px-3 py-1.5 rounded-lg overflow-hidden bg-blue-600 text-sm text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]"
                    >
                        <Download size={16} className="relative z-10" />
                        <span className="relative z-10">Resume</span>
                    </a>

                    <span className="hidden md:block"><DarkLightTheme /></span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;








// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import logo from '../../src/assets/logo3.png';
// import { Download } from "lucide-react";

// const Navbar = () => {
//     const [activeSection, setActiveSection] = useState("");
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Define nav items with support for both section scrolling and route paths
//     const navItems = [
//         { id: "home", label: "Home", path: "/", isSection: true },
//         { id: "about", label: "About", path: "/", isSection: true },
//         { id: "skills", label: "Skills", path: "/", isSection: true },
//         { id: "projects", label: "Projects", path: "/", isSection: true },
//         { id: "contact", label: "Contact", path: "/", isSection: true },
//         // ...(user ? [{ id: "dashboard", label: "Dashboard", path: "/dashboard", isSection: false }] : []),
//         // ...(!user ? [{ id: "login", label: "Login", path: "/login", isSection: false }] : [])
//     ];

//     useEffect(() => {
//         if (location.pathname !== "/") {
//             setActiveSection("");
//             return;
//         }

//         const sections = document.querySelectorAll("section");
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         setActiveSection(entry.target.id);
//                     }
//                 });
//             },
//             { threshold: 0.5 }
//         );

//         sections.forEach((section) => observer.observe(section));

//         return () => observer.disconnect();
//     }, [location.pathname]);

//     const scrollToSection = (id, isSmooth = true) => {
//         navigate("/");

//         setTimeout(() => {
//             const element = document.getElementById(id);
//             if (element) {
//                 if (isSmooth) {
//                     window.scrollTo({
//                         top: element.offsetTop - 70,
//                         behavior: "smooth",
//                     });
//                 } else {
//                     // Instant scroll without smooth behavior
//                     window.scrollTo(0, element.offsetTop - 70);
//                 }
//             }
//         }, 100);
//     };

//     const handleSectionClick = (id, path, isSection) => {
//         if (isSection) {
//             if (location.pathname === "/") {
//                 scrollToSection(id, true); // Smooth scroll for nav items
//             } else {
//                 scrollToSection(id, true); // Smooth scroll for nav items
//             }
//         } else {
//             navigate(path);
//         }
//         setDropdownOpen(false);
//     };

//     // Special handler for logo click - instant scroll
//     const handleLogoClick = () => {
//         if (location.pathname === "/") {
//             const element = document.getElementById("home");
//             if (element) {
//                 window.scrollTo(0, element.offsetTop - 70); // Instant scroll
//             }
//         } else {
//             navigate("/");
//             setTimeout(() => {
//                 const element = document.getElementById("home");
//                 if (element) {
//                     window.scrollTo(0, element.offsetTop - 70); // Instant scroll
//                 }
//             }, 100);
//         }
//         setDropdownOpen(false);
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     // Check if a nav item is active
//     const isItemActive = (item) => {
//         if (item.isSection) {
//             return location.pathname === "/" && activeSection === item.id;
//         }
//         return location.pathname === item.path;
//     };

//     // Single navLinksStyle using map
//     const navLinksStyle = (
//         <>
//             {navItems.map((item) => (
//                 <li key={item.id} className="text-center group">
//                     <a
//                         onClick={() => handleSectionClick(item.id, item.path, item.isSection)}
//                         className={`relative inline-block pb-1 transition-colors duration-300 cursor-pointer
//                             ${isItemActive(item)
//                                 ? "text-blue-600 font-semibold"
//                                 : "text-gray-700 hover:text-blue-600"
//                             }`}
//                     >
//                         {item.label}
//                         <span className={`absolute left-1/2 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 ease-out
//                             ${isItemActive(item)
//                                 ? 'w-full -translate-x-1/2 opacity-100'
//                                 : 'w-0 -translate-x-1/2 opacity-0 group-hover:bg-gradient-to-l group-hover:w-full group-hover:opacity-100'
//                             }`} />
//                     </a>
//                 </li>
//             ))}
//         </>
//     );

//     return (
//         <div className="fixed top-0 left-0 w-full z-50 bg-base-100/60 backdrop-blur-md shadow-md">
//             <div className="navbar container max-w-7xl mx-auto px-3 lg:px-2 lg:py-0">
//                 <div className="navbar-start">
//                     <a
//                         onClick={handleLogoClick}
//                         className="cursor-pointer"
//                     >
//                         <img src={logo} alt="Logo" className="w-40 lg:w-48" />
//                     </a>
//                 </div>
//                 <div className="navbar-center hidden md:flex">
//                     <ul className="flex items-center gap-6 lg:gap-10 lg:text-lg cursor-pointer">
//                         {navLinksStyle}
//                     </ul>
//                 </div>
//                 <div className="navbar-end lg:pr-2">
//                     {/* Mobile menu button */}
//                     <div className="dropdown md:hidden">
//                         <div tabIndex={0} role="button" className="btn btn-ghost pr-0.5" onClick={toggleDropdown}>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         {dropdownOpen && (
//                             <>
//                                 <ul
//                                     tabIndex={0}
//                                     className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-[1] p-4 shadow space-y-5 font-bold"
//                                     style={{ height: "50vh" }}
//                                 >
//                                     {navLinksStyle}
//                                 </ul>
//                                 <div
//                                     role="button"
//                                     className="fixed top-4 right-5 z-[2] cursor-pointer"
//                                     onClick={toggleDropdown}
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-6 w-6"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </div>
//                             </>
//                         )}
//                     </div>

//                     {/* Resume button */}
//                     <a
//                         href="/resume.pdf"
//                         download="Resume by Ashraful Islam Ratul.pdf"
//                         className="hidden md:inline-flex items-center gap-2 relative px-3 py-1.5 rounded-lg overflow-hidden bg-blue-600 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]"
//                     >
//                         <Download size={16} className="relative z-10" />
//                         <span className="relative z-10">Resume</span>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;







// Smooth scrolling to home
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import logo from '../../src/assets/logo2.png';

// const Navbar = () => {
//     const [activeSection, setActiveSection] = useState("");
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Define nav items with support for both section scrolling and route paths
//     const navItems = [
//         { id: "home", label: "Home", path: "/", isSection: true },
//         { id: "about", label: "About", path: "/", isSection: true },
//         { id: "skills", label: "Skills", path: "/", isSection: true },
//         { id: "projects", label: "Projects", path: "/", isSection: true },
//         { id: "contact", label: "Contact", path: "/", isSection: true },
//         // ...(user ? [{ id: "dashboard", label: "Dashboard", path: "/dashboard", isSection: false }] : []),
//         // ...(!user ? [{ id: "login", label: "Login", path: "/login", isSection: false }] : [])
//     ];

//     useEffect(() => {
//         if (location.pathname !== "/") {
//             setActiveSection("");
//             return;
//         }

//         const sections = document.querySelectorAll("section");
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         setActiveSection(entry.target.id);
//                     }
//                 });
//             },
//             { threshold: 0.5 }
//         );

//         sections.forEach((section) => observer.observe(section));

//         return () => observer.disconnect();
//     }, [location.pathname]);

//     const scrollToSection = (id) => {
//         navigate("/");

//         setTimeout(() => {
//             const element = document.getElementById(id);
//             if (element) {
//                 window.scrollTo({
//                     top: element.offsetTop - 70,
//                     behavior: "smooth",
//                 });
//             }
//         }, 100);
//     };

//     const handleSectionClick = (id, path, isSection) => {
//         if (isSection) {
//             if (location.pathname === "/") {
//                 scrollToSection(id);
//             } else {
//                 scrollToSection(id);
//             }
//         } else {
//             navigate(path);
//         }
//         setDropdownOpen(false);
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     // Check if a nav item is active
//     const isItemActive = (item) => {
//         if (item.isSection) {
//             return location.pathname === "/" && activeSection === item.id;
//         }
//         return location.pathname === item.path;
//     };

//     // Single navLinksStyle using map
//     const navLinksStyle = (
//         <>
//             {navItems.map((item) => (
//                 <li key={item.id} className="text-center group">
//                     <a
//                         onClick={() => handleSectionClick(item.id, item.path, item.isSection)}
//                         className={`relative inline-block pb-1 transition-colors duration-300 cursor-pointer
//                             ${isItemActive(item)
//                                 ? "text-blue-600 font-semibold"
//                                 : "text-gray-700 hover:text-blue-600"
//                             }`}
//                     >
//                         {item.label}
//                         <span className={`absolute left-1/2 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 ease-out
//                             ${isItemActive(item)
//                                 ? 'w-full -translate-x-1/2 opacity-100'
//                                 : 'w-0 -translate-x-1/2 opacity-0 group-hover:bg-gradient-to-l group-hover:w-full group-hover:opacity-100'
//                             }`} />
//                     </a>
//                 </li>
//             ))}
//         </>
//     );

//     return (
//         <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
//             <div className="navbar container max-w-7xl mx-auto px-3 lg:px-2 lg:py-0">
//                 <div className="navbar-start">
//                     <a
//                         onClick={() => handleSectionClick("home", "/", true)}
//                         className="cursor-pointer"
//                     >
//                         <img src={logo} alt="" className="w-40 lg:w-48" />
//                     </a>
//                 </div>
//                 <div className="navbar-center hidden md:flex">
//                     <ul className="flex items-center gap-6 lg:gap-10 lg:text-lg cursor-pointer">
//                         {navLinksStyle}
//                     </ul>
//                 </div>
//                 <div className="navbar-end lg:pr-2">
//                     {/* Mobile menu button */}
//                     <div className="dropdown md:hidden">
//                         <div tabIndex={0} role="button" className="btn btn-ghost pr-0.5" onClick={toggleDropdown}>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         {dropdownOpen && (
//                             <>
//                                 <ul
//                                     tabIndex={0}
//                                     className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-[1] p-4 shadow space-y-5 font-bold"
//                                     style={{ height: "50vh" }}
//                                 >
//                                     {navLinksStyle}
//                                 </ul>
//                                 <div
//                                     role="button"
//                                     className="fixed top-4 right-5 z-[2] cursor-pointer"
//                                     onClick={toggleDropdown}
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-6 w-6"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </div>
//                             </>
//                         )}
//                     </div>

//                     {/* Resume button */}
//                     <a
//                         href="/resume.pdf"
//                         download="Resume by Ashraful Islam Ratul.pdf"
//                         className="hidden md:inline-block relative px-3 py-1.5 rounded-lg overflow-hidden bg-blue-600 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]"
//                     >
//                         <span className="relative z-10">Resume</span>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;