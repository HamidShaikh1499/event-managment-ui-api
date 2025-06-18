import { IconLoader2 } from "@tabler/icons-react";
import { Label } from "./ui/label";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";

export default function PageLoader() {
    return (
        <AlertDialog open={true}>
            <AlertDialogContent className="bg-transparent border-none flex flex-col justify-center items-center shadow-none">
                <IconLoader2 className="mr-2 h-8 w-8 text-violet-400 animate-spin" />
                <Label className="text-sm font-robot text-white">Please wait...</Label>
            </AlertDialogContent>
        </AlertDialog>
    )
}