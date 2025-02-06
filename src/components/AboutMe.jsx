import img from '../../src/assets/image/img.png';

const AboutMe = () => {
    return (
        <div className="container mx-auto px-5 py-20 lg:py-24">
            <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-10 lg:gap-16">
                {/* Left Side */}
                <div className="hidden lg:block relative w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <div className="absolute inset-0 bg-blue-500 rounded-[30%] rotate-6"></div>
                    <img
                        src={img}
                        alt="Your Name"
                        className="relative w-full h-full object-cover rounded-[30%] shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Right Side */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        About Me
                    </h1>
                    <p className="text-lg text-gray-600 text-justify leading-relaxed">
                        I am a skilled web developer in <span className="font-semibold">HTML, CSS, JavaScript, React.js, Tailwind CSS, Node.js, MongoDB, and Express.js.</span> Currently, I am focused on learning and mastering the <span className="font-semibold text-blue-600">Next.js</span> framework for full-stack applications. At the same time, I am a final year undergraduate B.Sc Engineering student. I also have hands-on experience building servers using Express.js and MongoDB. Passionate about crafting seamless web applications, I prioritize both design and functionality to create user-friendly experiences.
                    </p>
                    <p className="text-lg text-gray-600 text-justify leading-relaxed">
                        I believe in continuous learning, as every day offers new opportunities to improve and explore emerging technologies.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
