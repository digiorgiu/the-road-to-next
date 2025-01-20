"use server"

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod"

import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const UpdateTicketStatusSchema = z.object({
    ticketId: z.string(),
    status: z.enum([TicketStatus.DONE, TicketStatus.OPEN, TicketStatus.IN_PROGRESS])
})

export default async function updateTicketStatus(ticketId: string, status: TicketStatus) {

    const data = UpdateTicketStatusSchema.parse({
        ticketId,
        status
    })

    await prisma.ticket.update({
        where: {
            id: data.ticketId
        },
        data: {
            status: data.status
        }
    })

    revalidatePath(ticketPath(data.ticketId))
}