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
import AboutMe from "../components/AboutMe";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";
import ProjectsShowcase from "../components/ProjectsShowcase";
import Skills from "../components/Skills";

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
            <section id="home">
                <HeroSection onHireMeClick={handleHireMeClick} />
            </section>
            <section id="about">
                <AboutMe />
            </section>
            <section id="skills">
                <Skills />
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
