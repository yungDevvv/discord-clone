"use client";

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export const InviteModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "Invite";
    const { server } = data;

    const [copied, setCopied] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000)
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className='p-6'>
                    <Label
                        className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'
                    >
                        Server invite link
                    </Label>
                    <div className='flex items-center mt-2 gap-x-2'>
                        <Input
                            className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                            value={inviteUrl}
                        />
                        <Button
                            size={"icon"}
                            onClick={onCopy}
                        >
                            {copied ? <Check /> : <Copy className='w-4 h-4' />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
