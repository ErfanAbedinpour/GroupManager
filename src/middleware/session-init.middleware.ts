import { SessionData } from "../types/session.interface";

export function initial(): SessionData {
    return { warningCount: 0 };
}