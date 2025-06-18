"use client"

import { format } from "date-fns"
import { SelectRangeEventHandler } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { IconCalendarMonth } from "@tabler/icons-react"
import { Label } from "../ui/label"

interface IDatePickerWithRange {
    className?: string,
    from: null | Date,
    to: null | Date,
    label?: string | null
    placeholder?: string | null
    onDateChange: SelectRangeEventHandler,
    disableFutureDate?: boolean
}

export function SsDateRangePicker({
    className,
    from,
    to,
    onDateChange,
    disableFutureDate = false,
    label = null,
    placeholder = ''
}: IDatePickerWithRange) {

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="flex flex-col space-y-1">
                        {
                            label
                                ? <Label className="font-robot text-xs text-gray-700">{label}</Label>
                                : null
                        }
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "justify-start text-left font-normal",
                                (!from && !to) && "text-muted-foreground"
                            )}
                        >
                            <IconCalendarMonth className="mr-2 h-4 w-4" />
                            {from ? (
                                to ? (
                                    <>
                                        {format(from, "LLL dd, y")} -{" "}
                                        {format(to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(from, "LLL dd, y")
                                )
                            ) : (
                                <span>{placeholder}</span>
                            )}
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={from || new Date()}
                        selected={{ from, to } as any}
                        onSelect={onDateChange}
                        numberOfMonths={2}
                        disabled={(date) => {
                            if (!disableFutureDate) {
                                return false;
                            }

                            return date > new Date() || date < new Date("1900-01-01")
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
