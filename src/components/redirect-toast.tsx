"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { deleteCookieByKey, getCookieByKey } from "../actions/cookies";


export default function RedirectToast() {
    const pathname = usePathname()
    useEffect(() => {
        const showToast = async () => {
            const message = await getCookieByKey("toast")
            if (!message) return
            toast(message)
            await deleteCookieByKey("toast")
        }
        showToast()
    }, [pathname])

    return null
}