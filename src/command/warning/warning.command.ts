import { BotCommand } from "../abstract/command.abstract";
import { Command } from "../../types/global.type";
import { InvalidCommandException } from "../../exceptions/invalid-command.exception";
import { sessionStorage } from "../../storage/session-storage";
import { Injectable, Logger } from "@nestjs/common";
import { MuteCommand } from "../mute/mute.command";
import { SessionData } from "../../types/session.interface";

@Injectable()
export class WarningCommand implements BotCommand {
    constructor(private readonly MuteCommand: MuteCommand) { }

    private logger = new Logger(WarningCommand.name)
    async doProcess(ctx: Command): Promise<void> {
        const targetUserId = ctx.message?.reply_to_message?.from?.id
        const targetUserName = ctx.message?.reply_to_message?.from?.first_name
        const msgId = ctx.message!.message_id
        let respMsg = "";
        try {
            let payload: SessionData = {
                isBan: false,
                isMuted: false,
                warningCount: 0
            };

            if (!targetUserId)
                throw new InvalidCommandException("لطفا روی کاربر مورد نظر ریپلای کنید")

            let warningCount = this.increaseWarning(targetUserId)

            if (warningCount >= 3) {
                await this.MuteCommand.muteUser(ctx, targetUserId, (Date.now() + 1000 * 24 * 60 * 60 * 1000))

                payload = {
                    isMuted: true,
                    warningCount: 0,
                    isBan: false
                }

                respMsg = `کاربر ${targetUserName} با موفقیت بن شد`
            } else {
                respMsg = `کاربر ${targetUserName}
                تعداد اخطار شما به ${warningCount}
                رسید اگر به 3 برسید برای همیشه میوت میشوید`

                payload['warningCount'] = warningCount
            }

            sessionStorage.write(`user-${targetUserId}`, payload);

            ctx.reply(respMsg, { reply_parameters: { message_id: msgId } });
        } catch (err) {
            ctx.reply(err.message, { reply_parameters: { message_id: msgId } })
            this.logger.error(err)
        }
    }

    increaseWarning(user_id: number) {
        let { warningCount, isBan, isMuted } = sessionStorage.read(`user-${user_id}`) || { warningCount: 0, isBan: false, isMuted: false }
        console.log("user data is ", { isBan, isMuted })
        if (isBan || isMuted)
            throw new InvalidCommandException("کاربر بن یا میتون شده است")
        return ++warningCount
    }
}