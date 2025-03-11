import { Injectable, OnModuleInit } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { BotService } from "../bot/bot.service";
import { BanCommand } from "./ban/ban.command";
import { NewMemberJoinHandler } from "./events/onJoinedToGroup";

@Injectable()
export class CommandService implements OnModuleInit {

    onModuleInit() {
        this.botService.registerCommand("start", this.startCommand)
        this.botService.registerCommand("ban", this.banCommand)
        this.botService.registerEvent("message:new_chat_members", this.newMemberHandler)
    }

    constructor(
        private readonly startCommand: StartCommand,
        private readonly botService: BotService,
        private readonly banCommand: BanCommand,
        private readonly newMemberHandler: NewMemberJoinHandler
    ) { }
}