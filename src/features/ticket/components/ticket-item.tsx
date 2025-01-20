import { Ticket } from "@prisma/client"
import clsx from "clsx"
import { LucidePencil, LucideSquareArrowOutUpRight, LucideTrash } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ticketEditPath, ticketPath } from "@/paths"
import { formatCurrency } from "@/utils/format-currency"

import deleteTicket from "../actions/delete-tickets"
import { TICKET_ICONS } from "../constants"
import { TicketDropdown } from "./ticket-dropdown"

type TicketItemProps = {
    ticket: Ticket
    isDetail?: boolean
}

export default function TicketItem({ ticket, isDetail = false }: TicketItemProps) {

    const detailButton = (
        <Button asChild size={"icon"}>
            <Link prefetch href={ticketPath(ticket.id)}>
                <LucideSquareArrowOutUpRight />
            </Link>
        </Button>
    )

    const editButton = (
        <Button asChild size={"icon"}>
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil />
            </Link>
        </Button>
    )

    const deleteButton = (
        <form action={deleteTicket.bind(null, ticket.id)}>
            <Button size={"icon"}>
                <LucideTrash />
            </Button>
        </form>
    )

    return (
        <div className={clsx("flex w-full gap-2", {
            "max-w-[580px]": isDetail,
            "max-w-[428px]": !isDetail
        })}>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex gap-2">
                        <span>{TICKET_ICONS[ticket.status]}</span>
                        <span>{ticket.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={clsx({
                        "line-clamp-3": !isDetail
                    })}>{ticket.content}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <span>{ticket.deadline}</span>
                    <span className="font-bold">{formatCurrency(ticket.bounty)}</span>
                </CardFooter>
            </Card>
            <div className="flex flex-col gap-2">
                {isDetail ?
                    <>
                        {editButton}
                        {deleteButton}
                        <TicketDropdown ticket={ticket} />
                    </>
                    :
                    <>
                        {detailButton}
                        {editButton}
                    </>
                }
            </div>
        </div>
    )
}