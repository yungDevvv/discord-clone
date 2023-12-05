import {Server as NetServer, Socket} from "net"
import {Server as SocketIOServer} from "socket.io"
import { Member, MemberRole, Message, Profile, Server } from "@prisma/client";
import { NextApiResponse } from "next";

export type ServerWithProfilesWithMembers = Server & {
    members: (Member & {profile: Profile})[];
} 

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        }
    }
}
export type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}