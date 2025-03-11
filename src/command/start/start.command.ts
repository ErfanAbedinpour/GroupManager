import { CommandContext, Context } from "grammy";
import { BotCommand } from "../abstract/command.abstract";

export class StartCommand implements BotCommand {

    async doProcess(ctx: CommandContext<Context>): Promise<void> {
        ctx.reply("hello")
    }
}