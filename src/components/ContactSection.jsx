import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaFacebook, FaWhatsapp, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const ContactSection = () => {
    const form = useRef();
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: "", message: "" });

        emailjs.sendForm(
            "service_ysqveka",
            "template_uuljs7u",
            form.current, {
            publicKey: "lea3REjeCm7cxlorD",
        }).then(
            () => {
                setStatus({
                    type: "success",
                    message: "Message sent successfully! I'll get back to you soon."
                });
                form.current.reset();
                setIsLoading(false);
            },
            (error) => {
                setStatus({
                    type: "error",
                    message: "Failed to send message. Please try again or use alternative contact methods."
                });
                console.error('Email sending error:', error.text);
                setIsLoading(false);
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
            bgColor: "bg-red-50"
        },
        {
            icon: <FaPhoneAlt className="text-xl" />,
            title: "Phone",
            details: "+880 1825-532252",
            description: "Call me directly",
            color: "from-blue-500 to-cyan-500",
            link: "tel:+8801825532252",
            bgColor: "bg-blue-50"
        },
        {
            icon: <FaWhatsapp className="text-xl" />,
            title: "WhatsApp",
            details: "+880 1825-532252",
            description: "Message me on WhatsApp",
            color: "from-green-500 to-emerald-500",
            link: "https://wa.me/8801825532252",
            bgColor: "bg-green-50"
        }
    ];

    const socialLinks = [
        {
            icon: <FaGithub className="text-lg" />,
            label: "GitHub",
            url: "https://github.com/mdashraful24",
            color: "hover:bg-gray-600 hover:text-white",
            iconColor: "text-black"
        },
        {
            icon: <FaLinkedin className="text-lg" />,
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/ashraful-islam-ratul/",
            color: "hover:bg-blue-600 hover:text-white",
            iconColor: "text-blue-600"
        },
        {
            icon: <FaFacebook className="text-lg" />,
            label: "Facebook",
            url: "https://www.facebook.com/ashraful.islam.ratul2k",
            color: "hover:bg-blue-500 hover:text-white",
            iconColor: "text-blue-500"
        }
    ];

    return (
        <div className="relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200 rounded-full translate-y-48 -translate-x-48 opacity-20"></div>

            <div className="relative px-4 pt-7 pb-14 lg:py-20">
                <div className="container max-w-[78rem] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Get In Touch
                        </h1>
                        <p className="md:text-lg max-w-2xl mx-auto">
                            Have a project in mind? Let's collaborate and bring your ideas to life.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <div key={index} className="flex flex-col">
                                    <div className={`${info.bgColor} rounded-xl p-4 shadow border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-[0.2rem] flex flex-col flex-grow`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} text-white flex-shrink-0`}>
                                                {info.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg">{info.title}</h3>
                                                <p className="font-medium break-all">{info.details}</p>
                                                <p className="text-sm mt-2">{info.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow border p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FaPaperPlane className="text-blue-600 text-xl" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Send Me a Message</h2>
                                </div>

                                <form ref={form} onSubmit={sendEmail} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="user_name"
                                                placeholder="Enter your name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="user_email"
                                                placeholder="xyz@example.com"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Your Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            placeholder="Enter your message..."
                                            rows="6"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Status Message */}
                                    {status.message && (
                                        <div className={`flex items-center gap-3 p-4 rounded-xl ${status.type === "success"
                                            ? "bg-green-50 text-green-700 border border-green-200"
                                            : "bg-red-50 text-red-700 border border-red-200"
                                            }`}>
                                            {status.type === "success" ? (
                                                <FaCheckCircle className="text-green-500 text-xl" />
                                            ) : (
                                                <FaExclamationCircle className="text-red-500 text-xl" />
                                            )}
                                            <p className="font-medium">{status.message}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="relative w-full md:w-auto px-3 py-2 rounded-lg overflow-hidden bg-blue-600 text-white font-medium transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0 active:scale-[0.98]"
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
                                                        <FaPaperPlane className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Social & Location Info */}
                        <div className="space-y-4">
                            {/* Social Links */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 text-white">
                                <h3 className="text-xl font-bold mb-1">Connect With Me</h3>
                                <p className="text-gray-300 mb-4">
                                    Follow my journey and see what I'm working on.
                                </p>
                                <div className="flex items-center gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-2 rounded-xl bg-white/10 transition-all duration-300 ${social.color}`}
                                        >
                                            <div className={`p-2 rounded-lg bg-gray-50 ${social.iconColor}`}>
                                                {social.icon}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-white rounded-xl drop-shadow border p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <FaMapMarkerAlt className="text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-bold">Location</h3>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p className="font-medium">Dhaka, Bangladesh</p>
                                    <p>YKSG-2, DSC, Ashulia, Savar</p>
                                </div>
                                <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                                    <p className="text-sm text-blue-700">
                                        <span className="font-semibold">Remote Work:</span> Available for remote collaborations worldwide.
                                    </p>
                                </div>
                            </div>

                            {/* Quick Note */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 drop-shadow">
                                <h4 className="font-bold mb-2">Quick Response</h4>
                                <p className="text-sm">
                                    I typically respond within 24 hours. For urgent matters, please use the phone or WhatsApp.
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
