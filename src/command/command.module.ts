import { Module } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { CommandService } from "./command.service";

@Module({
    providers: [StartCommand, CommandService]
})
export class CommandModule {
}