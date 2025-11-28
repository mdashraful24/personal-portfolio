import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ProjectDetails from "../pages/ProjectDetails";
import Home from "../pages/Home";
import ErrorPage from "../shared/ErrorPage";
import AllProjects from "../components/AllProjects";

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
                path: "/all-projects",
                element: <AllProjects></AllProjects>
            },
            {
                path: "/projectDetails/:id",
                element: <ProjectDetails></ProjectDetails>,
                loader: async ({ params }) => {
                    try {
                        const res = await fetch("/projects.json");
                        if (!res.ok) throw new Error('Failed to fetch projects');
                        const projects = await res.json();
                        const project = projects.find(project => project.id === Number(params.id));

                        if (!project) {
                            throw new Response("Project Not Found", { status: 404 });
                        }

                        return project;
                    } catch (error) {
                        throw new Response("Failed to load project", { status: 500 });
                    }
                }
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
]);

export default router;
