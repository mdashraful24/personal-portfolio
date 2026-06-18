// import img from '../../src/assets/image/image2.png';

const AboutMe = () => {
    return (
        <div className="bg-gray-100 dark:bg-black">
            <div className="container max-w-7xl mx-auto px-4 py-7 lg:py-24">
                <div className="space-y-5">
                    <div className="flex items-center justify-center md:mb-6">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl text-center font-bold dark:text-white">
                            About Me
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <div className="md:text-lg leading-relaxed space-y-5 dark:text-gray-300">
                        <p>
                            My programming journey began in 2022 with C and C++, but in 2024 I transitioned into web development—where I discovered my passion for building interactive and scalable applications. Since then, I've focused on improving performance, scalability, and user experience through hands-on projects.
                        </p>

                        <p>
                            I am now a full-stack web developer skilled in HTML, CSS, JavaScript, TypeScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB and PostgreSQL. I've completed <strong className="text-blue-700 dark:text-blue-400">20+</strong> projects, creating responsive and user-friendly web applications.
                        </p>

                        <p>
                            I have recently completed TypeScript and am currently learning <strong className="text-blue-700 dark:text-blue-400">Prisma</strong> and <strong className="text-blue-700 dark:text-blue-400">Next.js</strong> to build high-performance, production-ready applications. I also completed my B.Sc. in Information and Communication Engineering from Daffodil International University.
                        </p>

                        <p>
                            Beyond coding, I enjoy playing cricket and exploring new places, which help me stay refreshed and inspired. I strongly believe in continuous learning and adapting to new technologies. My goal is to build seamless, efficient, and user-centric applications that solve real-world problems.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
