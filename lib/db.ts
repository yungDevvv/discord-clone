import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// in production hot reload next 13 to not initialize too many prisma clients
if(process.env.NODE_ENV !== "production") globalThis.prisma = db;