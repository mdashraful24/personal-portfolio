// import { NavLink, useLocation } from "react-router";
// import DarkLightTheme from "../shared/DarkLightTheme";

// const Navbar = () => {
//     const location = useLocation(); // Get current path
//     const isHome = location.pathname === "/"; // Check if on Home

//     // Links
//     const navLinks = (
//         <>
//             <li>
//                 <NavLink
//                     to="/"
//                     className={({ isActive }) => isActive || isHome ? "text-blue-600 font-bold" : ""}
//                 >
//                     Home
//                 </NavLink>
//             </li>
//             <li><NavLink to="/about">About</NavLink></li>
//             <li><NavLink to="/skills">Skills</NavLink></li>
//             <li><NavLink to="/work">Work</NavLink></li>
//             <li><NavLink to="/contact">Contact</NavLink></li>
//         </>
//     );

//     return (
//         <div className="shadow-sm px-5">
//             <div className="navbar container mx-auto">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost md:hidden pl-0">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//                             {navLinks}
//                         </ul>
//                     </div>
//                     <a className="text-2xl font-bold">Ratul</a>
//                 </div>
//                 <div className="navbar-end hidden md:block lg:flex">
//                     <ul className="menu menu-horizontal px-1">
//                         {navLinks}
//                         <div className="pl-2">
//                             <DarkLightTheme />
//                         </div>
//                     </ul>
//                 </div>
//                 <div className="navbar-end md:hidden lg:hidden">
//                     <DarkLightTheme />
//                 </div>
//                 {/* className="pl-3 pr-2 md:pl-3" */}
//             </div>
//         </div>
//     );
// };

// export default Navbar;







import { NavLink, useLocation } from "react-router";
import DarkLightTheme from "../shared/DarkLightTheme";

const Navbar = () => {
    const location = useLocation(); // Get current path
    const isHome = location.pathname === "/"; // Check if on Home

    // Links
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive || isHome ? "text-blue-600 font-bold" : ""}
                >
                    Home
                </NavLink>
            </li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/skills">Skills</NavLink></li>
            <li><NavLink to="/work">Work</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
        </>
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md">
            <div className="navbar container mx-auto px-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden pl-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="text-2xl font-bold">Ratul</a>
                </div>
                <div className="navbar-end hidden md:block lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                        <div className="pl-2">
                            <DarkLightTheme />
                        </div>
                    </ul>
                </div>
                <div className="navbar-end md:hidden lg:hidden">
                    <DarkLightTheme />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
