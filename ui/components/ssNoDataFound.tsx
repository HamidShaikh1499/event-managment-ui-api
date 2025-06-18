import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import NoDataFileImage from '@/public/assets/noDataPage.png';

interface ISsNoDataFound {
    message: string
}

export default function SsNoDataFound({ message }: ISsNoDataFound) {
    const router = useRouter()

    return (
        <div className="px-2 py-2 w-full">
            <Card className="h-48">
                <CardContent className="flex pt-2 space-y-2 w-full h-48 flex-col justify-center items-center">
                    <Image className="w-12 h-12" src={NoDataFileImage} alt="No Data Found" />
                    <Label className="text-red-400 font-robot text-sm">{message}</Label>
                    <Button onClick={() => router.back()} variant='secondary' size='sm'>Go Back</Button>
                </CardContent>
            </Card>
        </div>
    )
}