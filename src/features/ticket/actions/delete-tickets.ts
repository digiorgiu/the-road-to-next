"use server"

import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"

export default async function deleteTicket(ticketId: string) {
    await prisma.ticket.delete({
        where: {
            id: ticketId
        }
    })
    
    redirect(ticketsPath())
}