import { prisma } from "@/lib/prisma";

export default async function getTickets() {
    return await prisma.ticket.findMany({
        orderBy: {
            createdAt: "desc"
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