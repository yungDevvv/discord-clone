"use client";

import { Member, MemberRole, Profile } from "@prisma/client";
import UserAvatar from "../ui/user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import * as z from "zod"
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";



interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIcon = {
    "GUEST": null,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />

}

const formSchema = z.object({
    content: z.string().min(1)
})

const ChatItem = ({
    id,
    content,
    currentMember,
    timestamp,
    fileUrl,
    deleted,
    socketUrl,
    socketQuery,
    member
}: ChatItemProps) => {
    const { onOpen } = useModal();
    const router = useRouter();

    const fileType = fileUrl?.split(".").pop();

    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isMessageOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isMessageOwner);
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;

    const handleNavigate = () => {
        if(member.id !== id) {
            router.push("/servers/" + socketQuery.serverId + "/conversations/" + member.id)
        }
    }

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor pointer hover:drop-shadow-md transition">
                    <UserAvatar
                        src={member.profile.imageUrl}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p
                                className="font-semibold text-sm hover:underline cursor-pointer"
                                onClick={handleNavigate}
                            >
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIcon[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{timestamp}</span>
                    </div>
                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <Image
                                src={fileUrl}
                                alt={content}
                                fill
                                className="object-cover"
                            />
                        </a>
                    )}
                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                            >
                                PDF File
                            </a>
                        </div>
                    )}
                    {!fileUrl && (
                        <p className={cn(
                            "text-sm text-zinc-600 dark:text-zinc-300",
                            deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                        )}>
                            {content}
                        </p>
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border-rounded-sm">

                    <ActionTooltip label="Delete">
                        <Trash
                            onClick={() => onOpen("deleteMessage", {
                                apiUrl: `${socketUrl}/${id}`,
                                query: socketQuery
                            })}
                            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transiiton"
                        />
                    </ActionTooltip>
                </div>
            )}
        </div>
    );
}

export default ChatItem;