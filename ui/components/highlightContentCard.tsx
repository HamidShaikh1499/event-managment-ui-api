import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function HighlightContentCard({
    cardStyle,
    cardColor,
    title,
    subTitle,
    CardIcon,
    isLoading = false,
}: {
    cardStyle: string,
    cardColor: string,
    title: string | number | undefined,
    subTitle: string,
    CardIcon: any,
    isLoading?: boolean
}) {
    return (
        <>
            {
                isLoading
                    ? <Skeleton className="w-full bg-gray-200 h-24" />
                    : <Card className={cardStyle}>
                        <CardContent className={`px-4 py-6 flex justify-between items-center ${cardColor} rounded-lg`}>
                            <div className="flex flex-col space-y-1">
                                <span className="text-xl font-robot text-white">{title}</span>
                                <span className="text-[12px] font-robot text-gray-200">{subTitle}</span>
                            </div>
                            {CardIcon}
                        </CardContent>
                    </Card>
            }
        </>
    )
}