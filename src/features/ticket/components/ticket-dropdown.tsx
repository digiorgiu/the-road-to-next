"use client"

import { Ticket, TicketStatus } from "@prisma/client"
import { LucideEllipsis } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import updateTicketStatus from "../actions/update-ticket-status"
import { TICKET_LABELS } from "../constants"

type TicketDropdownProps = {
    ticket: Ticket
}

export function TicketDropdown({ ticket }: TicketDropdownProps) {

    const handleUpdateTicketStatus = (status: TicketStatus) => {
        const promise = updateTicketStatus(ticket.id, status)

        toast.promise(promise, {
            loading: 'Updating ticket status',
            success: 'Ticket status successfully updated',
            error: 'Error updating ticket status',
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"}>
                    <LucideEllipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={ticket.status}>
                    {Object.keys(TICKET_LABELS).map(key => (
                        <DropdownMenuRadioItem className="cursor-pointer" onClick={() => handleUpdateTicketStatus(key as keyof typeof TICKET_LABELS)} key={key} value={key}>{TICKET_LABELS[key as keyof typeof TICKET_LABELS]}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
