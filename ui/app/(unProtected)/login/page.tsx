'use client'

import SsInputField from '@/components/form/ssInputField';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { login } from '@/reducer/slice/authSlice';
import { useDispatch } from '@/reducer/store';
import ApiService, { ApiUrls } from '@/services/apiClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    emailAddress: z.string().email('Email address must be valid.'),
    password: z.string()
        .min(8, {
            message: 'Password mus be contained at least 8 characters.',
        }),
})

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: '',
            password: ''
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        const payload: any = {
            ...values
        };

        const { data }: any = await ApiService.post(ApiUrls.login, payload);
        if (data) {
            dispatch(login(data));
            router.push('/home');
        } else {
            // todo:: handling error handling
        }

        setIsSubmitting(false);
    }

    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen overflow-hidden'>
            <Card className='md:w-[30%] w-[50%] shadow'>
                <CardContent className='px-8 py-6 flex flex-col'>
                    <div className='flex flex-row justify-center items-center space-x-0'>
                        <Label className='text-base font-light font-robot'>Login</Label>
                    </div>

                    <div className='flex flex-col justify-center items-center space-y-1 mt-4'>
                        <Label className='text-purple-500 text-xl font-robot'>Hi, Welcome Back</Label>
                        <Label className='text-sm font-robot text-gray-500 font-light'>Enter your credentials to continue</Label>
                    </div>

                    <div className='mt-10 mb-4'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                                <SsInputField
                                    name='emailAddress'
                                    label='Email Address'
                                    placeholder="Email Address"
                                    control={form.control}
                                />

                                <SsInputField
                                    type='password'
                                    name='password'
                                    label='Password'
                                    placeholder="Password"
                                    control={form.control}
                                    maxLength={16}
                                />

                                <div className='flex py-4 flex-row-reverse justify-between items-center'>
                                    <Label className='text-sm text-purple-500 font-robot font-normal cursor-pointer'>Forgot password?</Label>
                                </div>

                                <Button disabled={isSubmitting} className='w-full' type='submit'>Login</Button>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}