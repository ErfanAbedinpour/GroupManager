import { Injectable, OnModuleInit } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { BotService } from "../bot/bot.service";
import { BanCommand } from "./ban/ban.command";

@Injectable()
export class CommandService implements OnModuleInit {

    onModuleInit() {
        this.botService.registerCommand("start", this.startCommand)
        this.botService.registerCommand("ban", this.banCommand)
    }

    constructor(
        private readonly startCommand: StartCommand,
        private readonly botService: BotService,
        private readonly banCommand: BanCommand
    ) { }
}