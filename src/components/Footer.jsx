import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from '../../src/assets/logo2.png'

const Footer = () => {
    return (
        <footer className="bg-black text-white text-center py-5">
            <div className="flex justify-center">
                <img src={logo} alt="ratul" className="w-32 rounded-md" />
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 mt-6 text-xl">
                <a
                    href="https://github.com/mdashraful24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 bg-gray-100 rounded-lg hover:scale-110 transition-all duration-200 shadow"
                >
                    <FaGithub className="text-xl text-black" />
                </a>
                <a
                    href="https://www.linkedin.com/in/ashraful-islam-ratul/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 bg-gray-100 rounded-lg hover:scale-110 transition-all duration-200 shadow"
                >
                    <FaLinkedin className="text-xl text-blue-700" />
                </a>
                <a
                    href="https://www.facebook.com/ashraful.islam.ratul2k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 bg-gray-100 rounded-lg hover:scale-110 transition-all duration-200 shadow"
                >
                    <FaFacebook className="text-xl text-blue-700" />
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
