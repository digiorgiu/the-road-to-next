import { LucideTicketX } from "lucide-react"
import Link from "next/link"

import CardCompact from "@/components/card-compact"
import Placeholder from "@/components/placeholder"
import { buttonVariants } from "@/components/ui/button"
import UpsertTicketForm from "@/features/ticket/components/upsert-ticket-form"
import { ticketsPath } from "@/paths"

import getTicket from "../../../../features/ticket/queries/get-ticket"

type EditPageProps = {
    params: Promise<{
        ticketId: string
    }>
}

export default async function EditPage({ params }: EditPageProps) {
    const ticketId = (await params).ticketId
    const ticket = await getTicket(ticketId)

    if (!ticket) return <Placeholder label="Ticket not found" icon={<LucideTicketX className="size-10" />} button={<Link className={buttonVariants({ variant: "default" })} href={ticketsPath()}>Go to Tickets</Link>} />

    return (
        <CardCompact title="Edit ticket" description="This will edit your ticket" content={<UpsertTicketForm ticket={ticket} />} classNames="w-full max-w-md self-center" />
    )
}