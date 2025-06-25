import { LayoutGrid, Table } from "lucide-react";
import type * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    url: "/",
  },
  {
    title: "Students & Courses",
    icon: Table,
    url: "/students-courses",
  },
  {
    title: "Faculty Panel",
    icon: Table,
    url: "/faculty-panel",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="">
      <SidebarContent className="pt-14">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Academics</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
