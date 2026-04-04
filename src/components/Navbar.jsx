import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../src/assets/logo2.png';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Define nav items with support for both section scrolling and route paths
    const navItems = [
        { id: "home", label: "Home", path: "/", isSection: true },
        { id: "about", label: "About", path: "/", isSection: true },
        { id: "skills", label: "Skills", path: "/", isSection: true },
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
                    // Instant scroll without smooth behavior
                    window.scrollTo(0, element.offsetTop - 70);
                }
            }
        }, 100);
    };

    const handleSectionClick = (id, path, isSection) => {
        if (isSection) {
            if (location.pathname === "/") {
                scrollToSection(id, true); // Smooth scroll for nav items
            } else {
                scrollToSection(id, true); // Smooth scroll for nav items
            }
        } else {
            navigate(path);
        }
        setDropdownOpen(false);
    };

    // Special handler for logo click - instant scroll
    const handleLogoClick = () => {
        if (location.pathname === "/") {
            const element = document.getElementById("home");
            if (element) {
                window.scrollTo(0, element.offsetTop - 70); // Instant scroll
            }
        } else {
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById("home");
                if (element) {
                    window.scrollTo(0, element.offsetTop - 70); // Instant scroll
                }
            }, 100);
        }
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Check if a nav item is active
    const isItemActive = (item) => {
        if (item.isSection) {
            return location.pathname === "/" && activeSection === item.id;
        }
        return location.pathname === item.path;
    };

    // Single navLinksStyle using map
    const navLinksStyle = (
        <>
            {navItems.map((item) => (
                <li key={item.id} className="text-center group">
                    <a
                        onClick={() => handleSectionClick(item.id, item.path, item.isSection)}
                        className={`relative inline-block pb-1 transition-colors duration-300 cursor-pointer
                            ${isItemActive(item)
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                            }`}
                    >
                        {item.label}
                        <span className={`absolute left-1/2 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 ease-out
                            ${isItemActive(item)
                                ? 'w-full -translate-x-1/2 opacity-100'
                                : 'w-0 -translate-x-1/2 opacity-0 group-hover:bg-gradient-to-l group-hover:w-full group-hover:opacity-100'
                            }`} />
                    </a>
                </li>
            ))}
        </>
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
            <div className="navbar container max-w-7xl mx-auto px-3 lg:px-2 lg:py-0">
                <div className="navbar-start">
                    <a
                        onClick={handleLogoClick}
                        className="cursor-pointer"
                    >
                        <img src={logo} alt="Logo" className="w-40 lg:w-48" />
                    </a>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="flex items-center gap-6 lg:gap-10 lg:text-lg cursor-pointer">
                        {navLinksStyle}
                    </ul>
                </div>
                <div className="navbar-end lg:pr-2">
                    {/* Mobile menu button */}
                    <div className="dropdown md:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost pr-0.5" onClick={toggleDropdown}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        {dropdownOpen && (
                            <>
                                <ul
                                    tabIndex={0}
                                    className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-[1] p-4 shadow space-y-5 font-bold"
                                    style={{ height: "50vh" }}
                                >
                                    {navLinksStyle}
                                </ul>
                                <div
                                    role="button"
                                    className="fixed top-4 right-5 z-[2] cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Resume button */}
                    <a
                        href="/resume.pdf"
                        download="Resume by Ashraful Islam Ratul.pdf"
                        className="hidden md:inline-block relative px-3 py-1.5 rounded-lg overflow-hidden bg-blue-600 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]"
                    >
                        <span className="relative z-10">Resume</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;







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