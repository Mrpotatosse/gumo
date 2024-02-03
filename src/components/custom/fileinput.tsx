import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, readFileAsText } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ChangeEvent, InputHTMLAttributes, useRef, useState } from "react";

export type FileInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
> & {
    sizeLimit?: number;
    onError?: (reason: string) => void;
};

const FileInput = ({
    className,
    children,
    id,
    accept,
    sizeLimit,
    onError,
    ...props
}: FileInputProps) => {
    const [file, setFile] = useState<string | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const valueRef = useRef<HTMLInputElement | null>(null);

    const changeInputAndTriggerEvent = (newValue: string) => {
        if (valueRef.current) {
            valueRef.current.value = newValue;
            const event = new Event("input", { bubbles: true });
            valueRef.current.dispatchEvent(event);
        }
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setFile(event.target.files?.[0].name);
            if (event.target.files[0].size === 0) {
                onError?.("file_empty");
                changeInputAndTriggerEvent("");
                return;
            }

            if (event.target.files[0].size > (sizeLimit ?? 1024)) {
                onError?.("invalid_size");
                changeInputAndTriggerEvent("");
                return;
            }

            const text = await readFileAsText(event.target.files[0]);
            changeInputAndTriggerEvent(text);
        }
    };

    const clearInput = (event: React.MouseEvent<SVGAElement, MouseEvent>) => {
        event.preventDefault();
        setFile(undefined);
        changeInputAndTriggerEvent("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <>
            <Label
                htmlFor={id}
                className={cn(
                    "flex items-center relative truncate cursor-pointer",
                    "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                aria-disabled="true"
            >
                <span className="w-[calc(100%-1rem)] truncate">
                    {file ?? children}
                </span>
                {file && (
                    <Cross2Icon
                        className="absolute right-2 text-muted-foreground hover:text-foreground"
                        onClick={clearInput}
                    ></Cross2Icon>
                )}
            </Label>
            <Input
                id={id}
                ref={inputRef}
                type="file"
                className="hidden"
                accept={accept}
                onChange={handleFileChange}
            />
            <Input className="hidden" ref={valueRef} {...props}></Input>
        </>
    );
};

export default FileInput;
