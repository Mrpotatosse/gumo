import AppLayer from "@/layers/app";
import _404 from "@/pages/404";
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayer />,
        errorElement: <_404 />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
]);

export default router;
