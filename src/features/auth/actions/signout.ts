"use server"

import { redirect } from "next/navigation"

import { getCurrentSession } from "@/lib/auth/get-current-session"
import { invalidateSession } from "@/lib/auth/session"
import { deleteSessionTokenCookie } from "@/lib/auth/session-cookie"
import { signInPath } from "@/paths"

export default async function signOut() {
    const { session } = await getCurrentSession()
    if (!session) {
        redirect(signInPath())
    }
    await invalidateSession(session.id)
    await deleteSessionTokenCookie()

    redirect(signInPath())
}