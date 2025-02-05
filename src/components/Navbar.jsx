import React, { useEffect, useState } from "react";
import DarkLightTheme from "../shared/DarkLightTheme";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");

    // Detect which section is in view using IntersectionObserver
    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id); // Update active section
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of the section is in view
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 70, // Adjust for navbar height
                behavior: "smooth",
            });
        }
    };

    // Links with active class based on current section
    const navLinks = (
        <>
            <li>
                <a
                    onClick={() => scrollToSection("#")}
                    className={activeSection === "#" ? "text-blue-500" : ""}
                >
                    Home
                </a>
            </li>
            <li>
                <a
                    onClick={() => scrollToSection("about")}
                    className={activeSection === "about" ? "text-blue-500" : ""}
                >
                    About
                </a>
            </li>
            <li>
                <a
                    onClick={() => scrollToSection("skills")}
                    className={activeSection === "skills" ? "text-blue-500" : ""}
                >
                    Skills
                </a>
            </li>
            <li>
                <a
                    onClick={() => scrollToSection("projects")}
                    className={activeSection === "projects" ? "text-blue-500" : ""}
                >
                    Projects
                </a>
            </li>
            <li>
                <a
                    onClick={() => scrollToSection("contact")}
                    className={activeSection === "contact" ? "text-blue-500" : ""}
                >
                    Contact
                </a>
            </li>
        </>
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end gap-5">
                    {/* Resume Button */}
                    <a
                        href="/resume.pdf"
                        download="Resume_Ashraful_Islam_Ratul.pdf"
                        className="btn bg-blue-600 md:text-lg font-medium px-3 py-1 md:px-5 md:py-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Resume
                    </a>

                    <span><DarkLightTheme /></span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;











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
//                     onClick={() => scrollToSection("#")}
//                     className={activeSection === "#" ? "text-blue-500" : ""}
//                 >
//                     Home
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("about")}
//                     className={activeSection === "about" ? "text-blue-500" : ""}
//                 >
//                     About
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("skills")}
//                     className={activeSection === "skills" ? "text-blue-500" : ""}
//                 >
//                     Skills
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("projects")}
//                     className={activeSection === "projects" ? "text-blue-500" : ""}
//                 >
//                     Projects
//                 </a>
//             </li>
//             <li>
//                 <a
//                     onClick={() => scrollToSection("contact")}
//                     className={activeSection === "contact" ? "text-blue-500" : ""}
//                 >
//                     Contact
//                 </a>
//             </li>
//         </>
//     );

//     return (
//         <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
//             <div className="navbar container mx-auto px-5">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost md:hidden pl-0">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
//                         >
//                             {navLinks}
//                         </ul>
//                     </div>
//                     <a className="text-2xl font-bold">Ratul</a>
//                 </div>
//                 <div className="navbar-end hidden md:block lg:flex">
//                     <ul className="menu menu-horizontal px-1">
//                         {navLinks}
//                         <div className="pl-2">
//                             <DarkLightTheme />
//                         </div>
//                     </ul>
//                 </div>
//                 <div className="navbar-end md:hidden lg:hidden">
//                     <DarkLightTheme />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
