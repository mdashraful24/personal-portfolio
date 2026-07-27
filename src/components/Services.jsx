import { FaArrowRightLong } from "react-icons/fa6";
import services from "../data/service/services.js";

const Services = () => {
    // Function to scroll to contact section
    const scrollToContact = (id, isSmooth = true) => {
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                if (isSmooth) {
                    window.scrollTo({
                        top: element.offsetTop - 70,
                        behavior: "smooth",
                    });
                } else {
                    window.scrollTo(0, element.offsetTop - 70);
                }
            }
        }, 100);
    };

    return (
        <section
            id="services"
            className="py-20 dark:bg-black transition-colors duration-300"
        >
            <div className="container max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    {/* <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-3">
                        WHAT I DO
                    </p> */}

                    <div className="flex items-center justify-center mb-4">
                        <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-blue-500"></span>
                        <span className="px-6 text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
                            My Services
                            {/* My <span className="text-blue-700 dark:text-blue-400">Services</span> */}
                        </span>
                        <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-blue-500"></span>
                    </div>

                    <p className="mt-6 max-w-3xl mx-auto text-[1.3rem] dark:text-gray-300 leading-relaxed">
                        I build modern, scalable, and user-friendly web applications with a
                        strong focus on performance, clean code, and exceptional user
                        experience.
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.id}
                                className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 drop-shadow hover:shadow-xl hover:shadow-blue-500/20"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-blue-600">
                                    <Icon
                                        size={36}
                                        className="text-blue-600 group-hover:text-white transition-colors duration-300"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-semibold mb-4">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="dark:text-gray-300 text-[1.2rem] leading-relaxed text-justify">
                                    {service.description}
                                </p>

                                {/* Bottom Line */}
                                <div className="mt-4 h-1 w-0 bg-blue-600 rounded-full transition-all duration-500 group-hover:w-16"></div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => scrollToContact("contact")}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-lg text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group/btn cursor-pointer"
                    >
                        Let's Discuss Your Project
                        <FaArrowRightLong className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;