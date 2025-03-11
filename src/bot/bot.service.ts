import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Bot, FilterQuery } from 'grammy'
import { IEnv } from "../interface/env.interface";
import { BotCommand } from "../command/abstract/command.abstract";

@Injectable()
export class BotService implements OnApplicationBootstrap {
    protected bot: Bot;

    onApplicationBootstrap() {
        void this.bot.start();
    }

    constructor(private readonly config: ConfigService<IEnv>) {
        const token = this.config.getOrThrow("BOT_TOKEN");
        this.bot = new Bot(token)
    }

    registerCommand(eventName: string, eventAction: BotCommand) {
        this.bot.command(eventName, eventAction.doProcess)
    }

    registerEvent(eventName: FilterQuery, action: BotCommand<'event'>) {
        this.bot.on(eventName, action.doProcess)
    }
}
