import AppStateContext from "@/contexts/appState/context";
import { AppState } from "@/lib/appState";
import { useContext } from "react";

export function useAppState(): AppState {
    const ctx = useContext(AppStateContext);
    if (!ctx) throw new Error("AppState not initialized");
    return ctx;
}
