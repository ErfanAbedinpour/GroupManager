import { GrammyError } from "grammy";
import { BotCommand } from "../abstract/command.abstract";
import { Command } from "../../types/global.type";
import { sessionStorage } from "../../storage/session-storage";

export class BanCommand implements BotCommand {
    async doProcess(ctx: Command): Promise<void> {
        const targetUser = ctx.message?.reply_to_message?.from?.id;
        const length = ctx.message!.entities[0].length
        const date = Number(ctx.message!.text.slice(length));

        const msgId = ctx.message!.message_id
        try {

            if (!targetUser)
                throw new Error("لطفا روی کاربر مورد نظر ریپلای کنید")

            const targetFirstName = ctx.message!.reply_to_message!.from!.first_name

            if (!date)
                throw new Error("لطفا کامند را در فرمت درست بفرستید")
            // convert Date To TimeStamp
            const stamp = (date * 24 * 60 * 60 * 1000) + Date.now();

            const result = await this.banChatMember(ctx, stamp, targetUser)

            if (!result)
                throw new Error("اروری در هنگام بن رخ داد لطفا بعدا دوباره امتحان کنید")


            ctx.reply(`${targetFirstName} با موفیت بن شد`, { reply_parameters: { message_id: msgId } });

            return
        } catch (err) {
            let msg = err.message;

            if (err instanceof GrammyError) {
                switch (err.error_code) {
                    case 400: {
                        msg = "کاربر وجود ندارد"
                        break;
                    }

                    case 403: {
                        msg = "شما دسترسی بن کردن ندارید"
                    }
                }
            }
            ctx.reply(msg, { reply_parameters: { message_id: msgId } })
            console.error(err)
        }
    }


    updateSession(user_id: number): void {
        const { isMuted, warningCount } = sessionStorage.read(`user-${user_id}`) || { isMuted: false, warningCount: 0 }
        sessionStorage.write(`user-${user_id}`, { warningCount, isBan: true, isMuted })
    }

    private banChatMember(ctx: Command, date: number, user_id: number) {
        return ctx.banChatMember(user_id, { revoke_messages: true, until_date: date })
    }

}