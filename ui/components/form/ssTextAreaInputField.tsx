import { InputHTMLAttributes } from "react"
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface ISsTextAreaInputField extends InputHTMLAttributes<HTMLInputElement> {
    control: any,
    label?: string | null,
    placeholder?: string,
    name: string,
}

export default function SsTextAreaInputField({ control, name, placeholder, label, ...props }: ISsTextAreaInputField) {
    return (
        <div className="flex flex-col space-y-1 w-full">
            {
                label
                    ? <Label className="font-robot text-xs text-gray-700">{label}</Label>
                    : null
            }
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder={placeholder}
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}