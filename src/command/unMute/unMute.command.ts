import { CommandContext, Context } from "grammy";
import { BotCommand } from "../abstract/command.abstract";
import { Command } from "../../types/global.type";
import { BotException } from "../../exceptions/bot.exception";
import { InvalidCommandException } from "../../exceptions/invalid-command.exception";
import { UnexpectedException } from "../../exceptions/unknown.exception";
import { sessionStorage } from "../../storage/session-storage";

export class UnmuteCommand implements BotCommand {

    async doProcess(ctx: Command): Promise<void> {
        const msgId = ctx.message!.message_id
        const targetUserId = ctx.message?.reply_to_message?.from?.id
        const targetUserName = ctx.message?.reply_to_message?.from?.first_name

        try {
            if (!targetUserId)
                throw new InvalidCommandException("لطفا روی کاربر مورد نظر ریپلای کنید")

            const res = await this.unMuteUser(ctx, targetUserId)

            if (!res)
                throw new UnexpectedException("خطایی رخ داد لطفا بعدا دوباره امتحان کنید")


            this.updateSession(targetUserId)
            ctx.reply(`${targetUserName} با موفیت ازاد شد`, { reply_parameters: { message_id: msgId } })

        } catch (err) {
            if (err instanceof BotException)
                ctx.reply(err.message, { reply_parameters: { message_id: msgId } })
        }

    }

    updateSession(user_id: number): void {
        const { isBan, warningCount } = sessionStorage.read(`user-${user_id}`) || { isBan: false, warningCount: 0 }
        sessionStorage.write(`user-${user_id}`, { warningCount, isBan, isMuted: false })
    }

    private unMuteUser(ctx: Command, userId: number) {
        return ctx.restrictChatMember(userId, {
            can_send_messages: true,
            can_send_audios: true,
            can_invite_users: true,
            can_send_documents: true,
            can_send_other_messages: true,
            can_send_videos: true,
            can_send_video_notes: true,
            can_send_photos: true,
            can_send_voice_notes: true
        })
    }

}