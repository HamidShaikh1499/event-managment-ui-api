import ILabelValue from "@/lib/appInterface/ILabelValue";
import AppUtils from "@/lib/appUtils";
import enums from "@/lib/enums";
import { useAppDispatch, useAppSelector } from "@/reducer/hooks";
import { setUserVehicleRequests } from "@/reducer/slice/appSlice";
import ApiService, { ApiUrls } from "@/services/apiClient";
import { IconDots, IconLoader2 } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { cloneDeep, filter, map } from "lodash";
import { useState } from "react";
import ConfirmVehicle from "../../sections/vehicle/confirmVehicle";
import DataTable from "../dataTable";
import Dropdown from "../dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { useToast } from "../ui/use-toast";

interface IRequestsSheet {
    isOpen: boolean,
    toggleDialog: () => void
};

interface IRowLoading {
    isLoading: boolean,
    index: number
};

const options: ILabelValue[] = [
    {
        value: 'delete',
        label: 'Delete'
    },
    {
        value: 'cancel',
        label: 'Cancel'
    },
    {
        value: 'confirm',
        label: 'Confirm'
    }
];

export default function RequestsSheet({ isOpen, toggleDialog }: IRequestsSheet) {
    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const { userVehicleRequests: requests } = useAppSelector((state) => state.app);

    const [search, setSearch] = useState<string>('');
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [isOpenConfirmComponent, setIsOpenConfirmComponent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rowLoading, setRowLoading] = useState<IRowLoading>({
        index: -1,
        isLoading: false
    });

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row: { original } }) => (
                <div className="flex flex-row space-x-3 items-center">
                    <Avatar className="border">
                        <AvatarImage src={AppUtils.getDisplayURL(original.userId.storageKey)} alt="@shadcn" />
                        <AvatarFallback>{AppUtils.getTwoLatterFromName(original.userId.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                        <Label className="text-sm font-robot">{original.userId.name.full}</Label>
                        <Label className="text-xs font-robot text-gray-400">{original.userId.phoneNumber}</Label>
                    </div>
                </div>
            )
        },
        {
            header: "Vehicle",
            cell: ({ row: { original } }) => {
                return <Label className="text-sm font-robot text-gray-700">{AppUtils.getDisplayLabelFromVehicleNo(original.vehicle)}</Label>
            }
        },
        {
            header: "Make",
            cell: ({ row: { original } }) => {
                return <Label className="text-sm font-robot text-gray-700">{original.vehicle?.make || 'NA'}</Label>
            }
        },
        {
            header: "Finance",
            cell: ({ row: { original } }) => {
                const financeNames = map(original.vehicle.financeIds, (fin) => fin.name).join(' | ')

                return <Label className="text-sm font-robot text-gray-700">{financeNames}</Label>
            }
        },
        {
            accessorKey: "location.address",
            header: "Location",
        },
        {
            header: 'Action',
            cell: ({ row: { original, index } }) => (
                <div className="flex flex-row justify-center items-center space-x-2">
                    {
                        (rowLoading.isLoading && rowLoading.index === index)
                            ? <div className="border rounded-sm px-1 py-1">
                                <IconLoader2 className="h-3 w-3 animate-spin" />
                            </div>
                            : <Dropdown
                                options={options}
                                label="Options"
                                onChange={(val) => onOptionChange(original, val, index)}
                                triggerChild={
                                    <div className="rounded-sm cursor-pointer px-1 py-1">
                                        <IconDots size={18} />
                                    </div>
                                }
                            />
                    }
                </div>
            )
        }
    ]

    const resetRowLoading = () => {
        setRowLoading({
            index: -1,
            isLoading: false
        });
    }

    const onOptionChange = (row: any, option: any, index: number) => {
        setRowLoading({
            index,
            isLoading: true
        });

        switch (option) {
            case 'delete':
                deleteUserRequest(row._id);
                break;
            case 'cancel':
                cancelUserRequest(row)
                break;
            case 'confirm':
                setSelectedRequest(row);
                toggleOpenConfirmComponent();
                break;
        }
    }

    const deleteUserRequest = async (id: any) => {
        const { data } = await ApiService.deleteCall(AppUtils.formatString(ApiUrls.deleteVehicleRequest, id));
        if (data) {
            filterData(id);

            toast({
                title: 'Deleted',
                description: 'Request was deleted.'
            })
        }

        resetRowLoading();
    }

    const cancelUserRequest = async (row: any) => {
        const payload: any = {
            repoCharge: 20,
            userId: row.userId._id,
            vehicleId: row.vehicle._id,
            status: enums.repossession.status.cancel,
            userRequestId: row._id
        };

        const [data, lastData]: any = await Promise.all(
            [
                ApiService.post(ApiUrls.repossession, payload),
                AppUtils.formatString(ApiUrls.cancelUserVehicleRequest, row._id)
            ]
        );

        if (data) {
            filterData(row._id);
            toast({
                title: 'Cancelled',
                description: 'Vehicle was cancelled and request was deleted.'
            });
        }

        resetRowLoading()
    }

    const filterData = (id: any) => {
        const data = filter(requests, (req) => req._id !== id);
        dispatch(setUserVehicleRequests(data));
    }

    const toggleOpenConfirmComponent = () => setIsOpenConfirmComponent(!isOpenConfirmComponent);

    const onCloseConfirmComponent = () => {
        toggleOpenConfirmComponent();
        resetRowLoading();
    }

    const onConfirmSuccess = () => {
        const _selectedRequest = cloneDeep(selectedRequest);

        resetRowLoading();
        dispatch(setUserVehicleRequests(filter(requests, (req) => req._id !== _selectedRequest._id)));
        setSelectedRequest(null);
        toggleOpenConfirmComponent();
    }

    return (
        <Sheet modal open={isOpen} onOpenChange={toggleDialog}>
            <SheetContent className='p-0 flex flex-col min-w-[75%]'>
                <SheetHeader className='px-4 py-4 border'>
                    <div className="flex flex-col">
                        <Label className='text-sm font-robot text-gray-700'>User Requests</Label>
                    </div>
                </SheetHeader>

                {
                    isOpenConfirmComponent
                        ? <ConfirmVehicle
                            onClose={() => onCloseConfirmComponent()}
                            vehicle={selectedRequest.vehicle}
                            onSuccess={() => onConfirmSuccess()}
                            userId={selectedRequest.userId._id}
                            userRequestId={selectedRequest._id}
                        />
                        : <div className="flex flex-col px-4 py-2">
                            <Card className="overflow-y-scroll h-[70%]">
                                <CardContent>
                                    <DataTable
                                        isLoading={isLoading}
                                        data={requests}
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
                                    />
                                </CardContent>
                            </Card>
                        </div>
                }
            </SheetContent>
        </Sheet>
    );
}