import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ProjectDetails from "../pages/ProjectDetails";
import Home from "../pages/Home";
import ErrorPage from "../shared/ErrorPage";
import AllProjects from "../pages/AllProjects.jsx";
import AllExperiences from "../pages/AllExperiences.jsx";
import projectsData from '../data/projects.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/all-projects",
                element: <AllProjects />
            },
            {
                path: "/all-experiences",
                element: <AllExperiences />
            },
            {
                path: "/projectDetails/:id",
                element: <ProjectDetails />,
                loader: async ({ params }) => {
                    try {
                        const data = projectsData;

                        const allProjects = [
                            ...(data["my-project"] || []),
                            ...(data["team-project"] || []),
                            ...(data["client-project"] || []),
                            ...(data["working-project"] || [])
                        ];

                        const project = allProjects.find(project => {
                            return String(project.id) === String(params.id);
                        });

                        if (!project) {
                            throw new Response("Project Not Found", { status: 404 });
                        }

                        return project;
                    } catch (error) {
                        console.error("Loader error:", error);
                        throw new Response("Failed to load project", { status: 500 });
                    }
                },
                // Add HydrateFallback for suspense support
                hydrateFallbackElement: <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-4xl mb-4">⏳</div>
                        <h2 className="text-xl font-semibold">Loading project...</h2>
                    </div>
                </div>
            }
        ],
        errorElement: <ErrorPage />
    }
]);

export default router;
