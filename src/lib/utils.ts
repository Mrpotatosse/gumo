import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function readFileAsText(blob?: Blob | null): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!blob) {
            reject("undefined blob");
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            const result = e.target?.result?.toString();
            if (result === undefined) {
                reject("undefined result");
            } else {
                resolve(result);
            }
        });

        reader.addEventListener("error", () => reject("error"));
        reader.addEventListener("abort", () => reject("abort"));
        reader.readAsText(blob);
    });
}
