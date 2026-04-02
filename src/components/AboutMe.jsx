// import img from '../../src/assets/image/image2.png';

const AboutMe = () => {
    return (
        <div className="container max-w-7xl mx-auto px-4 py-7 lg:py-20">
            <div className="text-center space-y-5">
                <h1 className="text-3xl md:text-4xl font-bold md:mb-6">
                    About Me
                </h1>
                <div className="md:text-lg text-justify leading-relaxed space-y-5">
                    <p>
                        My programming journey began in 2022 with C and C++, but in 2024 I transitioned into web development—where I discovered my passion for building interactive and scalable applications. Since then, I’ve focused on improving performance, scalability, and user experience through hands-on projects.
                    </p>

                    <p>
                        I am now a full-stack web developer skilled in HTML, CSS, JavaScript, TypeScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB and PostgreSQL. I’ve completed <strong className="text-blue-700">20+</strong> projects, creating responsive and user-friendly web applications.
                    </p>

                    <p>
                        I have recently completed TypeScript and am currently learning <strong className="text-blue-700">Next.js</strong> to build high-performance, production-ready applications. I also completed my B.Sc. in Information and Communication Engineering from Daffodil International University.
                    </p>

                    {/* <p>
                        I am passionate about continuous learning and strive to build efficient, user-centric solutions that solve real-world problems.
                    </p> */}

                    <p>
                        Beyond coding, I enjoy playing cricket and exploring new places, which help me stay refreshed and inspired. I strongly believe in continuous learning and adapting to new technologies. My goal is to build seamless, efficient, and user-centric applications that solve real-world problems.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
