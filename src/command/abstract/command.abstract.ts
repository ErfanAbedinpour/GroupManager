import { CommandContext, Context } from "grammy";


export abstract class BotCommand<T extends 'command' | "event" = "command"> {
    abstract doProcess(ctx: T extends "command" ? CommandContext<Context> : unknown): Promise<void>
}