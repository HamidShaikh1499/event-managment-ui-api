import { Label } from "./ui/label";

export default function SsCardContent({ label, title }: { label: string, title: string }) {
    return (
        <div className='flex flex-grow justify-between items-center'>
            <div className='flex flex-col'>
                <Label className='font-robot text-xs text-gray-400'>{title}</Label>
                <Label className='font-robot text-sm text-gray-700'>{label || 'NA'}</Label>
            </div>
        </div>
    );
}
