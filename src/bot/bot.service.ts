import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Bot, FilterQuery, session } from 'grammy'
import { IEnv } from "../interface/env.interface";
import { Middleware } from "../types/middleware.types";
import { MyContext } from "../types/context.type";
import { initial } from "../middleware/session-init.middleware";
import { sessionStorage } from "../storage/session-storage";

@Injectable()
export class BotService implements OnApplicationBootstrap {
    protected bot: Bot;

    onApplicationBootstrap() {
        void this.bot.start();
    }

    constructor(private readonly config: ConfigService<IEnv>) {
        const token = this.config.getOrThrow("BOT_TOKEN");
        this.bot = new Bot<MyContext>(token)
        this.bot.use(session({
            initial: initial,
            getSessionKey: (ctx) => ctx.from?.id.toString(),
            prefix: "user-",
            storage: sessionStorage
        }))
    }

    registerCommand(eventName: string, ...eventActions: Middleware[]) {
        this.bot.command(eventName, ...eventActions)
    }

    registerEvent(eventName: FilterQuery, ...actions: Middleware[]) {
        this.bot.on(eventName, ...actions)
    }


    registerMiddleware(middleware: Middleware) {
        this.bot.use(middleware)
    }
}
