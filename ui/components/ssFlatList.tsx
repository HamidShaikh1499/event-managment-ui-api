import { isEmpty, map } from "lodash";
import { Card, CardContent } from "./ui/card";
import { IconClipboardText } from "@tabler/icons-react";
import { Label } from "./ui/label";

interface ISsFlatList {
    data: any[]
    renderItem: (item: any, index: number) => void
    emptyDescription: string
}

export default function SsFlatList({ data, emptyDescription, renderItem }: ISsFlatList) {
    if (isEmpty(data)) {
        return (
            <Card className="p-0">
                <CardContent className="px-2 py-2 flex flex-row items-center space-x-2">
                    <IconClipboardText className="w-5 h-5 text-gray-600" />

                    <Label className="text-gray-700 text-sm font-robot">{emptyDescription}</Label>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            {map(data, (item: any, index: number) => renderItem(item, index))}
        </>
    );
}
