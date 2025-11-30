import { useEffect, useState } from "react";
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
                    className={location.pathname === "/" && activeSection === "home" ? "md:text-blue-600 md:font-bold border-b-4 border-blue-600 pb-1" : "font-medium"}
                >
                    Home
                </a>
            </li>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("about")}
                    className={location.pathname === "/" && activeSection === "about" ? "md:text-blue-600 md:font-bold border-b-4 border-blue-600 pb-1" : "font-medium"}
                >
                    About
                </a>
            </li>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("skills")}
                    className={location.pathname === "/" && activeSection === "skills" ? "md:text-blue-600 md:font-bold border-b-4 border-blue-600 pb-1" : "font-medium"}
                >
                    Skills
                </a>
            </li>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("projects")}
                    className={location.pathname === "/" && activeSection === "projects" ? "md:text-blue-600 md:font-bold border-b-4 border-blue-600 pb-1" : "font-medium"}
                >
                    Projects
                </a>
            </li>
            <li className="text-center">
                <a
                    onClick={() => handleSectionClick("contact")}
                    className={location.pathname === "/" && activeSection === "contact" ? "md:text-blue-600 md:font-bold border-b-4 border-blue-600 pb-1" : "font-medium"}
                >
                    Contact
                </a>
            </li>
        </>
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
            <div className="navbar container max-w-7xl mx-auto px-3 lg:px-2 lg:py-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden pl-0" onClick={toggleDropdown}>
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
                    <a
                        onClick={() => handleSectionClick("home")}
                        className="cursor-pointer"
                    >
                        <img src={logo} alt="" className="w-36 lg:w-40" />
                    </a>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="flex items-center gap-6 lg:gap-10 lg:text-lg cursor-pointer">{navLinks}</ul>
                </div>
                <div className="navbar-end md:pr-2 lg:mr-0">
                    <a
                        href="/resume.pdf"
                        download="Resume by Ashraful Islam Ratul.pdf"
                        className="relative px-3 py-1.5 rounded-lg overflow-hidden bg-blue-600 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]">
                        <span className="relative z-10">Resume</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
