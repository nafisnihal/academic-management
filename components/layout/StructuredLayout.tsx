"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import ThemeToggle from "./ThemeToggle";

export default function StructuredLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="mx-2 h-5 w-[1px] bg-accent" />
            <h1 className="text-sm font-semibold">Academic Management</h1>
          </div>
          <ThemeToggle />
        </header>
        <div className="px-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
