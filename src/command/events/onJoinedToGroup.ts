import { Context, Filter } from "grammy";
import { BotCommand } from "../abstract/command.abstract";

export class OnJoinToGroup implements BotCommand<'event'> {
    async doProcess(ctx: Filter<Context, ':left_chat_member'>): Promise<void> {
        return
    }

}