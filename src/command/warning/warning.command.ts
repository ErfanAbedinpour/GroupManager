import { CommandContext, Context } from "grammy";
import { BotCommand } from "../abstract/command.abstract";
import { MyContext } from "../../types/context.type";

export class WarningCommand implements BotCommand {
    async doProcess(ctx: CommandContext<MyContext>): Promise<void> {
    }
}