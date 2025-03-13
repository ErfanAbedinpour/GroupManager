import { Injectable, OnModuleInit } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { BotService } from "../bot/bot.service";
import { BanCommand } from "./ban/ban.command";
import { NewMemberJoinHandler } from "./events/onJoinedToGroup";
import { isMemberMiddleware } from "../middleware/isMember.middleware";
import { AuthorizationMiddleware } from "../middleware/auth.middleware";
import { Permission } from "../enums/permission.enum";
import { UnBanCommand } from "./unBan/unBan.command";
import { MuteCommand } from "./mute/mute.command";
import { UnmuteCommand } from "./unMute/unMute.command";
import { WarningCommand } from "./warning/warning.command";

@Injectable()
export class CommandService implements OnModuleInit {

    onModuleInit() {
        this.botService.registerMiddleware(isMemberMiddleware);
        this.botService.registerCommand("start", this.startCommand.doProcess.bind(this.startCommand))
        this.botService.registerCommand("ban", AuthorizationMiddleware(Permission.can_restrict_members), this.banCommand.doProcess.bind(this.banCommand))
        this.botService.registerCommand("free", AuthorizationMiddleware(Permission.can_restrict_members), this.unBanCommand.doProcess.bind(this.unBanCommand))
        this.botService.registerCommand("mute", AuthorizationMiddleware(Permission.can_restrict_members), this.muteCommand.doProcess.bind(this.muteCommand))
        this.botService.registerCommand("unMute", AuthorizationMiddleware(Permission.can_restrict_members), this.unMuteCommand.doProcess.bind(this.unMuteCommand))
        this.botService.registerCommand("warning", AuthorizationMiddleware(), this.warningCommand.doProcess.bind(this.warningCommand))
        this.botService.registerEvent("message:new_chat_members", this.newMemberHandler.doProcess.bind(this.newMemberHandler))
    }

    constructor(
        private readonly startCommand: StartCommand,
        private readonly botService: BotService,
        private readonly banCommand: BanCommand,
        private readonly unBanCommand: UnBanCommand,
        private readonly muteCommand: MuteCommand,
        private readonly unMuteCommand: UnmuteCommand,
        private readonly warningCommand: WarningCommand,
        private readonly newMemberHandler: NewMemberJoinHandler
    ) { }
}