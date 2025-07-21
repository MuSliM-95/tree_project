'use client'

import SidebarWithContent from "@/features/tree/components/menu/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../components";
import { PropsWithChildren } from "react";


export default function TreeSidebarProvider( {children}: PropsWithChildren<unknown>) {
  return (
    <SidebarProvider >
      <SidebarWithContent  />
      <main >
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}