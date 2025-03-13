import { ConfigService } from "@nestjs/config"
import { IEnv } from "../interface/env.interface"

const configService = new ConfigService<IEnv>()

export const Config = {
    BotToken: configService.getOrThrow("BOT_TOKEN")
}