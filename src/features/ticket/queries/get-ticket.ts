import { prisma } from "@/lib/prisma"

export default async function getTicket(ticketId: string) {
    return await prisma.ticket.findUnique({
        where: {
            id: ticketId
        },
        include: {
            User: {
                select: {
                    username: true
                }
            }
        }
    })
}