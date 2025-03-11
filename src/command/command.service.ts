import { Injectable, OnModuleInit } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { BotService } from "../bot/bot.service";

@Injectable()
export class CommandService implements OnModuleInit {

    onModuleInit() {
        this.botService.registerCommand("start", this.startCommand)
    }

    constructor(private readonly startCommand: StartCommand, private botService: BotService) { }
}