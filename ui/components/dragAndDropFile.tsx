import { last, split } from 'lodash';
import { ReactNode, useRef, useState } from 'react';
import { Label } from './ui/label';

interface IDragAndDropFile {
    selectedFile: File | null,
    onFileSelect: (file: File) => void,
    types: string[],
    containerChild: ReactNode,
    onError?: (message: string) => void,
    accept: string
}

export default function DragAndDropFile({ selectedFile, onFileSelect, accept, types, containerChild, onError }: IDragAndDropFile) {
    const fileRef = useRef<any>();
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDragOver = (event: any) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: any) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        const file = files[0];

        onValidateAndSubmit(file);
    };

    const onValidateAndSubmit = (file: File) => {
        const extension = last(split(file?.name, '.'));

        if (types.includes(extension as any)) {
            onFileSelect(file);
        } else {
            if (onError) {
                onError(`Allowed File: ${types.join(', ')}`);
            }
        }
    }

    const handleFileInputChange = (event: any) => {
        onValidateAndSubmit(event.target.files[0]);
    };

    return (
        <div
            className={`w-full h-full flex flex-col items-center justify-center ${isDragging ? 'border-gray-500' : 'border-gray-300'
                } border-2 border-dashed rounded-lg px-6 pt-5 pb-6 hover:border-gray-200 cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
        >
            {containerChild}
            <input ref={fileRef} type='file' accept={accept} className='hidden' id='file-input' onChange={handleFileInputChange} />
            {selectedFile && (
                <Label className='text-sm font-robot text-gray-700'>{selectedFile.name}</Label>
            )}
        </div>
    );
}