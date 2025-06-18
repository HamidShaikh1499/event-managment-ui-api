import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"

interface IAppAlertDialog {
    isOpen: boolean,
    toggleIsOpen: () => void,
    onConfirmClick: () => void,
    title: string,
    description: string,
    leftButtonTitle?: string,
    rightButtonTitle?: string,
    hideLeftButton?: boolean
}

export function AppAlertDialog({
    isOpen,
    toggleIsOpen,
    onConfirmClick,
    title,
    description,
    leftButtonTitle = 'NO',
    rightButtonTitle = 'YES',
    hideLeftButton = false
}: IAppAlertDialog) {
    return (
        <AlertDialog open={isOpen} onOpenChange={toggleIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel hidden={hideLeftButton} onClick={toggleIsOpen}>{leftButtonTitle}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirmClick}>{rightButtonTitle}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
