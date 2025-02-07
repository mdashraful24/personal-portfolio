import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../src/assets/logo2.png'

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
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
                    <a onClick={() => handleSectionClick("home")}>
                        <img src={logo} alt="" className="w-32 lg:w-52"/>
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
