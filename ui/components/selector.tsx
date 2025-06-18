
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { map } from "lodash"
import { Label } from "./ui/label"
import { Skeleton } from "./ui/skeleton"

interface ISelector {
    selectorClass?: string,
    placeholder: string,
    optionLabel: string,
    options: any[],
    defaultValue?: string | null,
    onValueChange?(value: string): any,
    displayLabel?: string,
    returnValue?: string,
    isLoading?: boolean,
    label?: null | string
    errorMessage?: null | string,
    isDisabled?: boolean
}

export function Selector({
    placeholder,
    selectorClass,
    optionLabel,
    options,
    isLoading = false,
    defaultValue = '',
    onValueChange,
    displayLabel = 'label',
    returnValue = 'value',
    label = null,
    errorMessage = null,
    isDisabled = false
}: ISelector) {
    return (
        <div className="flex flex-col space-y-1 w-full">
            {
                label
                    ? <Label className="font-robot text-xs text-gray-700">{label}</Label>
                    : null
            }
            {
                isLoading
                    ? <Skeleton className="w-full h-10" />
                    : <Select disabled={isDisabled} onValueChange={onValueChange} defaultValue={defaultValue || ''}>
                        <SelectTrigger className={selectorClass}>
                            <SelectValue placeholder={<Label className="text-gray-400 text-sm font-robot">{placeholder}</Label>} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{optionLabel}</SelectLabel>
                                {
                                    map(options, (option: any, pIndex: number) => (
                                        <SelectItem key={pIndex} value={option[returnValue] as any}>{option[displayLabel]}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            }
            {
                errorMessage
                    ? <Label className="text-xs text-red-500">{errorMessage}</Label>
                    : null
            }
        </div>
    )
}
