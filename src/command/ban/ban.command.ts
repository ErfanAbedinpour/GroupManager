import { CommandContext, Context } from "grammy";
import { BotCommand } from "../abstract/command.abstract";

export class BanCommand implements BotCommand {
    async doProcess(ctx: CommandContext<Context>): Promise<void> {
        ctx.reply("Ban command")
        return
    }
}