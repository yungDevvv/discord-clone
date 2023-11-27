import { Channel, ChannelType, Server } from '@prisma/client';
import {create} from 'zustand';

export type ModalType = "createServer" | "Invite" | "createChannel" | "serverSettings" | "ManageMembers" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel";

interface ModalData {
    server?: Server,
    channelType?: ChannelType,
    channel?: Channel
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: ModalData;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({type: null, isOpen: false})
}))