import { Command } from "../../types/global.type";


export abstract class BotCommand<T extends 'command' | "event" = "command"> {
    abstract doProcess(ctx: T extends "command" ? Command : unknown): Promise<void>
}