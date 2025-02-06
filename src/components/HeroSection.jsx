import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
// import img from '../../src/assets/picture.jpg';
import img from '../../src/assets//image/img.png';

// const HeroSection = () => {
//     return (
//         <div className="container mx-auto px-5 pt-10 md:py-20 lg:py-32">
//             <div className="flex flex-col-reverse md:flex-row items-center md:justify-around lg:justify-center gap-5">
//                 {/* left side */}
//                 <div className="md:w-1/2 text-center md:text-left space-y-5 md:space-y-7">
//                     <div className="space-y-3">
//                         <h1 className="text-3xl md:text-5xl font-bold leading-10 md:leading-16">Hello, I'm Ashraful Islam. <br className="hidden lg:block" /> I'm Web Developer</h1>
//                         <p>A web developer create a modern website.</p>
//                     </div>

//                     {/* Social Icons */}
//                     <div className="flex justify-center md:justify-start items-center gap-6">
//                         <a href="https://github.com/mdashraful24" target="_blank" rel="noopener noreferrer">
//                             <FaGithub className="text-2xl hover:text-gray-900 transition" />
//                         </a>
//                         <a href="https://www.linkedin.com/in/ashraful-islam-ratul/" target="_blank" rel="noopener noreferrer">
//                             <FaLinkedin className="text-2xl hover:text-blue-600 transition" />
//                         </a>
//                         <a href="https://www.facebook.com/ashraful.islam.ratul2k" target="_blank" rel="noopener noreferrer">
//                             <FaFacebook className="text-2xl hover:text-blue-500 transition" />
//                         </a>
//                     </div>

//                     <div className="flex gap-5">
//                         {/* resume button */}
//                         <a
//                             href="/resume.pdf"
//                             download="Resume_Ashraful_Islam_Ratul.pdf"
//                             className="btn bg-blue-600 text-lg font-medium px-5 py-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                         >
//                             Resume
//                         </a>
//                         <a
//                             id="contact"
//                             download="Resume_Ashraful_Islam_Ratul.pdf"
//                             className="btn bg-blue-600 text-lg font-medium px-5 py-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                         >
//                             Hire Me
//                         </a>
//                     </div>
//                 </div>

//                 {/* right side */}
//                 <div className="relative w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96">
//                     <div className="absolute inset-0 bg-blue-500 rounded-[30%] rotate-12"></div>
//                     <img
//                         src={img}
//                         alt="Your Name"
//                         className="relative w-full h-full object-cover rounded-[30%] shadow-2xl transition-transform duration-300 hover:scale-105"
//                     />
//                 </div>
//                 {/* <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl rotate-6"></div>
//                     <img
//                         src={img}
//                         alt="Your Name"
//                         className="relative w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white transition-transform transform hover:rotate-3 hover:scale-105"
//                         style={{ clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}
//                     />
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export default HeroSection;


const HeroSection = ({ onHireMeClick }) => {
    return (
        <div className="container mx-auto px-5 pt-10 md:py-20 lg:py-32">
            <div className="flex flex-col-reverse md:flex-row items-center md:justify-around lg:justify-center gap-5">
                {/* left side */}
                <div className="md:w-1/2 text-center md:text-left space-y-5 md:space-y-7">
                    <div className="space-y-3">
                        <h1 className="text-3xl lg:text-5xl font-bold leading-10 md:leading-normal">
                            Hello, I'm Ashraful Islam. <br className="hidden lg:block" /> I'm Web Developer
                        </h1>
                        <p>A web developer creates modern websites.</p>
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
                <div className="relative w-60 h-full md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <div className="absolute inset-0 bg-blue-500 rounded-[30%] rotate-12"></div>
                    <img
                        src={img}
                        alt="Your Name"
                        className="relative w-full h-full object-cover rounded-[30%] shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
