"use client"

import {
  Command,
  LifeBuoy,
  Send
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav/nav-main"
import { NavSecondary } from "@/components/nav/nav-secondary"
import { NavUser } from "@/components/nav/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAppSelector } from "@/reducer/hooks"

const data = {
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { tenant } = useAppSelector((state) => state.auth);

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{tenant?.name}</span>
                <span className="truncate text-xs">V2.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
