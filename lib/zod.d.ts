import { z } from 'zod';
export declare const Options: z.ZodObject<{
    port: z.ZodNumber;
    routes: z.ZodString;
    onReady: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        port: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        port: number;
    }, {
        port: number;
    }>], null>, z.ZodUnknown>>;
    middlewares: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    port: number;
    routes: string;
    onReady?: ((args_0: {
        port: number;
    }) => unknown) | undefined;
    middlewares?: any;
}, {
    port: number;
    routes: string;
    onReady?: ((args_0: {
        port: number;
    }) => unknown) | undefined;
    middlewares?: any;
}>;
