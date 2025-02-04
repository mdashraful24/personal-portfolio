import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";

const AboutMe = () => {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-5">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-3xl md:text-4xl font-bold"
                >
                    About Me
                </motion.h2>

                {/* Introduction */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-6 text-center text-lg max-w-3xl mx-auto"
                >
                    I&apos;m a passionate and highly motivated web developer with experience in building modern, scalable web
                    applications. I specialize in front-end development with React, and I&apos;m also skilled in back-end technologies
                    like Node.js and databases.
                </motion.p>

                {/* Skills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-8"
                >
                    <div className="text-center">
                        <FaHtml5 className="text-4xl text-orange-600 mx-auto" />
                        <p className="mt-2 text-sm">HTML</p>
                    </div>
                    <div className="text-center">
                        <FaCss3Alt className="text-4xl text-blue-600 mx-auto" />
                        <p className="mt-2 text-sm">CSS</p>
                    </div>
                    <div className="text-center">
                        <FaJsSquare className="text-4xl text-yellow-500 mx-auto" />
                        <p className="mt-2 text-sm">JavaScript</p>
                    </div>
                    <div className="text-center">
                        <FaReact className="text-4xl text-blue-400 mx-auto" />
                        <p className="mt-2 text-sm">React</p>
                    </div>
                    <div className="text-center">
                        <FaNodeJs className="text-4xl text-green-600 mx-auto" />
                        <p className="mt-2 text-sm">Node.js</p>
                    </div>
                    <div className="text-center">
                        <FaDatabase className="text-4xl text-teal-600 mx-auto" />
                        <p className="mt-2 text-sm">Database</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMe;
