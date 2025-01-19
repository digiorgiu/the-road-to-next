import { Suspense } from "react"

import CardCompact from "@/components/card-compact"
import Heading from "@/components/heading"
import Spinner from "@/components/spinner"
import TicketsList from "@/features/ticket/components/tickets-list"
import UpsertTicketForm from "@/features/ticket/components/upsert-ticket-form"

export default function TicketsPage() {
    return (
        <div className="flex flex-1 flex-col gap-y-8">
            <Heading title="Tickets" description="The place where all your tickets live" />
            <CardCompact
                title="Create New Ticket"
                description="This will create a new ticket"
                classNames="w-full max-w-[428px] self-center"
                content={<UpsertTicketForm />}
            />
            <Suspense fallback={<Spinner />}>
                <TicketsList />
            </Suspense>
        </div>
    )
}