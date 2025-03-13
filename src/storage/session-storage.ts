import { MemorySessionStorage } from "grammy";
import { SessionData } from "../types/session.interface";

export const sessionStorage = new MemorySessionStorage<SessionData>();