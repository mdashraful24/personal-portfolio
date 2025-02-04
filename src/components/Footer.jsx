import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center py-10 mt-10">
            <h2 className="text-2xl font-bold">Ratul</h2>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 mt-4 text-xl">
                <a href="https://github.com/yourusername" target="_blank" className="hover:text-gray-400 transition">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" className="hover:text-blue-400 transition">
                    <FaLinkedin />
                </a>
                <a href="https://facebook.com/yourusername" target="_blank" className="hover:text-blue-500 transition">
                    <FaFacebook />
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
