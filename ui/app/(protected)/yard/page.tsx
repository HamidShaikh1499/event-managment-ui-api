'use client'

import { AppAlertDialog } from '@/components/appAlertDialog'
import DataTable from '@/components/dataTable'
import PageLoader from '@/components/pageLoader'
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import AppUtils from '@/lib/appUtils'
import ApiService, { ApiUrls } from '@/services/apiClient'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { filter, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import YardForm from '../../../sections/yard/yardForm'

export default function Yard() {
    const { toast } = useToast()

    const [yards, setYards] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [search, setSearch] = useState<string>('')
    const [isOpenYardDialog, setIsOpenYardDialog] = useState<boolean>(false)
    const [selectedYard, setSelectedYard] = useState<any>(null)
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: "Yard Name",
        },
        {
            accessorKey: "owner.name",
            header: "Owner Name",
            cell: ({ row: { original } }) => original?.owner?.name ? original.owner.name : '-'
        },
        {
            accessorKey: "owner.contactNumber",
            header: "Owner Contact Number",
            cell: ({ row: { original } }) => original?.owner?.contactNumber ? original.owner.contactNumber : '-'
        },
        {
            accessorKey: "location.address",
            header: "Address",
        },
        {
            accessorKey: "holdVehicles",
            header: "Total Hold Vehicles",
            cell: ({ row: { original } }) => (
                <Badge className="bg-purple-100 text-cyan-500 w-20 flex justify-center rounded-md">{original.holdVehicles}</Badge>
            )
        },
        {
            header: 'Action',
            cell: ({ row: { original } }) => (
                <div className="flex flex-row justify-center items-center space-x-2">
                    <div onClick={() => onEditYard(original)} className="border cursor-pointer rounded-md px-1.5 py-1.5">
                        <IconEdit size={14} />
                    </div>
                    <div onClick={() => {
                        toggleDeleteDialog()
                        setSelectedYard(original)
                    }} className="border cursor-pointer rounded-md px-1.5 py-1.5">
                        <IconTrash size={14} />
                    </div>
                </div>
            )
        }
    ]

    useEffect(() => {
        getYardsAndStats()
    }, [])

    const getYardsAndStats = async () => {
        await getYardsByFilter();
        setIsLoading(false)
    }

    const getYardsByFilter = async () => {
        const { data }: any = await ApiService.post(ApiUrls.getYardsByFilter);
        if (data) {
            setYards(data);
        }
    }

    const onDeleteYard = async () => {
        setIsPageLoading(true)

        const { data }: any = await ApiService.deleteCall(AppUtils.formatString(ApiUrls.deleteYard, selectedYard._id));
        if (data) {
            toast({
                title: 'Deleted',
                description: `${selectedYard.name} was deleted successfully.`,
                variant: 'destructive'
            })
            getYardsAndStats();
        }

        setIsPageLoading(false)
    }

    const onEditYard = (original: any) => {
        setSelectedYard(original)
        toggleYardDialog()
    }

    const toggleYardDialog = () => setIsOpenYardDialog(!isOpenYardDialog);

    const filterYards = () => {
        if (isEmpty(search)) {
            return yards;
        }

        return filter(yards, (yard: any) => yard.name.toLowerCase().trim().includes(search.trim().toLowerCase()));
    }

    const toggleDeleteDialog = () => setIsOpenDeleteDialog(!isOpenDeleteDialog)

    return (
        <div className="flex flex-col w-full h-full px-4 py-4">
            {isPageLoading ? <PageLoader /> : null}

            <Card>
                <CardContent className="h-full overflow-y-scroll">
                    <DataTable
                        isLoading={isLoading}
                        manualPagination={false}
                        data={filterYards()}
                        columns={columns}
                        headerLeftChild={
                            <>
                                <Input
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </>
                        }
                        headerRightChild={
                            <>
                                <Button onClick={toggleYardDialog} variant='outline' className="flex flex-row justify-center items-center space-x-3">
                                    <IconPlus size={18} />
                                    <span>Add Yard</span>
                                </Button>
                            </>
                        }
                    />
                </CardContent>
            </Card>

            {/* Absolute Content */}
            <AlertDialog open={isOpenYardDialog} onOpenChange={toggleYardDialog}>
                <AlertDialogContent className="p-0">
                    <YardForm
                        toggleDialog={toggleYardDialog}
                        defaultValue={selectedYard}
                        refreshYard={() => {
                            toggleYardDialog();
                            getYardsAndStats();
                        }} />
                </AlertDialogContent>
            </AlertDialog>

            <AppAlertDialog
                isOpen={isOpenDeleteDialog}
                toggleIsOpen={toggleDeleteDialog}
                title="Delete Finance"
                description={`Are you sure to delete: ${selectedYard?.name || '-'}?`}
                onConfirmClick={() => onDeleteYard()}
            />
        </div>
    )
}