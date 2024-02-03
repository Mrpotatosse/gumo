import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import HeaderLayer from "@/layers/header";
import { Outlet } from "react-router-dom";

export default function AppLayer() {
    return (
        <>
            <div className="w-full h-full flex flex-col-reverse md:flex-col">
                <HeaderLayer />
                <Separator className="!h-[0.5px]" />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
            <Toaster />
        </>
    );
}
