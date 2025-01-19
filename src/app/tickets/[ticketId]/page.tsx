import { LucideTicketX } from "lucide-react"
import Link from "next/link"

import Placeholder from "@/components/placeholder"
import { buttonVariants } from "@/components/ui/button"
import TicketItem from "@/features/ticket/components/ticket-item"
import getTicket from "@/features/ticket/queries/get-ticket"
import { ticketsPath } from "@/paths"

type TicketPageProps = {
    params: Promise<{
        ticketId: string
    }>
}

export default async function TicketPage({ params }: TicketPageProps) {
    const ticketId = (await params).ticketId
    const foundTicket = await getTicket(ticketId)

    if (!foundTicket) return <Placeholder label="Ticket not found" icon={<LucideTicketX className="size-10" />} button={<Link className={buttonVariants({ variant: "default" })} href={ticketsPath()}>Go to Tickets</Link>} />

    return (
        <div className="flex w-full justify-center">
            <TicketItem ticket={foundTicket} isDetail />
        </div>
    )
}