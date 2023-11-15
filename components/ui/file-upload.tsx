"use client"

import { UploadDropzone } from "@/lib/uploadthing";
import { deleteImage } from "@/app/api/uploadthing/api";
import "@uploadthing/react/styles.css"
import { X } from 'lucide-react'
import Image from "next/image";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage"
}

export const FileUpload = ({
    endpoint,
    value,
    onChange
}: FileUploadProps) => {
    const fileType = value?.split('.').pop();
    const test = async (value: string) => {
        onChange("")
        console.log(value)
        await deleteImage(value)
        
    }
    if (value && fileType !== 'pdf') {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="upload"
                    className="rounded-full"
                />
                <button
                    onClick={() => test(value)}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}