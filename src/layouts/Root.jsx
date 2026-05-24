import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
    const location = useLocation();
    const isAllProjectsPage = location.pathname === "/all-projects";

    return (
        <div className="min-h-screen">
            <header className="mb-16">
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer className={isAllProjectsPage ? "hidden md:block" : ""}>
                <Footer />
            </footer>
        </div>
    );
};

export default Root;