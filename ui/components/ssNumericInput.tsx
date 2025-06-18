import { isEmpty, toString } from "lodash";
import { InputHTMLAttributes, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ISsNumericInput extends InputHTMLAttributes<HTMLInputElement> {
    numericValue: number
    onValueChange: (val: number | undefined) => void
    label: string
    placeholder?: string,
    errorMessage?: string | null
};

export default function SsNumericInput({ label, onValueChange, numericValue, placeholder = '', errorMessage = null, ...props }: ISsNumericInput) {
    const [inputValue, setInputValue] = useState<string>(toString(numericValue));

    const _onChange = (_value: string) => {
        if (isEmpty(_value)) {
            setInputValue(_value);
            return onValueChange(undefined);
        }

        if (new RegExp(/^\d+$/).test(_value)) {
            setInputValue(_value);
            onValueChange(Number(_value));
        }
    }

    return (
        <div className="flex flex-col space-y-1 w-full">
            {
                label
                    ? <Label className="font-robot text-xs text-gray-700">{label}</Label>
                    : null
            }
            <Input onChange={(e) => _onChange(e.target.value)} value={inputValue} placeholder={placeholder} {...props} />
            {
                errorMessage
                    ? <Label className="text-xs text-red-500">{errorMessage}</Label>
                    : null
            }
        </div>
    );
}