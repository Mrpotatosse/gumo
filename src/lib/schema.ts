import { z } from "zod";

export const WalletSchema = z.object({
    epub: z.string(),
    pub: z.string(),
    epriv: z.string(),
    priv: z.string(),
});
