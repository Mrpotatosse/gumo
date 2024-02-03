import GunContext from "@/contexts/gun/context";
import { IGunInstance, IGunUserInstance } from "gun";
import { useContext } from "react";

export function useGun(): IGunInstance {
    const ctx = useContext(GunContext);
    if (!ctx) throw new Error("Gun not initialized");
    return ctx;
}

export function useGunUser(): IGunUserInstance {
    const gun = useGun();
    return gun.user();
}
