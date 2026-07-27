// import img from '../../src/assets/image/image2.png';

const AboutMe = () => {
    return (
        <div className="bg-gradient-to-t from-white via-white to-gray-50 dark:bg-gradient-to-t dark:from-black dark:via-black dark:to-black">
            <div className="container max-w-7xl mx-auto px-4 py-7 lg:py-24">
                <div className="space-y-5">
                    <div className="flex items-center justify-center md:mb-6">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        <span className="px-6 text-3xl md:text-4xl lg:text-5xl text-center font-bold dark:text-white">
                            About Me
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                    </div>
                    <div className="md:text-[1.3rem] leading-relaxed space-y-5 dark:text-gray-300">
                        <p>
                            My programming journey began in 2022 with C and C++, where I built a strong foundation in programming and problem-solving. In 2024, I discovered web development and became passionate about creating interactive, responsive, and user-friendly applications. Since then, I've been continuously improving my skills by building real-world projects and exploring modern web technologies.
                        </p>

                        <p>
                            I enjoy developing full-stack web applications that solve real problems and provide a seamless user experience. From building clean, responsive interfaces with React and Tailwind CSS to developing scalable backend services with Node.js, Express.js, MongoDB, and PostgreSQL, I enjoy every stage of the development process. I enjoy writing clean, maintainable code and continuously improving my skills to build efficient, scalable, and user-focused applications.
                        </p>

                        <p>
                            So far, I've completed <strong className="text-blue-700 dark:text-blue-400">10+</strong> projects that have strengthened both my technical skills and problem-solving abilities. I'm currently expanding my knowledge by learning <strong className="text-blue-700 dark:text-blue-400">Next.js</strong> to build faster, scalable, and production-ready applications. I also completed my B.Sc. in Information and Communication Engineering from Daffodil International University.
                        </p>

                        <p>
                            Outside of programming, I enjoy playing cricket and exploring new places, which help me stay refreshed and inspired. I'm naturally curious, enjoy taking on new challenges, and believe that continuous learning is the key to becoming a better developer. My goal is to build high-quality, user-focused applications that solve real-world problems while continuing to grow as a software engineer.
                        </p>
                    </div>

                    {/* <div className="md:text-lg leading-relaxed space-y-5 dark:text-gray-300">
                        <p>
                            My programming journey began in 2022 when I started learning C and C++, where I developed a strong foundation in programming concepts and problem-solving. While I enjoyed solving algorithmic challenges, I became fascinated by web development in 2024 because it allowed me to transform ideas into interactive applications that people can actually use. Since then, I have dedicated myself to mastering modern web technologies by building practical projects and continuously expanding my skills.
                        </p>

                        <p>
                            I enjoy building full-stack web applications that are clean, responsive, and user-focused. Seeing an idea evolve from a simple concept into a fully functional product is the part of development I find most rewarding. Whether I'm designing intuitive user interfaces with React and Tailwind CSS or developing scalable backend APIs with Node.js, Express.js, MongoDB, and PostgreSQL, I strive to write clean, maintainable, and efficient code that delivers a seamless user experience.
                        </p>

                        <p>
                            Throughout my learning journey, I have completed <strong className="text-blue-700 dark:text-blue-400">10+</strong> projects that have strengthened both my technical knowledge and problem-solving abilities. Every project has taught me something new about writing better code, improving performance, and building applications that solve real-world problems. I recently learned TypeScript and am currently exploring <strong className="text-blue-700 dark:text-blue-400">Next.js</strong> and <strong className="text-blue-700 dark:text-blue-400">Prisma</strong> to create faster, scalable, and production-ready applications. I also completed my B.Sc. in Information and Communication Engineering from Daffodil International University.
                        </p>

                        <p>
                            Outside of programming, I enjoy playing cricket and exploring new places. These activities help me stay refreshed, maintain a healthy work-life balance, and return to coding with fresh ideas and motivation. I believe that curiosity, consistency, and continuous learning are essential qualities for every developer. My goal is to keep growing as a software engineer while building impactful, high-quality applications that provide real value and meaningful experiences for users.
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
