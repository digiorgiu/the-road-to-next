"use server"

import { redirect } from "next/navigation";
import { z } from "zod";

import { ActionState } from "@/components/form/utils/action-state-type";
import fromErrorToActionState from "@/components/form/utils/from-error-to-action-state";
import { verifyPasswordHash } from "@/lib/auth/password";
import { createSession, generateSessionToken } from "@/lib/auth/session";
import { setSessionTokenCookie } from "@/lib/auth/session-cookie";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export default async function signIn(_state: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const { email, password } = SignInSchema.parse(Object.fromEntries(formData))

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            const error = new Error("User or password are incorrect")
            return fromErrorToActionState(error, formData)
        }

        const validPassword = await verifyPasswordHash(user.passwordHash, password)

        if (!validPassword) {
            const error = new Error("User or password are incorrect")
            return fromErrorToActionState(error, formData)
        }

        const sessionToken = generateSessionToken()

        await createSession(sessionToken, user.id)

        await setSessionTokenCookie(sessionToken, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }

    redirect(ticketsPath())
}