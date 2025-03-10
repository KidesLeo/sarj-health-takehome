"use client";

import * as React from "react";
import { BriefcaseMedical, ScrollText } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Wound Assessment",
      url: "assess-wound",
      icon: BriefcaseMedical,
      isActive: true,
    },
    {
      title: "Take Notes",
      url: "note",
      icon: ScrollText,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {open && (
          <Link href="/" className="mt-2 text-center text-xl font-bold">
            sarj.ai
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map(({ title, url, icon: ItemIcon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "my-1 text-base",
                      url === url && "text-sidebar-accent-foreground",
                    )}
                  >
                    <a href={url}>
                      <ItemIcon />
                      <span>{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
