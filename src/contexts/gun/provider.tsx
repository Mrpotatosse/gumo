import { useAppState } from "@/contexts/appState/hooks";
import GunContext from "@/contexts/gun/context";
import Gun, { GunOptions } from "gun";
import "gun/lib/yson";
import "gun/sea";
import { ReactNode } from "react";

export default function GunProvider(props: {
    children: ReactNode;
    options: GunOptions;
}) {
    const gun = Gun(props.options);
    gun.user().recall({
        sessionStorage: true,
    });

    const app = useAppState();
    app.pub = gun.user().is?.pub;

    return (
        <GunContext.Provider value={gun}>{props.children}</GunContext.Provider>
    );
}
