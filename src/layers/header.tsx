import HeaderAvatar from "@/components/header/avatar";
import { useAppState } from "@/contexts/appState/hooks";
import { useGunUser } from "@/contexts/gun/hook";
import { ISEAPair } from "gun";
import { useSnapshot } from "valtio";

export default function HeaderLayer() {
    const app = useAppState();
    const appSnap = useSnapshot(app, { sync: true });
    const user = useGunUser();

    const login = (pair: ISEAPair) =>
        user.auth(pair, (ack) => "sea" in ack && (app.pub = ack.sea.pub));

    const logout = () => (user.leave(), (app.pub = undefined));

    return (
        <div className="w-full h-fit flex justify-between p-1 space-x-1">
            <div></div>
            <div></div>
            <HeaderAvatar pub={appSnap.pub} login={login} logout={logout} />
        </div>
    );
}
