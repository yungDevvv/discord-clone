import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const profile = await currentProfile();
        if(!profile) return new NextResponse("Unautrorized", {status: 401});

        const {searchParams} = new URL(req.url);
        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId");

        if(!channelId) return new NextResponse("Channel ID missing", {status: 400});

        let messages: Message[] = [];

        if(cursor) {
            messages = await db.message.findMany({
                take: 10,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        } else {
            messages = await db.message.findMany({
                take: 10,
                where: {
                    channelId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        }

        let nextCursor = null;

        if(messages.length === 10) {
            nextCursor = messages[10 - 1].id
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })
    } catch (error) {
        console.log("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}