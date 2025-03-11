import { CommandContext, Context } from "grammy";
import { BotCommand } from "../abstract/command.abstract";
import { BotMessages } from "../../messages/bot.messages.enum";

export class OnJoinToGroup implements BotCommand {
    async doProcess(ctx: CommandContext<Context>): Promise<void> {
        ctx.reply(BotMessages.welcomeMessage)
        return
    }
}