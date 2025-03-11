import { Module } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { CommandService } from "./command.service";
import { NewMemberJoinHandler } from "./events/onJoinedToGroup";
import { BanCommand } from "./ban/ban.command";

@Module({
    providers: [StartCommand, CommandService, NewMemberJoinHandler, BanCommand]
})
export class CommandModule {
}