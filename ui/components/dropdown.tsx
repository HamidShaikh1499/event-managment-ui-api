import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ILabelValue from "@/lib/appInterface/ILabelValue"
import { map } from "lodash"
import React from "react"
import { Label } from "./ui/label"
import { FileIcon } from "lucide-react"

export interface IDropdownOption extends ILabelValue {
  icon?: any
}

interface IDropdown {
  triggerChild: React.ReactNode,
  label: string,
  options: IDropdownOption[],
  onChange: (value: any) => void
}

export default function Dropdown({
  triggerChild,
  label,
  options,
  onChange
}: IDropdown) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerChild}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Label className="text-xs text-gray-900 font-robot">{label}</Label>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          map(options, (option: IDropdownOption, index: number) => (
            <DropdownMenuItem
              disabled={option.isDisabled}
              onClick={() => onChange(option.value)}
              key={index}
              className="flex flex-row items-center space-x-2"
            >
              {option.icon}
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}