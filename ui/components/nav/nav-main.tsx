"use client"

import {
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { IconBuilding, IconFileAnalytics, IconHome, IconUser } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { match } from "path-to-regexp"
import { cn } from "@/lib/utils"
import { CollapsibleContent } from "@radix-ui/react-collapsible"

interface SubItem {
  title: string
  url: string
}

interface MenuItem {
  title: string
  url: string
  icon: React.ElementType
  isActive?: boolean
  items: SubItem[]
}

interface SelectedMenu {
  main: string
  menu: string
}

const menuItems: MenuItem[] = [
  {
    title: "Main",
    url: "/home",
    icon: IconHome,
    isActive: true,
    items: [
      { title: "Search", url: "/home" },
      { title: "Dashboard", url: "/dashboard" },
      { title: "Vehicle Documents", url: "/vehicle-documents" },
      { title: "Template", url: "/template" },
      { title: "Vehicle Stats", url: "/vehicle-stats" },
      { title: "Yard", url: "/yard" },
      { title: "Repossession", url: "/repossession" },
    ],
  },
  {
    title: "Finance Management",
    url: "/finance",
    icon: IconBuilding,
    items: [{ title: "Finance", url: "/finance" }],
  },
  {
    title: "File Management",
    url: "/directUpload",
    icon: IconFileAnalytics,
    items: [
      { title: "Direct Upload", url: "/directUpload" },
      { title: "Uploaded File", url: "/uploadedFile" },
      { title: "Format Upload", url: "/format-upload" },
      { title: "Add On Plus", url: "/add-on-plus" },
    ],
  },
  {
    title: "User Management",
    url: "/users",
    icon: IconUser,
    items: [
      { title: "Users", url: "/users" },
      { title: "Work Map", url: "/map" },
    ],
  },
]

export function NavMain() {
  const pathname = usePathname()

  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({
    main: "",
    menu: "",
  })

  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() =>
    menuItems.reduce((acc, item) => {
      acc[item.title] = item.isActive || false
      return acc
    }, {} as Record<string, boolean>)
  )

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  useEffect(() => {
    for (const item of menuItems) {
      for (const subItem of item.items) {
        const matcher = match(subItem.url, { decode: decodeURIComponent })
        if (matcher(pathname)) {
          setSelectedMenu({ main: item.url, menu: subItem.url })
          setOpenItems((prev) => ({
            ...prev,
            [item.title]: true,
          }))
          return
        }
      }
    }
  }, [pathname])

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuItems.map((item) => {
          const isActiveMain =
            selectedMenu.main === item.url ||
            item.items.some((sub) => sub.url === selectedMenu.menu)

          return (
            <Collapsible
              key={item.title}
              open={openItems[item.title]}
              onOpenChange={() => toggleItem(item.title)}
              asChild
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={cn(isActiveMain && "bg-violet-50")}
                    tooltip={item.title}
                  >
                    <div className="flex flex-row justify-between items-center w-full cursor-pointer">
                      <div className="flex flex-row space-x-1 items-center">
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            isActiveMain && "text-violet-500"
                          )}
                        />
                        <span
                          className={cn(isActiveMain && "text-violet-500")}
                        >
                          {item.title}
                        </span>
                      </div>
                      {item.items.length > 0 &&
                        (openItems[item.title] ? (
                          <ChevronDown className="h-3 w-3 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-gray-500" />
                        ))}
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.items.length > 0 && (
                  <CollapsibleContent className="pl-4">
                    {item.items.map((subItem) => {
                      const isSubActive = subItem.url === selectedMenu.menu
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link
                            href={subItem.url}
                            className={cn(
                              "text-sm block py-1.5 px-2 rounded",
                              isSubActive
                                ? "text-violet-600 font-semibold bg-violet-100"
                                : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
