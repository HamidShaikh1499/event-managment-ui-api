"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

interface ILabelSkeleton {
    isLoading: boolean,
    children: any,
    className?: string,
    skeletonClassName?: string
}

export default function LabelSkeleton({ isLoading, children, skeletonClassName = '', className = '' }: ILabelSkeleton) {
    return (
        <>
            {
                isLoading ? <Skeleton className={skeletonClassName} />
                    : <Label className={className}>{children}</Label>
            }
        </>
    );
}
