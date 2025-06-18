import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ReactNode } from "react"

interface IHoverElementCard {
    triggerContent: ReactNode,
    hoverContent: ReactNode
}

export function HoverElementCard({ triggerContent, hoverContent }: IHoverElementCard) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {triggerContent}
            </HoverCardTrigger>
            <HoverCardContent className="w-auto">
                {hoverContent}
            </HoverCardContent>
        </HoverCard>
    )
}
