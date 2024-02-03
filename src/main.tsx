import "@/assets/css/globals.css";
import { AppStateProvider } from "@/contexts/appState/provider";
import GunProvider from "@/contexts/gun/provider";
import "@/i18n";
import router from "@/lib/router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AppStateProvider>
        <GunProvider
            options={{
                peers: ["https://gun-manhattan.herokuapp.com/gun"],
            }}
        >
            <RouterProvider router={router} />
        </GunProvider>
    </AppStateProvider>
);
