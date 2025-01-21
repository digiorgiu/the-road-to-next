"use client"

import { LucideLoader } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "./ui/button";

type LoadingButtonProps = {
    label: string
}

export default function LoadingButton({ label }: LoadingButtonProps) {
    const status = useFormStatus();
    return (
        <Button disabled={status.pending} type="submit">{
            <>
                {status.pending && <LucideLoader className="mr-2 size-4 animate-spin" />}
                {label}
            </>
        }
        </Button>
    )
}