import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Bot, FilterQuery, MiddlewareFn, MiddlewareObj } from 'grammy'
import { IEnv } from "../interface/env.interface";
import { BotCommand } from "../command/abstract/command.abstract";
import { Middleware } from "../types/middleware.types";

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

    registerCommand(eventName: string, eventAction: Middleware) {
        this.bot.command(eventName, eventAction)
    }

    registerEvent(eventName: FilterQuery, action: Middleware) {
        this.bot.on(eventName, action)
    }


    registerMiddleware(middleware: Middleware) {
        this.bot.use(middleware)
    }
}
