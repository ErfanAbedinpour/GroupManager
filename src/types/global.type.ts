import { CommandContext } from "grammy";
import { MyContext } from "./context.type";

export type Command = CommandContext<MyContext>;
