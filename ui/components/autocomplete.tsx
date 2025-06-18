'use client'

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

export default function AutoComplete({
    stateValue,
    stateFunction,
    options,
    label,
    value,
    onValueSelect
}: {
    stateValue?: boolean,
    stateFunction?: any,
    options: any[],
    label: string,
    value?: any,
    onValueSelect: Function
}) {
    return (
        <Popover open={stateValue} onOpenChange={stateFunction}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={stateValue}
                    className="w-full justify-between"
                >
                    {value
                        ? options.find((framework) => framework.value === value)?.label
                        : label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandGroup>
                        {options.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    onValueSelect(currentValue === value ? "" : currentValue)
                                    stateFunction(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}