import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        if(!params.serverId) return new NextResponse("Server ID missing", { status: 400 });
        
        "GUEST - 123"
        "ADMIN - asdasd"

        const server = db.server.update({
            where: {
                id: params.serverId,
                profileId: { // profile id asdasd is not 
                    not: profile.id 
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        })
        

    } catch (error) {
        console.log("[SERVERS_ID_LEAVE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}