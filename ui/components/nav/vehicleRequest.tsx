import { IconBell } from "@tabler/icons-react";
import { Label } from "../ui/label";
import RequestsSheet from "./requestsSheet";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/reducer/hooks";
import ApiService, { ApiUrls } from "@/services/apiClient";
import { setUserVehicleRequests } from "@/reducer/slice/appSlice";
import { useToast } from '@/components/ui/use-toast';
import constants from "@/lib/constants";
import enums from "@/lib/enums";

export default function VehicleRequest() {
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const { apiListenerState, userVehicleRequests } = useAppSelector((state) => state.app);

    const [isOpenRequestSheet, setIsOpenRequestSheet] = useState<boolean>(false)

    useEffect(() => {
        getUserVehicleRequest(false);
    }, []);

    useEffect(() => {
        if (apiListenerState.api && apiListenerState.api === constants.socket.api.createVehicleRequest && apiListenerState.socketId) {
            getUserVehicleRequest(true);
        }
    }, [apiListenerState.api, apiListenerState.socketId])

    const getUserVehicleRequest = async (showNotification: boolean): Promise<any> => {
        const payload: any = {
            statuses: [enums.vehicleRequest.status.request]
        };

        const { data: requestData } = await ApiService.post(ApiUrls.getVehicleRequestsByFilter, payload);
        if (requestData) {
            if (showNotification) {
                toast({
                    title: 'New Request',
                    description: 'New user\'s request found.'
                });
            }

            dispatch(setUserVehicleRequests(requestData.requests));
        }
    };

    const toggleRequestDialog = (): any => setIsOpenRequestSheet(!isOpenRequestSheet);

    return (
        <>
            <div onClick={() => toggleRequestDialog()} className='flex bg-violet-100 overflow-hidden rounded-md flex-row space-x-2 items-center'>
                <Label className='text-[12px] font-robot text-violet-500 ml-1.5'>{userVehicleRequests.length} {userVehicleRequests.length > 1 ? 'Requests' : 'Request'}</Label>
                <div className="px-1.5 cursor-pointer py-1.5 rounded-md group bg-purple-600">
                    <IconBell className="text-white group-hover:text-white w-5 h-5" />
                </div>
            </div>

            {
                isOpenRequestSheet
                    ? <RequestsSheet
                        isOpen={isOpenRequestSheet}
                        toggleDialog={toggleRequestDialog}
                    />
                    : null
            }
        </>
    )
}