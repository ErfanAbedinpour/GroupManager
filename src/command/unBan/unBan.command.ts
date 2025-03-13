import { GrammyError } from "grammy";
import { BotCommand } from "../abstract/command.abstract";
import { Command } from "src/types/global.type";
import { sessionStorage } from "../../storage/session-storage";

export class UnBanCommand implements BotCommand {
  async doProcess(ctx: Command): Promise<void> {
    const targetUser = ctx.message?.reply_to_message?.from?.id;
    const targetUserFirstName = ctx.message?.reply_to_message?.from?.first_name;

    const msgId = ctx.message!.message_id;

    try {
      if (!targetUser) throw new Error("لطفا روی کاربر مورد نظر ریپلای کنید");

      const result = await this.unBanChatMember(ctx, targetUser);

      if (!result)
        throw new Error(
          "ارور در هنگام ان بن کردن. لطفا بعدا دوباره امتحان کنید",
        );

      this.updateSession(targetUser)
      ctx.reply(`کاربر ${targetUserFirstName} با موفقیت ازاد شد `, { reply_parameters: { message_id: msgId } });

    } catch (err) {
      console.error(err)
      if (err instanceof GrammyError) {
        switch (err.cause) {
          case 400: {
            ctx.reply("ویژگی ان بن برای سوپر گروه ها در دسترس هست")
          }
        }
      }
      ctx.reply(err.message, { reply_parameters: { message_id: msgId } });
    }
  }

  updateSession(user_id: number): void {
    const { isMuted, warningCount } = sessionStorage.read(`user-${user_id}`) || { isMuted: false, warningCount: 0 }
    sessionStorage.write(`user-${user_id}`, { warningCount, isBan: false, isMuted })
  }

  private unBanChatMember(ctx: Command, userId: number): Promise<boolean> {
    return ctx.unbanChatMember(userId, { only_if_banned: true });
  }
}
