import { freeStorage } from "@grammyjs/storage-free";
import { SessionData } from "../types/session.interface";
import { Config } from "../config/global.config";

export const sessionStorage = freeStorage<SessionData>(Config.BotToken);