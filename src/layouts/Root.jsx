import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="min-h-screen">
            <header className="mb-16">
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Root;