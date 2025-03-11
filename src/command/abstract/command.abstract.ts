import { CommandContext, Context } from "grammy";

export abstract class BotCommand {

    abstract doProcess(ctx: CommandContext<Context>): Promise<void>
}