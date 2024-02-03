import { IGunInstance } from "gun";
import { createContext } from "react";

const GunContext = createContext<IGunInstance | undefined>(undefined);
export default GunContext;
