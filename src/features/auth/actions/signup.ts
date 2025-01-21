"use server"

import { redirect } from "next/navigation";
import { z } from "zod";

import { ActionState } from "@/components/form/utils/action-state-type";
import fromErrorToActionState from "@/components/form/utils/from-error-to-action-state";
import { hashPassword } from "@/lib/auth/password";
import { createSession, generateSessionToken } from "@/lib/auth/session";
import { setSessionTokenCookie } from "@/lib/auth/session-cookie";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const SignUpSchema = z.object({
    username: z.string().regex(/^[^\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~]+$/, "Username must not contain special characters or spaces"),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

export default async function signUp(_state: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const { username, email, password } = SignUpSchema.parse(Object.fromEntries(formData))
        const passwordHash = await hashPassword(password)
        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash
            }
        })

        const sessionToken = generateSessionToken()

        await createSession(sessionToken, user.id)

        await setSessionTokenCookie(sessionToken, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }

    redirect(ticketsPath())
}