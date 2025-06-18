import { isEmpty } from "lodash";
import { SearchIcon, X } from "lucide-react";

interface ISsSearchInput {
    value: string
    onChange: (value: string) => void
    onClear: () => void

    placeholder?: string
}

export default function SsSearchInput({ onChange, onClear, value, placeholder = 'Search' }: ISsSearchInput) {
    return (
        <div className="border flex flex-row px-2 py-1.5 space-x-2 items-center rounded-md">
            <SearchIcon className="text-gray-700 w-4 h-4" />

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex flex-grow outline-none font-robot text-sm"
            />

            {
                isEmpty(value)
                    ? null
                    : <X onClick={onClear} className="text-gray-700 cursor-pointer w-4 h-4" />
            }
        </div>
    );
}
