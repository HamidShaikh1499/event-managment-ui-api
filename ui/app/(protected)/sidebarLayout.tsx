import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface ISidebarLayout {
    children: any
}

export default function SidebarLayout({ children }: ISidebarLayout) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-slate-50">
                <Navbar />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}