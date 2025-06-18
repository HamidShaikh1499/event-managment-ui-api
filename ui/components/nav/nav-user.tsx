"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAppSelector } from "@/reducer/hooks"
import AppUtils from "@/lib/appUtils"
import { map } from "lodash"
import ApiService, { ApiUrls } from "@/services/apiClient"
import { useRouter } from "next/navigation"

const navConstants = {
  logout: 'logout',
  notification: 'notification',
  settings: 'settings'
}

interface IMenuOption {
  icon: any,
  label: string,
  isAboveSeparator?: boolean,
  key: string
}

function NavUserInfo({ authUser }: any) {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={AppUtils.getDisplayURL(authUser?.storageKey as any)} alt={authUser?.name.full} />
        <AvatarFallback className="rounded-lg">{AppUtils.getTwoLatterFromName(authUser?.name)}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{authUser?.name.full}</span>
        <span className="truncate text-xs">{authUser?.roleId.name}</span>
      </div>
    </>
  );
}

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar()
  const { user: authUser } = useAppSelector((state) => state.auth);

  const menuOptions: IMenuOption[] = [
    {
      icon: <Bell />,
      label: 'Notification',
      key: navConstants.notification
    },
    {
      icon: <Settings />,
      label: 'Settings',
      key: navConstants.settings
    },
    {
      icon: <LogOut />,
      label: 'Log out',
      key: navConstants.logout,
      isAboveSeparator: true
    }
  ];

  const onMenuOptionClick = (key: string) => {
    switch (key) {
      case navConstants.logout:
        logout();
        break;
      case navConstants.settings:
        router.push('/settings');
        break;
    }
  }

  const logout = async () => {
    const { data } = await ApiService.deleteCall(ApiUrls.logout);
    if (data) {
      router.push('/login');
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent bg-violet-50 data-[state=open]:text-sidebar-accent-foreground"
            >
              <NavUserInfo authUser={authUser} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <NavUserInfo authUser={authUser} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {map(menuOptions, (option: IMenuOption, index: number) => (
              <div key={index}>
                {option.isAboveSeparator ? <DropdownMenuSeparator /> : null}
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => onMenuOptionClick(option.key)} className="flex flex-row space-x-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
