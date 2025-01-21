import { hashPassword } from "@/lib/auth/password"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const seed = async () => {
    const t0 = performance.now()
    console.log("DB seed started...")

    const passwordHash = await hashPassword("12345678")

    const user = {
        username: "admin",
        email: "admin@admin.com",
        passwordHash
    }

    const tickets = [
        {
            title: "Ticket 1",
            content: "Best ticket 1 from database",
            status: "DONE" as const,
            bounty: 100,
            deadline: new Date().toISOString().split("T")[0]
        },
        {
            title: "Ticket 2",
            content: "Best ticket 2 from database",
            status: "OPEN" as const,
            bounty: 199,
            deadline: new Date().toISOString().split("T")[0]
        },
        {
            title: "Ticket 3",
            content: "Best ticket 3 from database",
            status: "IN_PROGRESS" as const,
            bounty: 599,
            deadline: new Date().toISOString().split("T")[0]
        },
    ]

    await prisma.user.deleteMany({})
    await prisma.ticket.deleteMany({})

    const createdUser = await prisma.user.create({
        data: user
    })

    await prisma.ticket.createMany({
        data: tickets.map((ticket) => ({
            ...ticket,
            userId: createdUser.id
        }))
    })

    const t1 = performance.now()
    console.log(`DB seed finished in ${t1 - t0}ms`)
}

seed()