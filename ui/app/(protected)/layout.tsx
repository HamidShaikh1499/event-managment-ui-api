'use client'

import SidebarLayout from './sidebarLayout';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <SidebarLayout>
                {children}
            </SidebarLayout>
        </>
    )
}