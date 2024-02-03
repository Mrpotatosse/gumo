import { AppState } from "@/lib/appState";
import { createContext } from "react";

const AppStateContext = createContext<AppState | undefined>(undefined);
export default AppStateContext;
