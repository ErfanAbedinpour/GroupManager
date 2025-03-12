import { Injectable, OnModuleInit } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { BotService } from "../bot/bot.service";
import { BanCommand } from "./ban/ban.command";
import { NewMemberJoinHandler } from "./events/onJoinedToGroup";
import { isMemberMiddleware } from "../middleware/isMember.middleware";
import { AuthorizationMiddleware } from "../middleware/auth.middleware";
import { Permission } from "../enums/permission.enum";
import { UnBanCommand } from "./unBan/unBan.service";

@Injectable()
export class CommandService implements OnModuleInit {

    onModuleInit() {
        this.botService.registerMiddleware(isMemberMiddleware);
        this.botService.registerCommand("start", this.startCommand.doProcess.bind(this.startCommand))
        this.botService.registerCommand("ban", AuthorizationMiddleware(Permission.can_restrict_members), this.banCommand.doProcess.bind(this.banCommand))
        this.botService.registerCommand("free", AuthorizationMiddleware(Permission.can_restrict_members), this.unBanCommand.doProcess.bind(this.unBanCommand))
        this.botService.registerEvent("message:new_chat_members", this.newMemberHandler.doProcess.bind(this.newMemberHandler))
    }

    constructor(
        private readonly startCommand: StartCommand,
        private readonly botService: BotService,
        private readonly banCommand: BanCommand,
        private readonly unBanCommand: UnBanCommand,
        private readonly newMemberHandler: NewMemberJoinHandler
    ) { }
}