import { Ticket } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import upsertTicket from "../actions/upsert-ticket";

type UpsertTicketFormProps = {
    ticket?: Ticket
}

export default function UpsertTicketForm({ ticket }: UpsertTicketFormProps) {
    return (
        <form action={upsertTicket.bind(null, ticket?.id)} className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-1">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={ticket?.title} />
            </div>
            <div className="flex w-full flex-col gap-1">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" defaultValue={ticket?.content} />
            </div>
            <Button type="submit">{ticket ? "Update" : "Create"}</Button>
        </form>
    )
}