import FileInput from "@/components/custom/fileinput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { WalletSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { CopyIcon } from "@radix-ui/react-icons";
import { ISEAPair } from "gun";
import SEA from "gun/sea";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export type HeaderAvatarProps = {
    pub?: string;
    login?: (pair: ISEAPair) => void;
    logout?: () => void;
};

export default function HeaderAvatar({
    pub,
    login,
    logout,
}: HeaderAvatarProps) {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [valid, setValid] = useState(false);
    const [keys, setKeys] = useState<ISEAPair>();
    const aRef = useRef<HTMLAnchorElement>(null);

    const copyKey = () => (
        navigator.clipboard.writeText(pub ?? ""),
        toast({
            title: t("app.copy_clipboard"),
        })
    );

    const dumpKeys = async () => {
        const pair = await SEA.pair();
        const blob = new Blob([JSON.stringify(pair)], {
            type: "application/json",
        });

        if (aRef.current) {
            aRef.current.href = URL.createObjectURL(blob);
            aRef.current.click();
            aRef.current.href = "";
        }
    };

    return pub ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={cn(
                        "flex items-center border rounded-full",
                        "cursor-pointer select-none",
                        "flex-row w-9 md:hover:w-40 space-x-3",
                        "transition-all duration-500 ease-in-out"
                    )}
                >
                    <Avatar className="w-9 h-9">
                        <AvatarImage
                            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${pub}`}
                            alt="avatar"
                        />
                        <AvatarFallback>IMG</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{pub}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent collisionPadding={5} className="w-52">
                <DropdownMenuLabel
                    className="flex flex-row space-x-2 items-center group cursor-pointer hover:text-foreground text-muted-foreground"
                    onClick={copyKey}
                >
                    <span className="flex-1 truncate"> {pub}</span>
                    <CopyIcon
                        className="w-4 h-4 hidden group-hover:block"
                        //onClick={copyKey}
                    />
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="!h-[0.5px]" />
                <DropdownMenuItem onSelect={logout}>
                    {t("app.logout")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Dialog onOpenChange={() => setValid(false)}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-48 h-full">
                    {t("app.login")}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95%] md:w-full rounded">
                <DialogTitle>{t("app.import_keys")}</DialogTitle>
                <FileInput
                    id="keys-file-input"
                    className="w-full"
                    accept="application/json"
                    onError={(reason) => (
                        toast({
                            title: t(`app.error.${reason}`),
                        }),
                        setValid(false)
                    )}
                    onInput={(e) => {
                        if (e.currentTarget.value === "") {
                            setValid(false);
                            return;
                        }

                        try {
                            setKeys(
                                WalletSchema.parse(
                                    JSON.parse(e.currentTarget.value)
                                )
                            );
                            setValid(true);
                        } catch (e) {
                            toast({
                                title: t("app.error.invalid_file"),
                            });
                            setValid(false);
                        }
                    }}
                >
                    {t("app.select_file")}
                </FileInput>
                <Button disabled={!valid} onClick={() => keys && login?.(keys)}>
                    {t("app.import")}
                </Button>
                <div className="flex w-full h-fit space-x-3 overflow-hidden items-center justify-center">
                    <Separator className="w-full" />
                    <span>{t("app.or")}</span>
                    <Separator className="w-full" />
                </div>
                <Button onClick={dumpKeys}>{t("app.create_keys")}</Button>
                <a ref={aRef} className="hidden" download="dump_keys.json" />
            </DialogContent>
        </Dialog>
    );
}
