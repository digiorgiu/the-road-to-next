import getTickets from "../queries/get-tickets";
import TicketItem from "./ticket-item";

export default async function TicketsList() {
    const tickets = await getTickets()
    return (
        <div className="flex flex-1 animate-fade-from-top flex-col items-center gap-y-4">
                {tickets.map((ticket) => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </div>
    )
}