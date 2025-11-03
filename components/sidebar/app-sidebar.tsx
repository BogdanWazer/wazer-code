"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import Logo from "@/public/logo.png";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Панель",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Курси",
      url: "/admin/courses",
      icon: IconListDetails,
    },
    {
      title: "Аналітика",
      url: "/admin/analytics",
      icon: IconChartBar,
    },
    // {
    //   title: "Проєкти",
    //   url: "#",
    //   icon: IconFolder,
    // },
    {
      title: "Команда",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Захоплення",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Активні пропозиції",
          url: "#",
        },
        {
          title: "Архів",
          url: "#",
        },
      ],
    },
    {
      title: "Пропозиція",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Активні пропозиції",
          url: "#",
        },
        {
          title: "Архів",
          url: "#",
        },
      ],
    },
    {
      title: "Підказки",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Активні пропозиції",
          url: "#",
        },
        {
          title: "Архів",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Налаштування",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Допомога",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Пошук",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image src={Logo} alt="Logo" className="size-5" />
                <span className="text-base font-semibold">WazerCode.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
