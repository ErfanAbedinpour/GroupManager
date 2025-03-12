import { Context, NextFunction } from "grammy";
import { Permission } from "../enums/permission.enum";

export function AuthorizationMiddleware(...permissions: Permission[]) {

    return async function (ctx: Context, next: NextFunction): Promise<void> {
        const fromId = ctx.from?.id;

        if (!fromId)
            return

        try {
            const user = (await ctx.getChatAdministrators()).find((admin) => admin.user.id === fromId);

            if (!user)
                throw new Error("فقط ادمین میتواند از ایم کامند استفاده کند")

            if (permissions.length === 0)
                return await next()

            for (const permission of permissions) {
                if (!user[permission] && user['status'] === 'administrator') {
                    throw new Error("شما دسترسی استفاده از این کامند را ندارید")
                }
            }

            return await next()

        } catch (err) {
            ctx.reply(err.message, { reply_markup: { force_reply: true } })
        }

    }
}
