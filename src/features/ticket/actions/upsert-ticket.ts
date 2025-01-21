"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { setCookieByKey } from "@/actions/cookies"
import { getCurrentSession } from "@/lib/auth/get-current-session"
import { prisma } from "@/lib/prisma"
import { signInPath, ticketPath, ticketsPath } from "@/paths"
import { toCents } from "@/utils/format-currency"

import { ActionState } from "../../../components/form/utils/action-state-type"
import fromErrorToActionState from "../../../components/form/utils/from-error-to-action-state"

const UpsertTicketSchema = z.object({
    title: z.string().min(1).max(60),
    content: z.string().min(1).max(1000),
    bounty: z.coerce.number().positive(),
    deadline: z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,
        "Date must be in yyyy-MM-dd format")
})

export default async function upsertTicket(id: string | undefined, _state: ActionState, formData: FormData): Promise<ActionState> {

    const { user } = await getCurrentSession()

    if (!user) {
        redirect(signInPath())
    }

    try {
        const data = UpsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            bounty: formData.get("bounty"),
            deadline: formData.get("deadline")
        })

        const dataWithCents = {
            ...data,
            userId: user.id,
            bounty: toCents(data.bounty)
        }

        await prisma.ticket.upsert({
            where: {
                id: id || ""
            },
            update: dataWithCents,
            create: dataWithCents
        })
    } catch (error) {
        return fromErrorToActionState(error, formData)
    }


    revalidatePath(ticketsPath())
    if (id) {
        await setCookieByKey("toast", "Ticket successfully updated")
        redirect(ticketPath(id))
    }
    return {
        message: "Ticket successfully created",
        fieldErrors: {},
        payload: new FormData(),
        status: "SUCCESS"
    }
}