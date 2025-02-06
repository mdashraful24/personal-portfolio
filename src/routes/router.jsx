import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ProjectDetails from "../pages/ProjectDetails";
import Home from "../pages/Home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/projectDetails/:id",
                element: <ProjectDetails></ProjectDetails>,
                loader: async ({ params }) => {
                    const res = await fetch("/projects.json");
                    const projects = await res.json();
                    return projects.find(project => project.id === Number(params.id));
                }
            }
        ]
    }
]);

export default router;
