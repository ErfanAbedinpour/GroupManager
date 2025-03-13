import { Module } from "@nestjs/common";
import { StartCommand } from "./start/start.command";
import { CommandService } from "./command.service";
import { NewMemberJoinHandler } from "./events/onJoinedToGroup";
import { BanCommand } from "./ban/ban.command";
import { UnBanCommand } from "./unBan/unBan.command";
import { MuteCommand } from "./mute/mute.command";
import { UnmuteCommand } from "./unMute/unMute.command";
import { WarningCommand } from "./warning/warning.command";

@Module({
    providers: [StartCommand, CommandService, NewMemberJoinHandler, BanCommand, UnBanCommand, MuteCommand, UnmuteCommand, WarningCommand]
})
export class CommandModule {
}