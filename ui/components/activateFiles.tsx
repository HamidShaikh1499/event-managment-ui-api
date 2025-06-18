import AppUtils from '@/lib/appUtils';
import enums from '@/lib/enums';
import ApiService, { ApiUrls } from '@/services/apiClient';
import { IconFileNeutral, IconLoader2 } from '@tabler/icons-react';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import { LoadingButton } from './loadingButton';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Sheet, SheetContent, SheetHeader } from './ui/sheet';
import { useToast } from './ui/use-toast';
import DateUtils from '@/lib/dateUtils';

interface IFileQueueDialog {
    isOpen: boolean,
    toggleDialog: () => void
}

export default function ActivateFiles({
    isOpen,
    toggleDialog
}: IFileQueueDialog) {
    const { toast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getUploadedFilesForActivation();
            setIsLoading(false);
        })()
    }, []);

    const getUploadedFilesForActivation = async () => {
        const payload = {
            fileOption: enums.fileOption.pendingForAndroid,
            offset: 0,
            limit: 30,
            isActive: false
        };

        const { data } = await ApiService.post(ApiUrls.getUploadedFilesByFilter, payload);
        if (data) {
            setUploadedFiles(data.uploadedFiles);
        }
    }

    const activateAllFiles = async () => {
        if (uploadedFiles.length === 0) {
            return;
        }

        setIsSubmitting(true);

        const payload = {
            fileIds: map(uploadedFiles, (file: any) => file._id),
        };

        const { data } = await ApiService.post(ApiUrls.activateFiles, payload);
        if (data) {
            await getUploadedFilesForActivation();
        } else {
            toast({
                title: 'Error',
                description: 'Failed to send to android.',
                variant: 'destructive'
            });
        }

        setIsSubmitting(false);
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className='flex flex-row justify-center items-center py-8'>
                    <IconLoader2 className='text-violet-500 w-8 h-8 animate-spin' />
                </div>
            )
        }

        return (
            <>
                {
                    (uploadedFiles.length === 0)
                        ? <div className='flex flex-col justify-center items-center space-y-2 py-8'>
                            <IconFileNeutral className='text-gray-700 w-16 h-16' />
                            <Label className='text-base font-light font-robot text-gray-500 animate-pulse'>No file for activation...</Label>
                        </div>
                        : <div className='flex flex-col w-full px-2 py-2 space-y-2'>
                            {
                                map(uploadedFiles, (file: any, fIndex: number) => (
                                    <Card key={fIndex} className='rounded-sm p-0'>
                                        <CardContent className='px-3 py-3 flex flex-col'>
                                            <Label className='font-robot text-sm text-gray-700'>{file?.file?.name}</Label>
                                            <Label className='font-robot text-xs text-gray-600'>{file?.branchId?.name}</Label>
                                            <Label className='font-robot mt-0.5 text-xs text-gray-400'>Records: {file?.file?.excelRecords} - {DateUtils.formatDate(file?.createdAt)}</Label>
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
                    <Label className='text-sm font-robot text-gray-700'>Send To Android</Label>
                </SheetHeader>

                {renderContent()}

                <div className='flex bottom-0 right-0 fixed px-4 py-3'>
                    <LoadingButton
                        size='sm'
                        className='w-full'
                        disabled={uploadedFiles.length === 0}
                        isLoading={isSubmitting}
                        label='Send All Files'
                        onClick={() => activateAllFiles()}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}