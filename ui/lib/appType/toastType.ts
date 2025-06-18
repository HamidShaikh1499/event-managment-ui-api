export default interface toastMessage {
    variant: 'default' | 'destructive',
    title: string,
    description?: string | null
}