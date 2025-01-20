"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Ref,useImperativeHandle, useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type DatePickerRef = {
    resetDate: () => void
}

type DatePickerProps = {
    defaultValue: string
    ref: Ref<DatePickerRef>
}

export function DatePicker({ defaultValue, ref }: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(
        defaultValue.trim() !== "" ? new Date(defaultValue) : new Date()
    )

    useImperativeHandle(ref, () => ({
        resetDate: () => {
            setDate(new Date())
        }
    }))

    const formattedDate = date ? format(date, "yyyy-MM-dd") : ""

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {formattedDate}
                    <input className="hidden" name="deadline" defaultValue={formattedDate} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
