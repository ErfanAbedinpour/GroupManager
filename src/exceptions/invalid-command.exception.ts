import { BotException } from "./bot.exception";

export class InvalidCommandException extends BotException {
    constructor(message: string) {
        super(message)
    }
}