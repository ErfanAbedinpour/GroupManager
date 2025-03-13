import { BotCommand } from "../abstract/command.abstract";
import { InvalidCommandException } from "../../exceptions/invalid-command.exception";
import { BotException } from "../../exceptions/bot.exception";
import { BadArgument } from "../../exceptions/argument.exception";
import { Command } from "../../types/global.type";
import { UnexpectedException } from "../../exceptions/unknown.exception";
import { Logger } from "@nestjs/common";

export class MuteCommand implements BotCommand {
    private logger = new Logger(MuteCommand.name)
    async doProcess(ctx: Command): Promise<void> {
        const targetUser = ctx.message?.reply_to_message?.from?.id
        const length = ctx.entities()[0].length;
        const msgId = ctx.message!.message_id;

        try {
            if (!targetUser)
                throw new InvalidCommandException("لطفا روی کاربر مورد نظر ریپلای کنید")

            const timeInMinute = Number(ctx.message?.text.slice(length).trim());

            if (!timeInMinute)
                throw new BadArgument("لطفا فرمت درست وارد کنید برای دیدن فرمت درست لطفا /start رو بزنید")

            const stamp = (timeInMinute * 60 * 1000) + Date.now()
            const result = await this.muteUser(ctx, targetUser, stamp)

            if (!result)
                throw new UnexpectedException("ارور ناشناخته لطفا بعدا دوباره امتحان کنید")

            ctx.reply("کاربر با موفقیت میوت شد ", { reply_parameters: { message_id: msgId } });
            return
        } catch (err) {
            if (err instanceof BotException)
                ctx.reply(err.message, { reply_parameters: { message_id: msgId } })

            this.logger.error(err)
        }
    }

    private muteUser(ctx: Command, user_id: number, until: number) {
        console.log('stamp is ', until)
        return ctx.restrictChatMember(user_id, {
            can_change_info: false,
            can_invite_users: false,
            can_send_audios: false,
            can_pin_messages: false,
            can_send_messages: false,
            can_send_polls: false,
            can_send_videos: false,
            can_send_voice_notes: false,
            can_send_video_notes: false,
            can_send_photos: false,
            can_send_other_messages: false,
            can_send_documents: false,
            can_add_web_page_previews: false,
            can_manage_topics: false
        }, {
            until_date: until
        })
    }
}
