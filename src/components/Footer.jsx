import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from '../../src/assets/logo2.png'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center py-10 mt-10">
            <div className="flex justify-center">
                <img src={logo} alt="ratul" className="w-32 rounded-md" />
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 mt-6 text-xl">
                <a href="https://github.com/mdashraful24" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="hover:text-black cursor-pointer" />
                </a>

                <a href="https://www.linkedin.com/in/ashraful-islam-ratul/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                </a>

                <a href="https://www.facebook.com/ashraful.islam.ratul2k" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="hover:text-blue-500 cursor-pointer" />
                </a>
            </div>

            {/* Copyright */}
            <p className="mt-4 text-sm text-gray-400">
                © {new Date().getFullYear()} Ratul. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
