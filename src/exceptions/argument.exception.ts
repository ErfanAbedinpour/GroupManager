import { BotException } from "./bot.exception";

export class BadArgument extends BotException {
    constructor(message: string) {
        super(message)
    }
}