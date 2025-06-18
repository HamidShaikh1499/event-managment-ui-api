import { cloneDeep, filter, map } from 'lodash';
import { useState } from 'react';

import { Label } from '@/components/ui/label';

import { X } from 'lucide-react';

interface ISsTagInput {
    tags: string[]
    defaultTags: string[]
    onTagsChange: (tags: string[]) => void
    onError?: (message: string) => void
    label?: string | null
    placeholder?: string
    isDuplicateAllow?: boolean,
    errorMessage?: string | null | undefined
}

export default function SsTagInput({
    tags,
    onTagsChange,
    onError,
    defaultTags = [],
    isDuplicateAllow = true,
    label = null,
    placeholder = '',
    errorMessage = null
}: ISsTagInput) {
    const [value, setValue] = useState<string>('');

    const onkeydown = (key: string) => {
        if (key !== 'Enter' || value.length === 0) {
            return;
        }

        const _value = cloneDeep(value.trim());
        setValue('');
        if (isDuplicateAllow) {
            return onTagsChange([...tags, _value]);
        }

        const isDuplicate = [...tags, ...defaultTags].includes(_value);
        if (isDuplicate && onError) {
            return onError(`${_value} is already in tags.`)
        }

        onTagsChange([...tags, _value]);
    };

    const _onTagsChange = (tag: string) => {
        const filteredValues = filter(tags, (_tag: string) => _tag !== tag);
        onTagsChange(filteredValues);
    };

    return (
        <div className="flex flex-col space-y-1">
            {
                label
                    ? <Label className="font-robot text-xs text-gray-700">{label}</Label>
                    : null
            }

            <div className="flex flex-row flex-wrap border border-gray-400 gap-2 rounded-sm px-2 py-2">
                <div className="flex flex-row flex-wrap gap-2">
                    {
                        map(tags, (tag: string, tIndex: number) => (
                            <div key={tIndex} className="bg-violet-400 flex flex-row space-x-2 rounded-sm text-white px-2 items-center justify-center py-1">
                                <Label className="text-xs font-robot">{tag}</Label>
                                <X onClick={() => _onTagsChange(tag)} className="w-4 h-4 cursor-pointer" />
                            </div>
                        ))
                    }
                    <input
                        onKeyDown={(e) => onkeydown(e.key)}
                        className="text-sm font-robot w-auto h-6 outline-none active:outline-none"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </div>

            {
                errorMessage
                    ? <Label className='text-xs font-robot text-red-400'>{errorMessage}</Label>
                    : null
            }
        </div>
    )
}
