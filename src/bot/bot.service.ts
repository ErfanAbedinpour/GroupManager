import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Bot } from 'grammy'
import { IEnv } from "../interface/env.interface";

@Injectable()
export class BotService implements OnApplicationBootstrap {
    private bot: Bot;
    onApplicationBootstrap() {
        this.bot.command('start', (ctx) => {
            return ctx.reply("Hello From Bot")
        })

        void this.bot.start();
    }

    constructor(private readonly config: ConfigService<IEnv>) {
        // get Bot Token 
        const token = this.config.getOrThrow("BOT_TOKEN");
        this.bot = new Bot(token)
    }
}
