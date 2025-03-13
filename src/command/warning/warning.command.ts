import { BotCommand } from "../abstract/command.abstract";
import { Command } from "../../types/global.type";
import { BotException } from "../../exceptions/bot.exception";
import { InvalidCommandException } from "../../exceptions/invalid-command.exception";
import { freeStorage } from "@grammyjs/storage-free";

export class WarningCommand implements BotCommand {
    async doProcess(ctx: Command): Promise<void> {
        const targetUserId = ctx.message?.reply_to_message?.from?.id
        const msgId = ctx.message!.message_id
        try {

            if (!targetUserId)
                throw new InvalidCommandException("لطفا روی کاربر مورد نظر ریپلای کنید")

        } catch (err) {
            if (err instanceof BotException)
                ctx.reply(err.message, { reply_parameters: { message_id: msgId } })
        }
    }
}