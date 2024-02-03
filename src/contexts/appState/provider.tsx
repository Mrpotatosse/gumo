import AppStateContext from "@/contexts/appState/context";
import { AppState } from "@/lib/appState";
import { ReactNode, useEffect } from "react";
import { proxy } from "valtio";

export function AppStateProvider(props: { children: ReactNode }) {
    const app = proxy<AppState>({});

    useEffect(() => {
        document.body.classList.add("dark", "text-foreground", "bg-background");
    });

    return (
        <AppStateContext.Provider value={app}>
            {props.children}
        </AppStateContext.Provider>
    );
}
