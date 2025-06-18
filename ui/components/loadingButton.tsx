import { Button, ButtonProps } from "@/components/ui/button"
import { IconLoader2 } from "@tabler/icons-react"

interface ILoadingButtonProps extends ButtonProps {
    isLoading: boolean,
    label: string,
    className?: string,
    onClick?: () => void,
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function LoadingButton({
    isLoading,
    label,
    variant = 'default',
    className = '',
    onClick,
    ...props
}: ILoadingButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={className}
            variant={variant}
            disabled={isLoading} {...props}>
            {
                isLoading
                    ? <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    : null
            }
            {label}
        </Button>
    )
}
