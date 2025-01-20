"use server"

import { redirect } from "next/navigation"

import { setCookieByKey } from "@/actions/cookies"
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"

export default async function deleteTicket(ticketId: string) {
    await prisma.ticket.delete({
        where: {
            id: ticketId
        }
    })
    await setCookieByKey("toast", "Ticket successfully deleted")
    redirect(ticketsPath())
}