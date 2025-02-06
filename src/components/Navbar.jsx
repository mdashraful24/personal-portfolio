// import React, { useEffect, useState } from "react";
// import DarkLightTheme from "../shared/DarkLightTheme";

// const Navbar = () => {
//     const [activeSection, setActiveSection] = useState("");

//     // Detect which section is in view using IntersectionObserver
//     useEffect(() => {
//         const sections = document.querySelectorAll("section");
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         setActiveSection(entry.target.id); // Update active section
//                     }
//                 });
//             },
//             {
//                 threshold: 0.5, // Trigger when 50% of the section is in view
//             }
//         );

//         sections.forEach((section) => observer.observe(section));

//         return () => observer.disconnect();
//     }, []);

//     const scrollToSection = (id) => {
//         const element = document.getElementById(id);
//         if (element) {
//             window.scrollTo({
//                 top: element.offsetTop - 70, // Adjust for navbar height
//                 behavior: "smooth",
//             });
//         }
//     };

//     // Links with active class based on current section
//     const navLinks = (
//         <>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("/")}
//                     className={activeSection === "/" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     Home
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("about")}
//                     className={activeSection === "about" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     About
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("skills")}
//                     className={activeSection === "skills" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     Skills
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("projects")}
//                     className={activeSection === "projects" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     Projects
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("contact")}
//                     className={activeSection === "contact" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     Contact
//                 </a>
//             </li>
//         </>
//     );

//     return (
//         <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
//             <div className="navbar container mx-auto">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor">
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//                             {navLinks}
//                         </ul>
//                     </div>
//                     <a className="btn btn-ghost text-xl">daisyUI</a>
//                 </div>
//                 <div className="navbar-center hidden md:flex">
//                     <ul className="menu menu-horizontal px-1 text-lg">
//                         {navLinks}
//                     </ul>
//                 </div>
//                 <div className="navbar-end gap-5">
//                     {/* Resume Button */}
//                     <a
//                         href="/resume.pdf"
//                         download="Resume_Ashraful_Islam_Ratul.pdf"
//                         className="btn bg-blue-600 md:text-lg font-medium px-3 py-1 md:px-5 md:py-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                     >
//                         Resume
//                     </a>

//                     <span><DarkLightTheme /></span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;





// Final
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import DarkLightTheme from "../shared/DarkLightTheme";

// const Navbar = () => {
//     const [activeSection, setActiveSection] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation();

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
//     }, [location.pathname]); // Run effect when route changes

//     const scrollToSection = (id) => {
//         if (id === "home") {
//             if (location.pathname !== "/") {
//                 navigate("/");
//             } else {
//                 window.scrollTo({
//                     top: 0,
//                     behavior: "smooth",
//                 });
//                 setActiveSection("home");
//             }
//         } else {
//             const element = document.getElementById(id);
//             if (element) {
//                 window.scrollTo({
//                     top: element.offsetTop - 70,
//                     behavior: "smooth",
//                 });
//             }
//         }
//     };


//     const navLinks = (
//         <>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("home")}
//                     className={location.pathname === "/" && activeSection === "home" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     Home
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("about")}
//                     className={location.pathname === "/" && activeSection === "about" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     About
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("skills")}
//                     className={location.pathname === "/" && activeSection === "skills" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     Skills
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("projects")}
//                     className={location.pathname === "/" && activeSection === "projects" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     Projects
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("contact")}
//                     className={location.pathname === "/" && activeSection === "contact" ? "lg:text-blue-500 lg:font-bold" : ""}
//                 >
//                     Contact
//                 </a>
//             </li>
//         </>
//     );

//     return (
//         <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
//             <div className="navbar container mx-auto">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//                             {navLinks}
//                         </ul>
//                     </div>
//                     <a className="btn btn-ghost text-xl">daisyUI</a>
//                 </div>
//                 <div className="navbar-center hidden md:flex">
//                     <ul className="menu menu-horizontal px-1 text-lg">{navLinks}</ul>
//                 </div>
//                 <div className="navbar-end gap-5">
//                     <a
//                         href="/resume.pdf"
//                         download="Resume_Ashraful_Islam_Ratul.pdf"
//                         className="btn bg-blue-600 md:text-lg font-medium px-3 py-1 md:px-5 md:py-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                     >
//                         Resume
//                     </a>
//                     <span>
//                         <DarkLightTheme />
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;




import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DarkLightTheme from "../shared/DarkLightTheme";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/") {
            setActiveSection("");  // Reset active section when not on the homepage
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

    const scrollToSection = (id) => {
        // Navigate to home page first
        navigate("/");

        // Wait for the page to load, then scroll to the section
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 50, // Adjusted for navbar height
                    behavior: "smooth",
                });
            }
        }, 100);  // Adjust delay if necessary to ensure proper scroll after navigation
    };

    const handleSectionClick = (id) => {
        // If we are already on the homepage, scroll to the section immediately
        if (location.pathname === "/") {
            scrollToSection(id);
        } else {
            // Otherwise, navigate to the homepage first and then scroll
            scrollToSection(id);
        }
    };

    const navLinks = (
        <>
            <li>
                <a
                    onClick={() => handleSectionClick("home")}
                    className={location.pathname === "/" && activeSection === "home" ? "lg:text-blue-500 lg:font-bold" : ""}
                >
                    Home
                </a>
            </li>
            <li>
                <a
                    onClick={() => handleSectionClick("about")}
                    className={location.pathname === "/" && activeSection === "about" ? "lg:text-blue-500 lg:font-bold" : ""}
                >
                    About
                </a>
            </li>
            <li>
                <a
                    onClick={() => handleSectionClick("skills")}
                    className={location.pathname === "/" && activeSection === "skills" ? "lg:text-blue-500 lg:font-bold" : ""}
                >
                    Skills
                </a>
            </li>
            <li>
                <a
                    onClick={() => handleSectionClick("projects")}
                    className={location.pathname === "/" && activeSection === "projects" ? "lg:text-blue-500 lg:font-bold" : ""}
                >
                    Projects
                </a>
            </li>
            <li>
                <a
                    onClick={() => handleSectionClick("contact")}
                    className={location.pathname === "/" && activeSection === "contact" ? "lg:text-blue-500 lg:font-bold" : ""}
                >
                    Contact
                </a>
            </li>
        </>
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
            <div className="navbar container max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1 text-lg">{navLinks}</ul>
                </div>
                <div className="navbar-end gap-5">
                    <a
                        href="/resume.pdf"
                        download="Resume_Ashraful_Islam_Ratul.pdf"
                        className="bg-blue-600 md:text-lg font-medium px-3 md:px-5 py-1.5 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Resume
                    </a>
                    <span>
                        <DarkLightTheme />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
