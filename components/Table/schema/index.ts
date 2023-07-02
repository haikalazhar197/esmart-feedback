import { type } from "os";
import {z} from "zod"

export const paginationSchema = z.object({
    current: z.number(),
    size: z.number(),
    total: z.number(),
    setPage: z.function().args(z.number()).returns(z.void()),
    setSize: z.function().args(z.number()).returns(z.void()),
});

export type PaginationConfig = z.infer<typeof paginationSchema>;

export const reactNode = z.union([z.string(), z.number(), z.boolean(), z.null(), z.undefined()]);

export type ReactNode = z.infer<typeof reactNode>;