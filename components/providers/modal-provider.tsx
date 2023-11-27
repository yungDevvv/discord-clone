"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals/create-server-modal";
import { InviteModal } from "../modals/member-actions/invite-modal";
import ManageMembersModal from "../modals/member-actions/manage-members-modal";
import ServerSettingsModal from "../modals/member-actions/settings-modal";
import CreateChannelModal from "../modals/member-actions/create-channel-modal";
import LeaveServerModal from "../modals/member-actions/leave-server-modal";
import DeleteServerModal from "../modals/member-actions/delete-server-modal";
import DeleteChannelModal from "../modals/member-actions/delete-channel-modal";
import EditChannelModal from "../modals/member-actions/edit-channel-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) return null;
    
    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <ManageMembersModal />
            <ServerSettingsModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
        </>
    )
}