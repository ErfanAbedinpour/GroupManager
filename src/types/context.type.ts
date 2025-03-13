import { Context, SessionFlavor } from "grammy";
import { SessionData } from "./session.interface";

export type MyContext = Context & SessionFlavor<SessionData>;