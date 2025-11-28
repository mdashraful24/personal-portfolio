import { FaDownload, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import img from '../../src/assets//image/img.png';

const HeroSection = ({ onHireMeClick }) => {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-3 pt-10 md:py-40">
                <div className="flex flex-col-reverse md:flex-row items-center md:justify-around lg:justify-center gap-5 lg:gap-24 pb-10">
                    {/* left side */}
                    <div className="md:w-1/2 text-center md:text-left space-y-5 md:space-y-7">
                        <div>
                            <div className="font-bold space-y-2 lg:space-y-4">
                                <h1 className="text-2xl lg:text-4xl">
                                    Hi, I'm Ashraful Islam Ratul
                                </h1>
                                <h3 className="text-xl lg:text-2xl">Web Developer</h3>
                            </div>
                        </div>
                        <p className="w-full max-w-xl md:my-5">Passionate Web Developer dedicated to building responsive, user-friendly, and efficient web applications using the latest technologies.</p>
                        {/* <p className="md:text-lg md:my-5">A web developer creates modern websites.</p> */}

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-5 mb-8">
                            <a
                                href="/CV by Ashraful Islam Ratul.pdf"
                                download="CV by Ashraful Islam Ratul.pdf"
                                className="group flex items-center gap-2 px-4 py-2 bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors relative overflow-hidden active:scale-[0.98]"
                            >
                                <span
                                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none"
                                />
                                <FaDownload />
                                Download CV
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
