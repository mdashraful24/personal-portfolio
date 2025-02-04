import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import img from '../../src/assets/picture.jpg'
import { IoMail } from "react-icons/io5";

const HeroSection = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-10 lg:gap-0 justify-center text-center lg:text-left px-5 pt-20 md:pt-36 pb-20">
            {/* Left Side - Text */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
            >
                <div className="text-2xl md:text-4xl font-bold space-y-2">
                    <h1>Hi, </h1>
                    <h1>
                        I&apos;m <span className="text-blue-600">Ashraful Islam Ratul</span>
                    </h1>
                </div>
                <p className="mt-4 text-lg text-gray-500">
                    A Web Developer building modern & scalable digital experiences with
                    <span className="font-semibold text-blue-600"> React.js</span>,
                    <span className="font-semibold text-green-500"> Node.js</span>, and
                    <span className="font-semibold text-purple-500"> JavaScript</span>.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex gap-4 justify-center lg:justify-start">
                    {/* View Projects Button */}
                    <a
                        href="#projects"
                        className="btn btn-lg relative overflow-hidden bg-blue-600 text-white text-lg font-medium transition-all duration-300 ease-in-out
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0"
                    >
                        <span className="relative z-10">View Projects</span>
                    </a>

                    {/* Hire Me Button */}
                    <a
                        href="#contact"
                        className="btn btn-lg relative overflow-hidden border border-blue-600 text-blue-600 text-lg font-medium transition-all duration-300 ease-in-out
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:to-blue-700 before:transition-all before:duration-500 before:-translate-x-full hover:text-white hover:before:translate-x-0 before:z-0"
                    >
                        <span className="relative z-10">Hire Me</span>
                    </a>
                </div>

                {/* Social Icons */}
                <div className="mt-6 flex gap-6 justify-center lg:justify-start">
                    <a href="https://github.com/yourusername" target="_blank">
                        <FaGithub className="text-2xl hover:text-gray-900 transition" />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank">
                        <FaLinkedin className="text-2xl hover:text-blue-600 transition" />
                    </a>
                    <a href="https://twitter.com/yourusername" target="_blank">
                        <FaFacebook className="text-2xl hover:text-blue-500 transition" />
                    </a>
                    <a href="https://mail.google.com/mail/u/1/#inbox?compose=new" target="_blank">
                        <IoMail className="text-2xl hover:text-red-600 transition" />
                    </a>
                </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-8 md:mt-0 md:ml-16"
            >
                <img
                    src={img}
                    alt="Your Name"
                    className="w-60 h-60 lg:w-96 lg:h-96 rounded-full shadow-lg object-cover"
                />
            </motion.div>
        </div>
    );
};

export default HeroSection;
