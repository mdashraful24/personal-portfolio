import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaFacebook, FaWhatsappSquare, FaWhatsapp } from "react-icons/fa";

const ContactSection = () => {
    const form = useRef();
    const [status, setStatus] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const formObject = Object.fromEntries(formData.entries());

        console.log("Form Data:", formObject); // Log form data

        emailjs.sendForm(
            "service_ysqveka",
            "template_uuljs7u",
            form.current, {
            publicKey: "lea3REjeCm7cxlorD",
        }).then(
            () => {
                setStatus("Email sent successfully!");
                form.current.reset();
            },
            (error) => {
                setStatus("Failed to send message. Please try again.");
                console.error('Email sending error:', error.text);
            }
        );
    };

    return (
        <div className="pt-16 md:pt-28">
            <div className="bg-gradient-to-b from-red-50 to-white py-10 md:py-10 px-4">
                <div>
                    <h1 className="text-3xl md:text-4xl text-center font-bold mb-10">Contact</h1>
                </div>
                <div className="container max-w-[77rem] mx-auto">
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
                        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-black text-center">
                            <FaPhoneAlt className="text-blue-500 text-3xl mb-2" />
                            <p className="font-semibold">+880 1825-532252</p>
                            <p className="text-sm">Contact me via Phone.</p>
                            {/* <p className="text-sm">Monday - Sunday from 7am - 12am</p> */}
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-black text-center">
                            <FaWhatsapp className="text-blue-500 text-3xl mb-2" />
                            <p className="font-semibold">+880 1825-532252</p>
                            <p className="text-sm">Contact me via WhatsApp.</p>
                        </div>

                        {/* <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-black text-center">
                            <FaMapMarkerAlt className="text-red-500 text-3xl mb-2" />
                            <p className="text-lg font-semibold">Dhaka, Bangladesh</p>
                            <p className="text-sm">YKSG-2, DSC, Ashulia, Savar</p>
                        </div> */}

                        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-black text-center">
                            <FaEnvelope className="text-blue-500 text-3xl mb-2" />
                            <p className="font-semibold break-all w-full text-center">
                                mdashrafulislam2882@gmail.com
                            </p>
                            <p className="text-sm">Contact me anytime!</p>
                        </div>

                    </div>

                    {/* Contact Form & Message */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Contact Form */}
                        <div className="bg-white md:col-span-2 p-8 rounded-2xl shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
                            <div className="w-16 border-b-2 border-red-500 mb-4"></div>

                            <form ref={form} onSubmit={sendEmail} className="space-y-4">
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Enter your name"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1"
                                />
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Enter email address"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1"
                                />
                                <textarea
                                    name="message"
                                    placeholder="Enter your message"
                                    required
                                    className="w-full p-3 border rounded-lg h-28 focus:outline-none focus:ring-1"
                                ></textarea>
                                <button type="submit" className="btn relative overflow-hidden bg-blue-600 text-white text-lg font-medium transition-all duration-300 ease-in-out
                                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-blue-800 before:transition-all before:duration-500 before:-translate-x-full hover:before:translate-x-0 before:z-0">
                                    <span className="relative z-10">Send Email</span>
                                </button>
                            </form>

                            {/* Status Message */}
                            {status && <p className="mt-3 text-base text-green-600">{status}</p>}
                        </div>

                        {/* Message Me Section */}
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Contact me in another way</h2>
                            <div className="w-16 border-b-2 border-red-500 mb-4"></div>
                            <p className="text-sm">
                                If you prefer to contact us in another way, please feel free to reach out via <strong>Facebook, GitHub</strong> or <strong>LinkedIn</strong>. I'm happy to assist you!
                            </p>

                            {/* Social Icons */}
                            <div className="flex space-x-4 mt-4 text-xl text-gray-600">
                                <a href="https://github.com/mdashraful24" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="hover:text-black cursor-pointer" />
                                </a>

                                <a href="https://www.linkedin.com/in/ashraful-islam-ratul/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                                </a>

                                <a href="https://www.facebook.com/ashraful.islam.ratul2k" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="hover:text-blue-500 cursor-pointer" />
                                </a>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-red-600 text-xl" />
                                    <h3 className="text-xl font-semibold text-gray-800">Address: </h3>
                                </div>
                                <p className="text-md mt-2">YKSG-2, DSC, Ashulia, Savar</p>
                                <p className="text-lg">Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
