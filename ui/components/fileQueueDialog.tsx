import { ITab } from '@/lib/appInterface/ITab';
import AppUtils from '@/lib/appUtils';
import enums from '@/lib/enums';
import { useAppSelector } from '@/reducer/hooks';
import ApiService, { ApiUrls } from '@/services/apiClient';
import { IconFileExcel, IconFileNeutral, IconLoader2 } from '@tabler/icons-react';
import { filter, map, startCase } from 'lodash';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader } from './ui/sheet';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { useToast } from './ui/use-toast';

interface IFileQueueDialog {
    isOpen: boolean,
    toggleDialog: () => void
}

const tabs: ITab[] = [
    {
        id: 'totalProcessingFile',
        name: 'Processing File',
        icon: <IconFileNeutral size={18} />
    },
    {
        id: 'totalFailedFile',
        name: 'Failed File',
        icon: <IconFileExcel size={18} />
    }
];

export default function FileQueueDialog({
    isOpen,
    toggleDialog
}: IFileQueueDialog) {
    const { toast } = useToast();

    const {
        fileQueues: reduxFileQueues,
        totalFailedFile,
        totalProcessingFile
    } = useAppSelector((state) => state.fileQueue);

    const [activeTab, setActiveTab] = useState<number>(0);

    const filterQueueFiles = () => {
        let status = enums.queueStatus.processing;
        if (activeTab > 0) {
            status = enums.queueStatus.failed;
        }

        return filter(reduxFileQueues, (file) => file.status === status);
    }

    const readdInQueue = async (file: any) => {
        const { data } = await ApiService.put(AppUtils.formatString(ApiUrls.readdFileInQueue, file._id));
        if (data) {
            toast({
                title: 'Re-added',
                description: 'File is re-added into queue for processing.'
            })
        }
    }

    const renderContent = () => {
        return (
            <>
                <Tabs defaultValue="processingFile">
                    <TabsList className="grid rounded-none p-0 grid-cols-2">
                        {
                            map(tabs, (tab: ITab, index: number) => {
                                const countStats: any = {
                                    totalFailedFile,
                                    totalProcessingFile
                                };

                                return (
                                    <TabsTrigger
                                        key={tab.id}
                                        onClick={() => setActiveTab(index)}
                                        className={AppUtils.classNames(
                                            'rounded-none flex flex-row space-x-2 m-0 p-2.5',
                                        )}
                                        value={tab.id}
                                    >
                                        {tab.icon}
                                        <Label>{tab.name}</Label>
                                        <Badge className='rounded-sm' variant='outline'>{countStats[tab.id]}</Badge>
                                    </TabsTrigger>
                                )
                            })
                        }
                    </TabsList>
                    <Separator />
                </Tabs>
                {
                    (reduxFileQueues.length === 0)
                        ? <div className='flex flex-col justify-center items-center space-y-2 py-8'>
                            <IconFileNeutral className='text-gray-700 w-16 h-16' />
                            <Label className='text-base font-light font-robot text-gray-500 animate-pulse'>No file in processing...</Label>
                        </div>
                        : <div className='flex flex-col w-full px-2 py-2 space-y-2'>
                            {
                                map(filterQueueFiles(), (file: any, fIndex: number) => (
                                    <Card key={fIndex} className='rounded-sm p-0'>
                                        <CardContent className='px-3 py-3 flex flex-col'>
                                            <Label className='font-robot text-sm text-gray-700'>{file?.data?.file?.name}</Label>
                                            <Label className='font-robot text-xs text-gray-600'>{file?.data?.branchId?.name}</Label>
                                            <div className='flex flex-row space-x-2 pt-1 items-center'>
                                                <Label className='font-robot text-sm text-gray-400'>Records: {file?.data?.file?.excelRecords}</Label>
                                                <IconLoader2 className="mr-2 h-4 w-4 text-gray-400 animate-spin" />
                                                <Badge className={AppUtils.classNames(
                                                    'text-xs rounded-sm font-robot',
                                                    file.status === enums.queueStatus.failed
                                                        ? 'bg-red-100 text-red-500'
                                                        : 'bg-violet-100 text-violet-500'
                                                )}>{startCase(file.status)}</Badge>
                                            </div>
                                            {
                                                file.status === enums.queueStatus.failed
                                                    ? <div className='flex mt-2 flex-col space-y-2'>
                                                        <Label className='text-xs font-robot text-red-400'>{file?.error?.message || 'Failed to upload file.'}</Label>
                                                        {
                                                            file?.error?.code === 1
                                                                ? null
                                                                : <Button onClick={() => readdInQueue(file)} variant='outline' size='sm'>Reupload</Button>
                                                        }
                                                    </div>
                                                    : <div className='flex flex-col space-y-0.5'>
                                                        <Progress className='rounded-none h-1 mt-2' value={file?.progress || 0} />
                                                        <small className='text-end w-full text-xs font-robot font-medium text-violet-500'>{file?.progress}% Completed</small>
                                                    </div>
                                            }
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>
                }
            </>
        )
    }

    return (
        <Sheet open={isOpen} modal onOpenChange={toggleDialog}>
            <SheetContent className='p-0'>
                <SheetHeader className='px-4 py-4 border'>
                    <Label className='text-sm font-robot text-gray-700'>Processing File(s)</Label>
                </SheetHeader>

                {renderContent()}
            </SheetContent>
        </Sheet>
    )
}