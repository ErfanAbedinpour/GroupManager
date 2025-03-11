import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BotModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `${process.cwd()}/.env`,
    })
  ],
})
export class AppModule { }
