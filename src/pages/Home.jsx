import AboutMe from "../components/AboutMe";
import HeroSection from "../components/HeroSection";
import ProjectsShowcase from "../components/ProjectsShowcase";
import Skills from "../components/Skills";

const Home = () => {
    return (
        <div>
            <section id="#">
                <HeroSection />
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
        </div>
    );
};

export default Home;