import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaFacebook, FaWhatsapp, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaCopy, FaCheck } from "react-icons/fa";
import './css/ContactSection.css'
import Tooltip from "../shared/Tooltip";

const ContactSection = () => {
    const form = useRef();
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const sectionRef = useRef(null);
    const statusTimeoutRef = useRef(null); // Add ref to store timeout

    useEffect(() => {
        const currentSection = sectionRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    if (currentSection) {
                        currentSection.classList.add('animate-section-in');
                    }
                }
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -100px 0px",
            }
        );

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
            // Clear timeout on unmount
            if (statusTimeoutRef.current) {
                clearTimeout(statusTimeoutRef.current);
            }
        };
    }, [hasAnimated]);

    const copyEmailToClipboard = async () => {
        const email = "mdashrafulislam2882@gmail.com";
        try {
            await navigator.clipboard.writeText(email);
            setCopiedEmail(true);
            toast.success("Email copied to clipboard!", {
                style: {
                    background: '#15803D',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '12px',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#15803D',
                },
            });
            setTimeout(() => setCopiedEmail(false), 2000);
        } catch (err) {
            toast.error("Failed to copy email", {
                style: {
                    background: '#dc2626',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '12px',
                },
            });
        }
    };

    // Helper function to clear status message after delay
    const clearStatusAfterDelay = (delay = 5000) => {
        // Clear any existing timeout
        if (statusTimeoutRef.current) {
            clearTimeout(statusTimeoutRef.current);
        }

        // Set new timeout
        statusTimeoutRef.current = setTimeout(() => {
            setStatus({ type: "", message: "" });
            statusTimeoutRef.current = null;
        }, delay);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: "", message: "" });

        // Clear any existing timeout
        if (statusTimeoutRef.current) {
            clearTimeout(statusTimeoutRef.current);
            statusTimeoutRef.current = null;
        }

        emailjs.sendForm(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            form.current, {
            publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }).then(
            () => {
                setStatus({
                    type: "success",
                    message: "Message sent successfully! I'll get back to you soon."
                });
                toast.success("Message sent successfully! I'll get back to you soon.", {
                    style: {
                        background: '#16a34a',
                        color: '#fff',
                        padding: '10px 16px',
                        borderRadius: '12px',
                    },
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#16a34a',
                    },
                });
                form.current.reset();
                setIsLoading(false);
                // Clear status after 5 seconds (change this value as needed)
                clearStatusAfterDelay(5000); // 5000ms = 5 seconds
            },
            (error) => {
                setStatus({
                    type: "error",
                    message: "Failed to send message. Please try again or use alternative contact methods."
                });
                toast.error("Failed to send message. Please try again.", {
                    style: {
                        background: '#dc2626',
                        color: '#fff',
                        padding: '10px 16px',
                        borderRadius: '12px',
                    },
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#dc2626',
                    },
                });
                setIsLoading(false);
                // Clear status after 5 seconds (change this value as needed)
                clearStatusAfterDelay(5000); // 5000ms = 5 seconds
            }
        );
    };

    const contactInfo = [
        {
            icon: <FaEnvelope className="text-xl" />,
            title: "Email",
            details: "mdashrafulislam2882@gmail.com",
            description: "Send me an email",
            color: "from-red-500 to-pink-500",
            link: "mailto:mdashrafulislam2882@gmail.com",
            bgColor: "bg-red-50 dark:bg-gray-800",
            borderColor: "border-red-100 dark:border-gray-700"
        },
        {
            icon: <FaWhatsapp className="text-xl" />,
            title: "WhatsApp",
            details: "+880 1825-532252",
            description: "Message me on WhatsApp",
            color: "from-green-500 to-emerald-500",
            link: "https://wa.me/8801825532252",
            bgColor: "bg-green-50 dark:bg-gray-800",
            borderColor: "border-green-100 dark:border-gray-700"
        },
        {
            icon: <FaPhoneAlt className="text-xl" />,
            title: "Phone",
            details: "+880 1825-532252",
            description: "Call me directly",
            color: "from-blue-500 to-cyan-500",
            link: "tel:+8801825532252",
            bgColor: "bg-blue-50 dark:bg-gray-800",
            borderColor: "border-blue-100 dark:border-gray-700"
        },
    ];

    const socialLinks = [
        {
            icon: <FaGithub className="text-2xl" />,
            label: "GitHub",
            tooltipText: "Visit my GitHub profile",
            url: "https://github.com/mdashraful24",
            color: "hover:bg-gray-600 hover:dark:bg-black hover:text-white",
            iconColor: "text-black dark:text-white",
            bgColor: "bg-white/10 dark:bg-gray-700"
        },
        {
            icon: <FaLinkedin className="text-2xl" />,
            label: "LinkedIn",
            tooltipText: "Connect with me on LinkedIn",
            url: "https://www.linkedin.com/in/ashraful-islam-ratul/",
            color: "hover:bg-blue-600 hover:text-white",
            iconColor: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-white/10 dark:bg-gray-700"
        },
        {
            icon: <FaFacebook className="text-2xl" />,
            label: "Facebook",
            tooltipText: "Follow me on Facebook",
            url: "https://www.facebook.com/ashraful.islam.ratul2k",
            color: "hover:bg-blue-500 hover:text-white",
            iconColor: "text-blue-500 dark:text-blue-400",
            bgColor: "bg-white/10 dark:bg-gray-700"
        },
        {
            icon: copiedEmail ? <FaCheck className="text-2xl" /> : <FaCopy className="text-2xl" />,
            label: "Copy Email",
            tooltipText: copiedEmail ? "Email copied!" : "Copy my email address",
            url: "#",
            color: "hover:bg-purple-600 hover:text-white",
            iconColor: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-white/10 dark:bg-gray-700",
            onClick: copyEmailToClipboard,
            isCopyButton: true
        }
    ];

    return (
        <div
            ref={sectionRef}
            className="relative overflow-hidden contact-section dark:bg-black"
        >
            {/* Background Decoration - Hidden in dark mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50 dark:hidden"></div>
            {/* <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -translate-y-32 translate-x-32 opacity-20 bg-float dark:hidden" style={{ animationDelay: '0s', animationDuration: '8s' }}></div> */}
            {/* <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200 rounded-full translate-y-48 -translate-x-48 opacity-20 bg-float dark:hidden" style={{ animationDelay: '2s', animationDuration: '10s' }}></div> */}

            <div className="relative px-4 pt-7 pb-14 lg:py-20">
                <div className="container max-w-[78rem] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 stagger-header">
                        <div className="flex items-center justify-center mb-4">
                            <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                            <span className="px-6 text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
                                Get In Touch
                            </span>
                            <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-700 dark:to-[#3b82f6]"></span>
                        </div>
                        <p className="md:text-[1.3rem] max-w-2xl mx-auto header-subtitle dark:text-gray-300">
                            Have a project in mind? Let's collaborate and bring your ideas to life.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-7">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group contact-card"
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col">
                                    <div className={`${info.bgColor} rounded-xl p-4 shadow border ${info.borderColor} transition-all duration-300 hover:shadow-md hover:-translate-y-[0.2rem] flex flex-col flex-grow contact-card-inner dark:bg-gray-800 dark:border-gray-700`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} text-white flex-shrink-0 transition-all duration-300 group-hover:scale-110 contact-icon`}>
                                                {info.icon}
                                            </div>
                                            <div className="flex-1 min-w-0 space-y-0.5">
                                                <h3 className="font-bold text-xl contact-title dark:text-white">{info.title}</h3>
                                                <p className="text-[1.1rem] font-medium break-all contact-details dark:text-gray-300">{info.details}</p>
                                                <p className="text-[1rem] contact-description dark:text-gray-400">{info.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                        {/* Contact Form */}
                        <div className="lg:col-span-2 form-container">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 p-4 transition-all duration-300 hover:shadow-lg form-card">
                                <div className="flex items-center gap-3 mb-7">
                                    <div className="animate-pulse-glow-blue p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg form-icon">
                                        <FaPaperPlane className="text-blue-600 dark:text-blue-400 text-xl" />
                                    </div>
                                    <h2 className="text-2xl font-bold form-title dark:text-white">Send Me a Message</h2>
                                </div>

                                <form ref={form} onSubmit={sendEmail}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-8">
                                        <div className="input-field">
                                            <label className="block text-[1.1rem] font-semibold mb-2 dark:text-gray-300">
                                                Your Name <strong className="text-red-500">*</strong>
                                            </label>
                                            <input
                                                type="text"
                                                name="user_name"
                                                placeholder="Enter your name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-300 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-[1.05rem] placeholder:text-gray-700 dark:placeholder:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500"
                                            />
                                        </div>
                                        <div className="input-field">
                                            <label className="block text-[1.1rem] font-semibold mb-2 dark:text-gray-300">
                                                Email Address <strong className="text-red-500">*</strong>
                                            </label>
                                            <input
                                                type="email"
                                                name="user_email"
                                                placeholder="xyz@example.com"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-300 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-[1.05rem] placeholder:text-gray-700 dark:placeholder:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="textarea-field">
                                        <label className="block text-[1.1rem] font-semibold mb-2 dark:text-gray-300">
                                            Your Message <strong className="text-red-500">*</strong>
                                        </label>
                                        <textarea
                                            name="message"
                                            placeholder="Enter your message..."
                                            rows="6"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-300 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-[1.05rem] placeholder:text-gray-700 dark:placeholder:text-gray-300 resize-none hover:border-blue-400 dark:hover:border-blue-500"
                                        ></textarea>
                                    </div>

                                    {/* Status Message */}
                                    {status.message && (
                                        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl mt-2 ${status.type === "success"
                                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                                            : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-4 border-red-500 dark:border-red-800"
                                            }`}>
                                            {status.type === "success" ? (
                                                <FaCheckCircle className="text-green-500 dark:text-green-400 text-lg hidden md:block" />
                                            ) : (
                                                <FaExclamationCircle className="text-red-500 dark:text-red-400 text-lg hidden md:block" />
                                            )}
                                            <p className="font-medium">{status.message}</p>
                                        </div>
                                    )}

                                    <div className="flex justify-end mt-7">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="relative w-full md:w-auto px-4 py-2 rounded-lg overflow-hidden bg-blue-600 text-[1.1rem] text-white font-semibold transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98] group submit-button"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="relative z-10">Sending...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="relative z-10">Send Message</span>
                                                        <FaPaperPlane className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Social & Location Info */}
                        <div className="space-y-5 info-sidebar">
                            {/* Social Links */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 text-white social-card">
                                <h3 className="text-2xl font-bold mb-1 social-title">Connect With Me</h3>
                                <p className="text-[1.1rem] text-gray-300 mb-4 social-description">
                                    Follow my journey and see what I'm working on.
                                </p>
                                <div className="flex items-center gap-3 social-icons">
                                    {socialLinks.map((social, index) => (
                                        social.isCopyButton ? (
                                            <Tooltip key={index} text={social.tooltipText} position="topThree">
                                                <button
                                                    onClick={social.onClick}
                                                    className={`p-2 rounded-xl ${social.bgColor} transition-all duration-300 ${social.color} md:hover:scale-110 social-icon cursor-pointer inline-flex items-center justify-center`}
                                                    style={{ transitionDelay: `${index * 0.1}s` }}
                                                >
                                                    <div className={`p-1 rounded-lg bg-gray-50 dark:bg-gray-700 ${social.iconColor} transition-all duration-300`}>
                                                        {social.icon}
                                                    </div>
                                                </button>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip key={index} text={social.tooltipText} position="topThree">
                                                <a
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`p-2 rounded-xl ${social.bgColor} transition-all duration-300 ${social.color} md:hover:scale-110 social-icon inline-flex items-center justify-center`}
                                                    style={{ transitionDelay: `${index * 0.1}s` }}
                                                >
                                                    <div className={`p-1 rounded-lg bg-gray-50 dark:bg-gray-700 ${social.iconColor} transition-all duration-300`}>
                                                        {social.icon}
                                                    </div>
                                                </a>
                                            </Tooltip>
                                        )
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl drop-shadow border border-gray-100 dark:border-gray-700 p-4 location-card">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="animate-pulse-glow-red p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg location-icon">
                                        <FaMapMarkerAlt className="text-red-600 dark:text-red-400" />
                                    </div>
                                    <h3 className="text-xl font-bold location-title dark:text-white">Location</h3>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[1.05rem] font-medium dark:text-gray-300">Dhaka, Bangladesh</p>
                                </div>
                                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                                    <p className="text-[1.07rem] dark:text-gray-300">
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">Remote Work:</span> Available for remote collaborations worldwide.
                                    </p>
                                </div>
                            </div>

                            {/* Quick Note */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-4 border border-blue-100 dark:border-gray-700 drop-shadow quick-note">
                                <h4 className="text-lg font-bold mb-1.5 dark:text-white">Quick Response</h4>
                                <p className="text-[1.05rem] dark:text-gray-300 leading-relaxed">
                                    I typically respond within <span className="text-blue-600 dark:text-blue-400 font-semibold">24 hours.</span> For urgent matters, please use the phone or WhatsApp.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
