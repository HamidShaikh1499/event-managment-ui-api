'use client'

import ApiService, { ApiUrls } from "@/services/apiClient";
import { IconHistory } from "@tabler/icons-react";
import { debounce, last, map } from "lodash";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader } from "./ui/sheet";
import { Avatar, AvatarFallback } from "./ui/avatar";
import AppUtils from "@/lib/appUtils";
import constants from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import DateUtils from "@/lib/dateUtils";

interface IVehicleHistories {
    isOpen: boolean,
    onClose: () => void,
    fixedSearch?: string,
    fixedFinances?: any[],
}

interface IState {
    limit: number,
    offset: number,
    totalRecord: number,
    isRefresh: boolean,
}

export default function VehicleHistories({ isOpen, onClose, fixedFinances = [], fixedSearch = '' }: IVehicleHistories) {
    const [search, setSearch] = useState<string>('');
    const [vehicleHistories, setVehicleHistories] = useState<any[]>([]);
    const [state, setState] = useState<IState>({
        limit: 10,
        offset: 0,
        totalRecord: -1,
        isRefresh: true,
    });

    const searchDebounce = useCallback(debounce(() => {
        setState({
            ...state,
            isRefresh: true,
            offset: 0,
            totalRecord: -1,
        });
    }, 1500), []);

    useEffect(() => {
        if (state.isRefresh) {
            getSearchHistoriesByFilter();
        }
    }, [state.isRefresh]);

    const getSearchHistoriesByFilter = async () => {
        const payload: any = {
            offset: 0,
            limit: 100,
        };

        if (fixedFinances.length > 0) {
            payload.financeIds = fixedFinances;
        }

        if (fixedSearch) {
            payload.search = fixedSearch;
        }

        if (search) {
            payload.search = search;
        }

        const { data: historyData } = await ApiService.post(ApiUrls.getSearchHistoriesByFilter, payload);
        if (historyData) {
            setVehicleHistories(historyData.searchHistories);
            setState({
                ...state,
                totalRecord: historyData.totalRecord,
                isRefresh: false
            });
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose} modal>
            <SheetContent className="h-screen p-0">
                <SheetHeader className="w-full h-12 flex justify-center">
                    <div className="flex flex-row items-center space-x-2 px-2">
                        <IconHistory className="text-gray-700" size={18} />
                        <Label className="text-sm font-robot text-gray-700">Quick User Histories</Label>
                    </div>
                </SheetHeader>
                <Separator />
                <div className="flex flex-col">
                    <div className='flex w-full px-4 flex-row justify-between py-2 items-center space-x-2'>
                        <Input
                            placeholder='Search'
                            value={search || fixedSearch}
                            disabled={!!fixedSearch}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                searchDebounce();
                            }}
                        />
                    </div>
                </div>
                <Separator />
                <InfiniteScroll
                    className="overflow-y-auto flex flex-col mt-1 px-4 h-[72dvh]"
                    dataLength={vehicleHistories.length}
                    hasMore={vehicleHistories.length !== state.totalRecord}
                    loader={
                        <div role="status" className='flex w-full justify-center items-center'>
                            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    next={() => {
                        setState({
                            ...state,
                            offset: vehicleHistories.length,
                            isRefresh: true,
                        });
                    }}
                >
                    {
                        map(vehicleHistories, (vehicle, index) => (
                            <Card key={index} className='p-0 mt-2'>
                                <CardContent className='flex flex-col space-y-2 w-full px-2 py-2'>
                                    <div className="flex flex-row space-x-2.5 items-center">
                                        <Avatar>
                                            <AvatarFallback style={{ backgroundColor: AppUtils.stringToColor(vehicle.userId.name.full) }}>
                                                <Label className="text-sm mt-1 font-robot text-gray-700">{AppUtils.getTwoLatterFromName(vehicle.userId.name)}</Label>
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col">
                                            <Label className="text-sm font-robot text-gray-700">{vehicle.userId.name.full}</Label>
                                            <div className="flex flex-row items-center space-x-1">
                                                <Label className="text-xs font-robot text-gray-400">{AppUtils.getDisplayLabelFromVehicleNo(vehicle.vehicle)}</Label>
                                                <Label className="text-[4px]">{constants.unicode.round}</Label>
                                                <Label className="text-xs font-robot text-gray-400">{vehicle.vehicle.make || 'NA'}</Label>
                                            </div>
                                            <Label className="text-xs font-robot text-gray-400">Last Time Opened: {DateUtils.formatDate(last(vehicle.searchDateTime))}</Label>
                                        </div>
                                    </div>

                                    <Separator></Separator>

                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="pt-0 pb-1 text-sm font-robot text-gray-500">Other Details</AccordionTrigger>
                                            <AccordionContent className="flex flex-col space-y-2">
                                                <div className="flex flex-col">
                                                    <Label className="text-xs font-robot text-gray-400">Open Times</Label>
                                                    <Label className="text-sm font-robot text-gray-600">{map(vehicle.searchDateTime, (date) => DateUtils.formatDate(date)).join(' | ')}</Label>
                                                </div>

                                                <div className="flex flex-col">
                                                    <Label className="text-xs font-robot text-gray-400">Finance</Label>
                                                    <Label className="text-sm font-robot text-gray-600">{map(vehicle.vehicle.financeIds, (finance) => finance.name).join(' | ')}</Label>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        ))
                    }
                </InfiniteScroll>
            </SheetContent>
        </Sheet>
    )
}