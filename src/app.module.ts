import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from './command/command.module';

@Module({
  imports: [
    BotModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `${process.cwd()}/.env`,
    }),
    CommandModule
  ],
})
export class AppModule { }
