import { IconBellRinging2Filled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

export default function SsNotificationPermission() {
    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const permissionStatus = await navigator.permissions.query({ name: 'notifications' });
            if (permissionStatus.state === 'prompt') {
                setIsOpen(true);
            }
        })()
    }, [])

    const toggleDialog = () => setIsOpen(!isOpen);

    const onRequest = async () => {
        toggleDialog();

        const notificationPermission = await navigator.permissions.query({ name: 'notifications' });
        console.log('notificationPermission: ', notificationPermission);

        if (notificationPermission.state === 'granted') {
            toast({
                description: 'Notification is granted.',
                title: 'Granted'
            });
        } else if (notificationPermission.state === 'denied') {
            // always show something to notify user notification remain to allow
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={toggleDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Notification</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col space-y-2 py-2 justify-center items-center">
                    <IconBellRinging2Filled className="w-16 h-16 text-violet-400" />

                    <Label className="text-base text-center font-robot text-gray-700">To get all types of notification, please allow notification permission</Label>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onRequest()}>Request</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}