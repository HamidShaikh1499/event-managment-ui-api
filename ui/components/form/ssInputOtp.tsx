"use client"

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "../ui/label"

interface ISsInputOTPForm {
    label: string,
    control: any,
    name: string
}

export function SsInputOTPForm({ label, control, name }: ISsInputOTPForm) {

    return (
        <div className="flex flex-col">
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
                            <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                </InputOTPGroup>

                                <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>

                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
