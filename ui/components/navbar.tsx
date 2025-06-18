"use client"

import ILabelValue from '@/lib/appInterface/ILabelValue'
import constants from '@/lib/constants'
import enums from '@/lib/enums'
import { useAppDispatch, useAppSelector } from '@/reducer/hooks'
import { setSearchVehicles } from '@/reducer/slice/appSlice'
import { setFileQueuesAndStats, setIsOpenFileQueue } from '@/reducer/slice/fileQueueSlice'
import ApiService, { ApiUrls } from '@/services/apiClient'
import { IconBrandAndroid, IconSearch, IconUpload } from "@tabler/icons-react"
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import ActivateFiles from './activateFiles'
import FileQueueDialog from './fileQueueDialog'
import VehicleRequest from './nav/vehicleRequest'
import { Selector } from './selector'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'
import { useToast } from './ui/use-toast'

const searchOptions: ILabelValue[] = [
    {
        value: enums.searchBy.vehicle,
        label: 'Vehicle'
    },
    {
        value: enums.searchBy.chassis,
        label: 'Chassis'
    },
    {
        value: enums.searchBy.engine,
        label: 'Engine'
    },
];

interface INavState {
    searchBy: string,
    search: string,
}

export default function Navbar() {
    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const { userPreference, apiListenerState } = useAppSelector((state) => state.app);
    const { totalProcessingFile, isOpenFileQueue } = useAppSelector((state) => state.fileQueue);

    const [isOpenFileQueueDialog, setIsOpenFileQueueDialog] = useState(false);
    const [isOpenActivateFileDialog, setIsOpenActivateFileDialog] = useState<boolean>(false);
    const [state, setState] = useState<INavState>({
        searchBy: enums.searchBy.vehicle,
        search: '',
    });

    useEffect(() => {
        if (state.search) {
            const MAX = state.searchBy === enums.searchBy.vehicle ? 4 : 6;

            if (state.search.length === MAX) {
                searchVehicle();
            }
        }
    }, [state.search]);

    useEffect(() => {
        if (isOpenFileQueue) {
            toggleFileQueueDialog();

            dispatch(setIsOpenFileQueue(false));
        }
    }, [isOpenFileQueue]);

    useEffect(() => {
        if (apiListenerState.api === constants.socket.api.getProcessingFiles) {
            getQueueFiles();
        }
    }, [apiListenerState.api, apiListenerState.socketId]);

    const getQueueFiles = async () => {
        const payload: any = {
            types: [enums.queueType.deleteFile, enums.queueType.deleteFinance, enums.queueType.uploadFile],
            statuses: [enums.queueStatus.failed, enums.queueStatus.processing, enums.queueStatus.queue]
        };

        const { data } = await ApiService.post(ApiUrls.getFileQueueByFilter, payload);
        if (data) {
            dispatch(setFileQueuesAndStats(data));
        }
    }

    const searchVehicle = async () => {
        const search = cloneDeep(state.search);
        onChangeNavState('search', '');

        const payload = {
            search,
            searchBy: state.searchBy,
        };

        const { data } = await ApiService.post(ApiUrls.searchVehicle, payload);
        if (data) {
            dispatch(setSearchVehicles({
                vehicles: data,
                search,
                searchBy: state.searchBy
            }));
        } else {
            toast({
                variant: 'destructive',
                title: 'Not Found.',
                description: `Searched vehicle not found: ${search}`
            });
        }
    }

    const toggleFileQueueDialog = (): any => setIsOpenFileQueueDialog(!isOpenFileQueueDialog);
    const toggleActivateFileDialog = (): any => setIsOpenActivateFileDialog(!isOpenActivateFileDialog);

    const onChangeNavState = (field: string, value: any) => {
        setState({
            ...state,
            [field]: value
        });
    }

    const onSearchChange = (value: string) => {
        const re = /^[0-9\b]+$/;
        if (!re.test(value) && value.length > 0 && state.searchBy === enums.searchBy.vehicle) {
            return;
        }

        return onChangeNavState('search', value);
    }

    return (
        <nav className="flex z-20 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow py-2 w-full flex-row h-14 px-4 justify-between items-center sticky top-0 bg-white">
            <div className="flex flex-row items-center space-x-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex space-x-3 pl-1.5 flex-row justify-center items-center">
                    <div className="flex flex-row items-center border rounded-md space-x-4 bg-gray-50 py-2 px-3">
                        <IconSearch className="w-4 h-4 text-gray-300" />
                        <input
                            value={state.search}
                            maxLength={state.searchBy === enums.searchBy.vehicle ? 4 : 6}
                            placeholder="Search"
                            className="bg-transparent w-24 outline-none font-robot"
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                    <Selector
                        optionLabel="Sort By"
                        placeholder="Sort By"
                        options={searchOptions}
                        defaultValue={state.searchBy}
                        onValueChange={(val: any) => onChangeNavState('searchBy', val)}
                    />
                </div>
            </div>

            <div className="flex flex-row-reverse space-x-5 space-x-reverse py-2 px-1 justify-center items-center">
                <div onClick={() => toggleActivateFileDialog()} className="px-1.5 cursor-pointer py-1.5 rounded-md group hover:bg-cyan-600 bg-cyan-100">
                    <IconBrandAndroid className="text-cyan-600 group-hover:text-white w-5 h-5" />
                </div>
                <div className='flex relative'>
                    {totalProcessingFile ? (
                        <Avatar className='w-4 h-4 text-xs absolute -top-1 -right-1.5'>
                            <AvatarFallback className='bg-red-400 text-white shadow'>1</AvatarFallback>
                        </Avatar>
                    ) : null}
                    <div onClick={() => toggleFileQueueDialog()} className="px-1.5 flex flex-row items-center space-x-0.5 cursor-pointer py-1.5 rounded-md group hover:bg-emerald-600 bg-emerald-100">
                        <IconUpload className="text-emerald-600 group-hover:text-white w-5 h-5" />
                    </div>
                </div>
                <VehicleRequest />
            </div>

            {/* absolute content */}
            {
                isOpenFileQueueDialog
                    ? <FileQueueDialog
                        isOpen={isOpenFileQueueDialog}
                        toggleDialog={toggleFileQueueDialog}
                    />
                    : null
            }

            {
                isOpenActivateFileDialog
                    ? <ActivateFiles
                        isOpen={isOpenActivateFileDialog}
                        toggleDialog={toggleActivateFileDialog}
                    />
                    : null
            }
        </nav>
    )
}