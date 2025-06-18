import { InputHTMLAttributes, useState } from "react"
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { IconEye } from "@tabler/icons-react";

interface ISsInputPasswordField extends InputHTMLAttributes<HTMLInputElement> {
    control: any,
    label?: string | null,
    placeholder?: string,
    name: string,
}

export default function SsInputPasswordField({ control, name, label = null, placeholder = '', ...props }: ISsInputPasswordField) {
    const [type, setType] = useState<'password' | 'text'>('password');

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
                    <FormItem className="w-full">
                        <FormControl className="w-full">
                            <Input type={type} placeholder={placeholder} {...field} {...props} />
                        </FormControl>
                        <FormMessage className='text-xs' />
                    </FormItem>
                )}
            />
        </div>
    )
}