import { LabelHTMLAttributes } from "react";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";


interface ISsLabel extends LabelHTMLAttributes<HTMLInputElement> {
    children: any,
    isLoading?: boolean,
    width?: string
}

export default function SsLabel({ children, width = '36px', isLoading, ...props }: ISsLabel) {
    return (
        <>
            {
                isLoading
                    ? <Skeleton className={`w-[96px] h-4 rounded-sm bg-gray-300`} />
                    : <Label className={props.className}>
                        {children}
                    </Label>
            }
        </>
    )
}