"use client"

import { Ticket } from "@prisma/client";
import { LucideLoader } from "lucide-react";
import { useActionState, useRef } from "react";

import { DatePicker, DatePickerRef } from "@/components/date-picker";
import Form from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fromCents } from "@/utils/format-currency";

import FormError from "../../../components/form/form-error";
import upsertTicket from "../actions/upsert-ticket";

type UpsertTicketFormProps = {
    ticket?: Ticket
}

export default function UpsertTicketForm({ ticket }: UpsertTicketFormProps) {
    const [actionState, upsertAction, isPending] = useActionState(upsertTicket.bind(null, ticket?.id), {
        message: "",
        fieldErrors: {},
        payload: new FormData()
    })

    const datePickerRef = useRef<DatePickerRef>(null)

    const handelOnSuccess = () => {
        if (datePickerRef.current) {
            datePickerRef.current.resetDate()
        }
    }

    return (
        <Form action={upsertAction} actionState={actionState} onSuccess={handelOnSuccess} classNames="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-1">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={ticket?.title || (actionState.payload.get("title") as string || "")} />
                <FormError name="title" fieldErrors={actionState.fieldErrors} />
            </div>
            <div className="flex w-full flex-col gap-1">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" defaultValue={ticket?.content || (actionState.payload.get("content") as string || "")} />
                <FormError name="content" fieldErrors={actionState.fieldErrors} />
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="flex w-full flex-col gap-1">
                    <Label htmlFor="deadline">Deadline</Label>
                    <DatePicker ref={datePickerRef} defaultValue={ticket?.deadline || (actionState.payload.get("deadline") as string || "")} />
                    <FormError name="deadline" fieldErrors={actionState.fieldErrors} />
                </div>
                <div className="flex w-full flex-col gap-1">
                    <Label htmlFor="bounty">Bounty</Label>
                    <Input id="bounty" name="bounty" type="number" step={.01} defaultValue={(actionState.payload.get("bounty") as string) ?? (ticket?.bounty ? fromCents(ticket.bounty) : "")} />
                    <FormError name="bounty" fieldErrors={actionState.fieldErrors} />
                </div>
            </div>
            <Button disabled={isPending} type="submit">{
                <>
                    {isPending && <LucideLoader className="mr-2 size-4 animate-spin" />}
                    {ticket ? "Update" : "Create"}
                </>
            }
            </Button>
        </Form>
    )
}