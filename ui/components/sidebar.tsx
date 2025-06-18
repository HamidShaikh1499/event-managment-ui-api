"use client"
import { map } from 'lodash';

import AppUtils from "@/lib/appUtils";
import { IconBuilding, IconDashboard, IconDatabase, IconFile, IconFileDots, IconFilePlus, IconFileUpload, IconGraph, IconHistory, IconLocation, IconSearch, IconTemplate, IconUpload, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface base {
    to: string,
    name: string,
    icon: any
}

interface iNavOption extends base {
    children?: base[]
}

export default function Sidebar({ isExpandMenu = true }: { isExpandMenu: boolean }) {
    const navOption: iNavOption[] = [
        {
            to: '/home',
            name: 'Search',
            icon: IconSearch
        },
        {
            to: '/user',
            name: 'Dashboard',
            icon: IconDashboard
        },
        {
            to: '/template',
            name: 'Template',
            icon: IconTemplate
        },
        {
            to: '/vehicle-stats',
            name: 'Vehicle Stats',
            icon: IconGraph
        },
        {
            to: '/yard',
            name: 'Yard',
            icon: IconBuilding
        },
        {
            to: '/repossession',
            name: 'Repossession',
            icon: IconDatabase
        },
        {
            to: '/',
            name: 'Finance Management',
            icon: IconBuilding,
            children: [
                {
                    to: '/finance',
                    name: 'Finance',
                    icon: IconBuilding,
                },
                // {
                //     to: '/finance/branch',
                //     name: 'Branch',
                //     icon: IconBinaryTree,
                // }
            ]
        },
        {
            to: '/',
            name: 'File Management',
            icon: IconFile,
            children: [
                {
                    to: '/directUpload',
                    name: 'Direct Upload',
                    icon: IconUpload,
                },
                {
                    to: '/format-upload',
                    name: 'Format Upload',
                    icon: IconFileUpload,
                },
                {
                    to: '/uploadedFile',
                    name: 'Uploaded Files',
                    icon: IconFileDots,
                },
                {
                    to: '/add-on-plus',
                    name: 'Add on plus',
                    icon: IconFilePlus,
                }
            ]
        },
        {
            to: '/',
            name: 'User Management',
            icon: IconUser,
            children: [
                {
                    to: '/users',
                    name: 'User',
                    icon: IconUser,
                },
                {
                    to: '/map',
                    name: 'Work Map',
                    icon: IconLocation,
                }
            ]
        },
    ];
    const [isTextShow, setIsTextShow] = useState<boolean>(false);
    const [selectedNav, setSelectedNav] = useState<iNavOption>(navOption[0])

    const NavLink = ({ nav }: { nav: iNavOption }) => (
        <Link href={nav.to} className="w-full px-2 cursor-pointer">
            <div className={
                AppUtils.classNames(
                    'rounded-md flex',
                    selectedNav.name === nav.name ? 'bg-purple-50 hover:bg-purple-100' : 'hover:bg-gray-100',
                    'flex-row space-x-2 px-3 py-3 items-center'
                )
            }>
                {<nav.icon className={
                    AppUtils.classNames(
                        selectedNav.name === nav.name ? 'text-purple-300' : 'text-gray-400', 'w-5 h-5'
                    )
                } />}
                <small className={
                    AppUtils.classNames(
                        'font-robot transition duration-1000',
                        selectedNav.name === nav.name ? 'text-purple-500' : 'text-gray-600',
                        'visible'
                    )
                }>{nav.name}</small>
            </div>
        </Link>
    )

    const ExpandMenu = ({ nav }: { nav: iNavOption }) => (
        <>
            {
                nav.children
                    ? <div className='w-full flex flex-col px-2 space-y-0'>
                        <Label className='text-xs cursor-none mx-4 my-1 font-robot text-gray-500'>{nav.name}</Label>
                        {
                            map(nav.children, (child: iNavOption, index: number) => (
                                <NavLink key={index} nav={child} />
                            ))
                        }
                    </div>
                    : <NavLink nav={nav} />
            }
        </>
    )

    const CollapseMenu = ({ nav }: { nav: iNavOption }) => (
        <>
            {
                nav.children
                    ? <Popover modal={true}>
                        <PopoverTrigger className={
                            AppUtils.classNames(
                                'rounded-md flex mx-2 justify-center items-center cursor-pointer',
                                selectedNav.name === nav.name ? 'bg-purple-50 hover:bg-purple-100' : 'hover:bg-gray-100',
                                'flex-row space-x-2 px-3 py-3 items-center'
                            )
                        }>
                            {<nav.icon className={
                                AppUtils.classNames(
                                    selectedNav.name === nav.name ? 'text-purple-300' : 'text-gray-400', 'w-5 h-5'
                                )
                            } />}
                        </PopoverTrigger>
                        <PopoverContent className='ml-12 -mt-10'>
                            {
                                map(nav.children, (child: iNavOption, index: number) => (
                                    <Link href={child.to} className="w-full cursor-pointer">
                                        <div className={
                                            AppUtils.classNames(
                                                'rounded-md flex',
                                                selectedNav.name === child.name ? 'bg-purple-50 hover:bg-purple-100' : 'hover:bg-gray-100',
                                                'flex-row space-y-1 px-3 py-2 items-center'
                                            )
                                        }>
                                            {<child.icon className={
                                                AppUtils.classNames(
                                                    selectedNav.name === child.name ? 'text-purple-300' : 'text-gray-400', 'w-5 h-5'
                                                )
                                            } />}
                                            <small className={
                                                AppUtils.classNames(
                                                    'font-robot transition duration-1000',
                                                    selectedNav.name === child.name ? 'text-purple-500' : 'text-gray-600',
                                                    'visible'
                                                )
                                            }>{child.name}</small>
                                        </div>
                                    </Link>
                                ))
                            }
                        </PopoverContent>
                    </Popover>
                    : <Link href={nav.to} className={
                        AppUtils.classNames(
                            'rounded-md flex mx-2 justify-center items-center cursor-pointer',
                            selectedNav.name === nav.name ? 'bg-purple-50 hover:bg-purple-100' : 'hover:bg-gray-100',
                            'flex-row space-x-2 px-3 py-3 items-center'
                        )
                    }>
                        {<nav.icon className={
                            AppUtils.classNames(
                                selectedNav.name === nav.name ? 'text-purple-300' : 'text-gray-400', 'w-5 h-5'
                            )
                        } />}
                    </Link>
            }
        </>
    )

    return (
        <>
            {/* Clone Hidden Content */}
            <aside className={AppUtils.classNames(
                'bg-white z-10 hidden min-h-screen py-1 top-0 left-0 transform duration-500 md:flex flex-col space-y-2',
                isExpandMenu ? 'w-56' : 'w-20'
            )}></aside>

            {/* Main Content */}
            <aside className={AppUtils.classNames(
                'bg-white z-10 hidden fixed min-h-screen py-1 top-16 left-0 transform duration-500 md:flex flex-col space-y-0.5',
                isExpandMenu ? 'w-56' : 'w-20'
            )}>
                {
                    map(navOption, (nav: iNavOption, index: number) => (
                        <div key={index} className='flex flex-col'>
                            {
                                isExpandMenu
                                    ? <ExpandMenu nav={nav} />
                                    : <CollapseMenu nav={nav} />
                            }
                        </div>
                    ))
                }
            </aside>
        </>
    )
}