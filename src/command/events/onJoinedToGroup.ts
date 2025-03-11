import { Context, Filter } from "grammy";
import { BotCommand } from "../abstract/command.abstract";
import { BotMessages } from "../../messages/bot.messages.enum";

export class NewMemberJoinHandler implements BotCommand<'event'> {
    async doProcess(ctx: Filter<Context, 'message:new_chat_members'>): Promise<void> {

        // TODO: Reply to User For Sending Welcome Message
        const msg = ` ${BotMessages.welcomeMessage}`

        ctx.reply(msg, {
            reply_to_message_id: ctx.message.message_id,
        });
    }
}