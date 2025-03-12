import { Context, NextFunction } from "grammy";

export async function isMemberMiddleware(ctx: Context, next: NextFunction): Promise<void> {
    console.log("i am here")
    if ((ctx.from && !ctx.from.is_bot))
        return await next()

    return
}