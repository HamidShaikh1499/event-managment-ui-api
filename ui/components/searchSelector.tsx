"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ILabelValue from "@/lib/appInterface/ILabelValue"
import { cn } from "@/lib/utils"
import { IconCaretUpDown, IconCheckbox } from "@tabler/icons-react"
import { CommandList } from "cmdk"
import { Label } from "./ui/label"
import { size } from "lodash"

interface ISearchSelector {
    options: any[],
    placeholder: string,
    value?: string | undefined | null,
    onValueChange: (val: string) => void,
    className?: string,
    displayLabel?: string,
    returnValue?: string,
    handleLongName?: boolean,
    longNameCharAt?: number
}

export function SearchSelector({
    options,
    placeholder,
    value,
    onValueChange,
    className = '',
    displayLabel = 'label',
    returnValue = 'value',
    handleLongName = false,
    longNameCharAt = 8,
}: ISearchSelector) {
    const [open, setOpen] = React.useState(false)

    const getValue = () => {
        if (value) {
            const findValue: any = options.find((framework) => framework[returnValue] === value);
            if (!findValue) {
                return placeholder;
            }

            if (handleLongName && size(findValue[displayLabel]) > longNameCharAt) {
                return `${findValue[displayLabel].substring(0, longNameCharAt)}...`
            }

            return findValue[displayLabel];
        }

        return placeholder;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between w-full"
                >
                    <Label className="text-gray-500 font-robot">{getValue()}</Label>
                    <IconCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-96">
                <Command className="w-[100%]">
                    <CommandInput placeholder="Search..." className="h-9" />
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandList className="w-[100%]">
                        {options.map((framework: any, index: number) => (
                            <CommandItem
                                key={index}
                                value={framework[returnValue]}
                                onSelect={(currentValue) => {
                                    onValueChange(currentValue)
                                    setOpen(false)
                                }}
                            >
                                {framework[displayLabel]}
                                <IconCheckbox
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === framework[returnValue] ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
