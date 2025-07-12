import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../src/assets/logo2.png';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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

    const scrollToSection = (id) => {
        navigate("/");

        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 70,
                    behavior: "smooth",
                });
            }
        }, 100);
    };

    const handleSectionClick = (id) => {
        if (location.pathname === "/") {
            scrollToSection(id);
        } else {
            scrollToSection(id);
        }
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navLinks = (
        <>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("home")}
                    className={location.pathname === "/" && activeSection === "home" ? "md:text-blue-500 md:font-bold" : ""}
                >
                    Home
                </a>
            </li>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("about")}
                    className={location.pathname === "/" && activeSection === "about" ? "md:text-blue-500 md:font-bold" : ""}
                >
                    About
                </a>
            </li>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("skills")}
                    className={location.pathname === "/" && activeSection === "skills" ? "md:text-blue-500 md:font-bold" : ""}
                >
                    Skills
                </a>
            </li>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("projects")}
                    className={location.pathname === "/" && activeSection === "projects" ? "md:text-blue-500 md:font-bold" : ""}
                >
                    Projects
                </a>
            </li>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("contact")}
                    className={location.pathname === "/" && activeSection === "contact" ? "md:text-blue-500 md:font-bold" : ""}
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
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden" onClick={toggleDropdown}>
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
                        {dropdownOpen && (
                            <>
                                <ul
                                    tabIndex={0}
                                    className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-[1] p-4 shadow space-y-5 font-bold"
                                    style={{ height: "50vh" }}
                                >
                                    {navLinks}
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
                    <a onClick={() => handleSectionClick("home")}>
                        <img src={logo} alt="" className="w-32 lg:w-52" />
                    </a>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1 lg:text-lg">{navLinks}</ul>
                </div>
                <div className="navbar-end md:pr-3 lg:mr-0">
                    <a
                        href="/resume.pdf"
                        download="Resume_Ashraful_Islam_Ratul.pdf"
                        className="bg-blue-600 md:text-lg font-medium px-3 lg:px-5 py-1 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Resume
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
