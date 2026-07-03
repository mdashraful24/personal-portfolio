import { Code2, Database, Globe } from "lucide-react";

const services = [
    {
        id: 1,
        icon: <Globe size={40} className="text-blue-100border-blue-100" />,
        title: "Frontend Development",
        description:
            "Building responsive, interactive, and accessible user interfaces using React, Tailwind CSS, and modern JavaScript to deliver seamless user experiences.",
    },
    {
        id: 2,
        icon: <Database size={40} className="text-blue-100border-blue-100" />,
        title: "Backend Development",
        description:
            "Developing secure and scalable REST APIs with Node.js, Express.js, MongoDB, and PostgreSQL while focusing on performance and maintainability.",
    },
    {
        id: 3,
        icon: <Code2 size={40} className="text-blue-100border-blue-100" />,
        title: "Full-Stack Development",
        description:
            "Creating complete web applications by integrating modern frontend technologies with robust backend services to solve real-world problems.",
    },
];

const Services = () => {
    return (
        <section id="services" className="py-20 dark:bg-black">
            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-14">
                    {/* <p className="text-blue-100border-blue-100 font-semibold uppercase tracking-widest">
                        What I Do
                    </p> */}

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
                        My Services
                    </h2>

                    <p className="md:text-[1.3rem] max-w-3xl mx-auto mt-6">
                        I build modern, scalable, and user-friendly web applications with a
                        focus on performance, clean code, and exceptional user experience.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group rounded-2xl border border-base-300 bg-base-200 p-8 hover:border-blue-100 hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-xl bg-blue-200 flex items-center justify-center mb-6 group-hover:bg-blue-300 group-hover:text-white transition-all duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-semibold mb-4">
                                {service.title}
                            </h3>

                            <p className="text-[1.2rem] text-justify leading-7">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;