// import img from '../../src/assets/image/image2.png';

const AboutMe = () => {
    return (
        <div className="container max-w-5xl mx-auto px-5 py-16 md:py-24">
            <div className="mx-auto text-center space-y-5">
                <h1 className="text-3xl md:text-4xl font-bold">
                    About Me
                </h1>
                <div className="text-lg space-y-5">
                    <p className="md:text-justify leading-relaxed">
                        I am a passionate web developer with expertise in <span className="font-semibold">HTML, CSS, JavaScript, React.js, Tailwind CSS, Node.js, Express.js, and MongoDB (Atlas).</span> I have completed 20+ projects, building dynamic and scalable web applications. Currently, I am mastering <span className="font-semibold text-blue-600">Next.js</span> to build high-performance full-stack applications. Alongside my development work, I am a final-year B.Sc. Engineering student at Daffodil International University, specializing in Information and Communication Engineering.
                    </p>
                    <p className="md:text-justify leading-relaxed">
                        My programming journey began in 2022 with C and C++, but in 2024, I fully dived into web development, where I discovered my passion for creating interactive and scalable applications. Because development is my goal. I enjoy working on challenging and interesting projects, always striving to improve performance and user experience.
                    </p>
                    <p className="md:text-justify leading-relaxed">
                        Beyond coding, I love playing Cricket and exploring new places, which keep me refreshed and inspired. I believe in continuous learning, as every day offers new opportunities to improve and explore emerging technologies. My goal is to craft seamless, user-friendly applications that solve real-world problems. 🚀
                    </p>
                </div>
            </div>

            {/* <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-10 lg:gap-16">
                Left Side
                <div className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <img
                        src={img}
                        alt="ratul"
                        className="relative w-full h-full object-cover rounded-full shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                </div>

                Right Side
                <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        About Me
                    </h1>
                    <p className="text-justify leading-relaxed">
                        I am a passionate web developer with expertise in <span className="font-semibold">HTML, CSS, JavaScript, React.js, Tailwind CSS, Node.js, Express.js, and MongoDB (Atlas).</span> Currently, I am mastering <span className="font-semibold text-blue-600">Next.js</span> to build high-performance full-stack applications. Alongside my development work, I am a final-year B.Sc. Engineering student at Daffodil International University, specializing in Information and Communication Engineering.
                    </p>
                    <p className="text-justify leading-relaxed">
                        My programming journey began in 2022 with C and C++, but in 2024, I fully dived into web development, where I discovered my passion for creating interactive and scalable applications. Because development is my goal. I enjoy working on challenging and interesting projects, always striving to improve performance and user experience.
                    </p>
                    <p className="text-justify leading-relaxed">
                        Beyond coding, I love playing Cricket and exploring new places, which keep me refreshed and inspired. I believe in continuous learning, as every day offers new opportunities to improve and explore emerging technologies. My goal is to craft seamless, user-friendly applications that solve real-world problems. 🚀
                    </p>
                </div>
            </div> */}
        </div>
    );
};

export default AboutMe;
