import { Member, MemberRole, Profile, Server } from "@prisma/client";

export type ServerWithProfilesWithMembers = Server & {
    members: (Member & {profile: Profile})[];
} 