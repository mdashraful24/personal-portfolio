import { FaDownload, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import img from '../../src/assets//image/img.png';

const HeroSection = ({ onHireMeClick }) => {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 lg:h-[calc(100vh-4rem)]">
            <div className="container mx-auto px-4 py-10 md:py-20 lg:py-0">
                <div className="flex flex-col-reverse md:flex-row lg:h-[calc(100vh-4rem)] items-center md:justify-around lg:justify-center gap-5 lg:gap-24">
                    {/* left side */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <div>
                            <div className="space-y-2 lg:space-y-4">
                                <h1 className="text-2xl lg:text-4xl font-bold">
                                    Hi, I'm Ashraful Islam Ratul
                                </h1>
                                <h3 className="text-lg lg:text-2xl font-medium">Web Developer</h3>
                            </div>
                        </div>
                        <p className="w-full max-w-xl mt-5 mb-8">Passionate Web Developer dedicated to building responsive, user-friendly, and efficient web applications using the latest technologies.</p>
                        {/* <p className="md:text-lg md:my-5">A web developer creates modern websites.</p> */}

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-5 mb-8">
                            <a
                                href="/CV by Ashraful Islam Ratul.pdf"
                                download="CV by Ashraful Islam Ratul.pdf"
                                className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg overflow-hidden bg-blue-600 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <FaDownload />
                                    Download CV
                                </span>
                            </a>
                            <button
                                onClick={onHireMeClick}
                                className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors active:scale-[0.98]"
                            >
                                Hire Me
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center md:justify-start gap-5">
                            <a
                                href="https://github.com/mdashraful24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow"
                            >
                                <FaGithub className="text-2xl" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ashraful-islam-ratul/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow"
                            >
                                <FaLinkedin className="text-2xl text-blue-700" />
                            </a>
                            <a
                                href="https://www.facebook.com/ashraful.islam.ratul2k"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow"
                            >
                                <FaFacebook className="text-2xl text-blue-700" />
                            </a>
                        </div>
                    </div>

                    {/* right side */}
                    <div className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full">
                        <img
                            src={img}
                            alt="Your Name"
                            className="w-full h-full object-cover rounded-full shadow-2xl transition-transform duration-300"
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
        </div>
    );
};

export default HeroSection;
