import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import img from '../../src/assets//image/img.png';

const HeroSection = ({ onHireMeClick }) => {
    return (
        <div className="container mx-auto px-5 pt-10 md:py-24 lg:pt-28 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col-reverse md:flex-row items-center md:justify-around lg:justify-center gap-5 pb-10">
                {/* left side */}
                <div className="md:w-1/2 text-center md:text-left space-y-5 md:space-y-7">
                    <div>
                        <div className="font-bold space-y-2 lg:space-y-4">
                            <h1 className="text-xl md:text-2xl lg:text-4xl">
                                Hi, I'm Ashraful Islam Ratul
                            </h1>
                            <h3 className="text-xl">Web Developer</h3>
                        </div>
                    </div>
                    <p className="md:text-lg md:my-5">A web developer creates modern websites.</p>

                    {/* Social Icons */}
                    <div className="flex justify-center md:justify-start items-center gap-6">
                        <a href="https://github.com/mdashraful24" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-2xl hover:text-gray-900 transition" />
                        </a>
                        <a href="https://www.linkedin.com/in/ashraful-islam-ratul/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-2xl hover:text-blue-600 transition" />
                        </a>
                        <a href="https://www.facebook.com/ashraful.islam.ratul2k" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-2xl hover:text-blue-500 transition" />
                        </a>
                    </div>

                    <div className="flex justify-center md:justify-start gap-5">
                        {/* resume button */}
                        <a
                            href="/resume.pdf"
                            download="Resume_Ashraful_Islam_Ratul.pdf"
                            className="btn bg-blue-600 text-lg font-medium px-5 py-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            Resume
                        </a>
                        <a
                            onClick={onHireMeClick}  // Call the function here
                            className="btn bg-blue-600 text-lg font-medium px-5 py-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            Hire Me
                        </a>
                    </div>
                </div>

                {/* right side */}
                <div className="w-60 h-full md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <img
                        src={img}
                        alt="Your Name"
                        className="relative w-full h-full object-cover rounded-full shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                </div>
                {/* <div className="relative w-60 h-full md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <div className="absolute inset-0 bg-blue-500 rounded-[30%] rotate-12"></div>
                    <img
                        src={img}
                        alt="Your Name"
                        className="relative w-full h-full object-cover rounded-full shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                </div> */}
            </div>
        </div>
    );
};

export default HeroSection;
