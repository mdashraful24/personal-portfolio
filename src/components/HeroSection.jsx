import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
// import img from '../../src/assets/picture.jpg';
import img from '../../src/assets//image/img.png';

const HeroSection = () => {
    return (
        <div className="container mx-auto px-5 pt-10 md:py-20 lg:py-32">
            <div className="flex flex-col-reverse md:flex-row items-center md:justify-around lg:justify-center gap-5">
                {/* left side */}
                <div className="md:w-1/2 text-center md:text-left space-y-5 md:space-y-7">
                    <div className="space-y-3">
                        <h1 className="text-3xl md:text-5xl font-bold">Hi, I'm Ashraful Islam Ratul</h1>
                        <p>Web developer</p>
                        <p>A web developer create a modern website.</p>
                    </div>

                    <div>
                        {/* resume button */}
                        <a
                            href="/resume.pdf"
                            download="Resume_Ashraful_Islam_Ratul.pdf"
                            className="btn bg-blue-600 text-lg font-medium px-5 py-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            Resume
                        </a>
                    </div>

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
                </div>

                {/* right side */}
                <div>
                    <img
                        src={img}
                        alt="Your Name"
                        className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-lg object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
