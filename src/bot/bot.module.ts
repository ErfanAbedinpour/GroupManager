import { Global, Module } from "@nestjs/common";
import { BotService } from "./bot.service";

@Global()
@Module({
    exports: [BotService],
    providers: [BotService]
})
export class BotModule { }