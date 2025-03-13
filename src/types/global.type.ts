import { CommandContext, Context } from "grammy";
import { MyContext } from "./context.type";

export type Command = CommandContext<MyContext>;
