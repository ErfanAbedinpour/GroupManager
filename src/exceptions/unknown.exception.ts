import { BotException } from "./bot.exception";

export class UnexpectedException extends BotException {
    constructor(message: string) {
        super(message)
    }
}