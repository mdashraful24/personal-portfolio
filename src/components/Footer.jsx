// import logo from '../../src/assets/logo2.png'
import { ArrowDownRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black p-4">
            <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 lg:px-4">
                {/* Copyright */}
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()}. All rights reserved.
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-8 text-white">
                    <a
                        href="https://www.linkedin.com/in/ashraful-islam-ratul/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        LinkedIn <ArrowDownRight size={20} className="-rotate-90" />
                    </a>
                    <a
                        href="https://github.com/mdashraful24"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        Github <ArrowDownRight size={20} className="-rotate-90" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;





// import { FaFacebook, FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
// import logo from '../../src/assets/logo2.png'

// const Footer = () => {
//     const currentYear = new Date().getFullYear();

//     const scrollToSection = (sectionId) => {
//         const element = document.getElementById(sectionId);
//         if (element) {
//             const offset = 70; // Navbar height
//             const elementPosition = element.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - offset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: "smooth"
//             });
//         }
//     };

//     // Handle logo click - scroll to home
//     const handleLogoClick = () => {
//         const homeElement = document.getElementById("home");
//         if (homeElement) {
//             const offset = 70;
//             const elementPosition = homeElement.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - offset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: "smooth"
//             });
//         }
//     };

//     const navLinks = [
//         { name: "Home", id: "home" },
//         { name: "About", id: "about" },
//         { name: "Skills", id: "skills" },
//         { name: "Projects", id: "projects" },
//         { name: "Contact", id: "contact" },
//     ];

//     return (
//         <footer className="bg-gray-900 dark:bg-black text-gray-300">
//             {/* Main Footer Content */}
//             <div className="max-w-7xl mx-auto px-4 p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                     {/* Brand Column */}
//                     <div className="col-span-1 md:col-span-1">
//                         <div className="mb-4">
//                             {/* Logo with click handler */}
//                             <div
//                                 onClick={handleLogoClick}
//                                 className="mb-3 cursor-pointer inline-block hover:opacity-80 transition-opacity duration-300"
//                             >
//                                 <img src={logo} alt="ratul" className="w-28 rounded-md" />
//                             </div>
//                             {/* <p className="text-sm text-gray-400 leading-relaxed">
//                                 Full-stack developer passionate about building elegant web applications and solving real-world problems through code.
//                             </p> */}
//                             <p className="text-sm text-gray-400 leading-relaxed">
//                                 Software Engineer passionate about building elegant web applications and solving real-world problems through code.
//                             </p>
//                         </div>
//                         {/* Social Icons */}
//                         <div className="flex gap-3 mt-4">
//                             <a
//                                 href="https://github.com/mdashraful24"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
//                                 aria-label="GitHub"
//                             >
//                                 <FaGithub className="text-lg text-gray-300 hover:text-white" />
//                             </a>
//                             <a
//                                 href="https://www.linkedin.com/in/ashraful-islam-ratul/"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
//                                 aria-label="LinkedIn"
//                             >
//                                 <FaLinkedin className="text-lg text-blue-400 hover:text-blue-500" />
//                             </a>
//                             <a
//                                 href="https://www.facebook.com/ashraful.islam.ratul2k"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
//                                 aria-label="Facebook"
//                             >
//                                 <FaFacebook className="text-lg text-blue-400 hover:text-blue-500" />
//                             </a>
//                         </div>
//                     </div>

//                     {/* Quick Links Column */}
//                     <div className="col-span-1">
//                         <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
//                             Quick Links
//                             <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
//                         </h3>
//                         <ul className="grid grid-cols-5 md:grid-cols-3 gap-3">
//                             {navLinks.map((link) => (
//                                 <li key={link.id}>
//                                     <button
//                                         onClick={() => scrollToSection(link.id)}
//                                         className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm cursor-pointer"
//                                     >
//                                         {link.name}
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Contact Info Column */}
//                     <div className="col-span-1">
//                         <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
//                             Contact Me
//                             <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
//                         </h3>
//                         <div className="space-y-3">
//                             <div className="flex items-center gap-3 text-sm text-gray-400 break-all">
//                                 <FaEnvelope className="text-blue-500 flex-shrink-0" />
//                                 <a href="mailto:mdashrafulislam2882@gmail.com" className="hover:text-blue-400 transition-colors break-all">
//                                     mdashrafulislam2882@gmail.com
//                                 </a>
//                             </div>
//                             <div className="flex items-center gap-3 text-sm text-gray-400">
//                                 <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
//                                 <span>Dhaka, Bangladesh</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Newsletter / CTA Column */}
//                     <div className="col-span-1">
//                         <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
//                             Let's Connect
//                             <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
//                         </h3>
//                         <p className="text-sm text-gray-400 mb-4">
//                             Open for collaborations and opportunities. Feel free to reach out!
//                         </p>
//                         <a
//                             href="#contact"
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 scrollToSection("contact");
//                             }}
//                             className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
//                         >
//                             Get in Touch
//                         </a>
//                     </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t border-gray-800 my-5"></div>

//                 {/* Copyright Section */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
//                     <p>
//                         © {currentYear} Ashraful Islam. All rights reserved.
//                     </p>
//                     <p className="flex items-center gap-1">
//                         Made with <FaHeart className="text-red-500 text-xs" /> in Bangladesh
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;