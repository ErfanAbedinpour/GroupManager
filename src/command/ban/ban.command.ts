import { CommandContext, Context } from "grammy";
import { BotCommand } from "../abstract/command.abstract";

export class BanCommand implements BotCommand {
    async doProcess(ctx: CommandContext<Context>): Promise<void> {
        const targetUser = ctx.message?.reply_to_message?.from?.id;
        const length = ctx.message!.entities[0].length
        const date = Number(ctx.message!.text.slice(length));

        try {

            if (!targetUser)
                throw new Error("لطفا روی کاربر مورد نظر ریپلای کنید")

            if (!date)
                throw new Error("لطفا کامند را در فرمت درست بفرستید")

            const result = await this.banChatMember(ctx, date, targetUser)

            if (!result)
                throw new Error("اروری در هنگام بن رخ داد لطفا بعدا دوباره امتحان کنید")

            return
        } catch (err) {
            ctx.reply(err.message)
        }
    }


    private banChatMember(ctx: CommandContext<Context>, date: number, user_id: number) {
        // convert Date To TimeStamp
        const until = date * 24 * 60 * 60 * 1000 + Date.now();
        return ctx.banChatMember(user_id, { revoke_messages: true, until_date: until })
    }

}