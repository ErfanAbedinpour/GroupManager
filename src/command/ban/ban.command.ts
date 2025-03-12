import { CommandContext, Context } from "grammy";
import { BotCommand } from "../abstract/command.abstract";

export class BanCommand implements BotCommand {
    async doProcess(ctx: CommandContext<Context>): Promise<void> {
        const userMustBeBan = ctx.message?.reply_to_message?.from?.id;
        const length = ctx.message!.entities[0].length
        const date = Number(ctx.message!.text.slice(length));

        try {

            if (!userMustBeBan)
                throw new Error("please reply to target User!")

            if (!date)
                throw new Error("invalid date")

            const until = date * 24 * 60 * 60 * 1000 + Date.now();


            const result = await this.banChatMember(ctx, until, userMustBeBan)

            if (!result)
                throw new Error("error During Ban User")

            return
        } catch (err) {
            ctx.reply(err.message)
        }
    }


    private banChatMember(ctx: CommandContext<Context>, until: number, user_id: number) {
        return ctx.banChatMember(user_id, { revoke_messages: true, until_date: until })
    }

}