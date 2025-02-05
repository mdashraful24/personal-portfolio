import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";

const Root = () => {
    return (
        <div className="min-h-screen">
            <header className="mb-16">
                <Navbar></Navbar>
            </header>
            <main>
                <Home></Home>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Root;