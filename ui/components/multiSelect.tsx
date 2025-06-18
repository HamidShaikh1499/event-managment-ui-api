"use client"

import { useState } from "react"

import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectList,
    MultiSelectSearch,
    MultiSelectTrigger,
    MultiSelectValue,
    renderMultiSelectOptions
} from "@/components/ui/multi-select-v2"
import { filter, isEmpty } from "lodash"
import { Label } from "./ui/label"

interface IMultiSelectInput {
    options: any[],
    onValueChange: (values: string[]) => void,
    values: string[],
    placeholder?: string,
    label?: string | null,
    errorMessage?: string | null,
    searchLabel?: string,
    defaultValues?: any[]
}

export function MultiSelectInput({ values, label = null, errorMessage = null, searchLabel = '', defaultValues = [], placeholder = '', onValueChange, options }: IMultiSelectInput) {
    const [search, setSearch] = useState<string>('')

    const filterOptions = () => {
        if (isEmpty(search)) {
            return options;
        }

        return filter(options, (option: any) => option.label.toLowerCase().includes(search.trim().toLowerCase()))
    }

    return (
        <div className="flex flex-col space-y-1 w-full">
            {
                label
                    ? <Label className="font-robot text-xs text-gray-700">{label}</Label>
                    : null
            }
            <MultiSelect
                value={values}
                onSearch={(i: any) => setSearch(i)}
                defaultValue={defaultValues}
                onValueChange={(newValues) => onValueChange(newValues)}
            >
                <MultiSelectTrigger>
                    <MultiSelectValue placeholder={placeholder} />
                </MultiSelectTrigger>
                <MultiSelectContent className="w-full">
                    <MultiSelectSearch
                        value={search}
                        placeholder={searchLabel} />
                    <MultiSelectList className="max-h-56 overflow-x-auto z-10">
                        {renderMultiSelectOptions(filterOptions())}
                    </MultiSelectList>
                </MultiSelectContent>
            </MultiSelect>
            {
                errorMessage
                    ? <Label className="text-xs text-red-500">{errorMessage}</Label>
                    : null
            }
        </div>
    )
}
