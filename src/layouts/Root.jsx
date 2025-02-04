import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
    return (
        <div className="min-h-screen">
            <header>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Root;