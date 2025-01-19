import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const tickets = [
    {
        title: "Ticket 1",
        content: "Best ticket 1 from database",
        status: "DONE" as const
    },
    {
        title: "Ticket 2",
        content: "Best ticket 2 from database",
        status: "OPEN" as const
    },
    {
        title: "Ticket 3",
        content: "Best ticket 3 from database",
        status: "IN_PROGRESS" as const
    },
]

const seed = async () => {
    const t0 = performance.now()
    console.log("DB seed started...")

    await prisma.ticket.deleteMany({})

    await prisma.ticket.createMany({
        data: tickets
    })

    const t1 = performance.now()
    console.log(`DB seed finished in ${t1-t0}ms`)
}

seed()