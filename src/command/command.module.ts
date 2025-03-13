import { Module } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { CommandService } from "./command.service";
import { NewMemberJoinHandler } from "./events/onJoinedToGroup";
import { BanCommand } from "./ban/ban.command";
import { UnBanCommand } from "./unBan/unBan.service";
import { MuteCommand } from "./mute/mute.service";

@Module({
    providers: [StartCommand, CommandService, NewMemberJoinHandler, BanCommand, UnBanCommand, MuteCommand]
})
export class CommandModule {
}