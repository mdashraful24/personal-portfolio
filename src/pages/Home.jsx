// import AboutMe from "../components/AboutMe";
// import ContactSection from "../components/ContactSection";
// import HeroSection from "../components/HeroSection";
// import ProjectsShowcase from "../components/ProjectsShowcase";
// import Skills from "../components/Skills";

// const Home = () => {
//     return (
//         <div>
//             <section id="home">
//                 <HeroSection />
//             </section>
//             <section id="about">
//                 <AboutMe />
//             </section>
//             <section id="skills">
//                 <Skills />
//             </section>
//             <section id="projects">
//                 <ProjectsShowcase />
//             </section>
//             <section id="contact">
//                 <ContactSection />
//             </section>
//         </div>
//     );
// };

// export default Home;



import { useRef } from "react";
import HeroSection from "../components/HeroSection";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import ProjectsShowcase from "../components/ProjectsShowcase";
import Experience from "../components/Experience";
import ContactSection from "../components/ContactSection";

const Home = () => {
    const contactRef = useRef(null);

    const handleHireMeClick = () => {
        // Ensure that contactRef is properly set
        if (contactRef.current) {
            const element = contactRef.current;
            window.scrollTo({
                top: element.offsetTop - 50,  // Adjust scroll by 70px offset
                behavior: "smooth"            // Smooth scroll
            });
        }
    };

    return (
        <div className="">
            <title>Ashraful Islam Ratul</title>

            <section id="home">
                <HeroSection onHireMeClick={handleHireMeClick} />
            </section>
            <section id="about">
                <AboutMe />
            </section>
            <section id="skills">
                <Skills />
            </section>
            <section id="experience">
                <Experience />
            </section>
            <section id="projects">
                <ProjectsShowcase />
            </section>
            <section id="contact" ref={contactRef}>
                <ContactSection />
            </section>
        </div>
    );
};

export default Home;
