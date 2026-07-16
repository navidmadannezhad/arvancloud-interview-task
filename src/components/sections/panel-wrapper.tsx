"use client";

import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header, Sidebar } from "@/src/components/ui";
import type { SidebarOption } from "@/src/components/ui";
import { useAuth, useAuthenticatedUser } from "@/src/hooks";

interface PanelWrapperProps {
  children: ReactNode;
  sidebarOptions: Omit<SidebarOption, "active">[];
}

const PanelWrapper: FC<PanelWrapperProps> = ({ children, sidebarOptions }) => {
  const pathname = usePathname();
  const { authUserData } = useAuthenticatedUser();
  const { logoutTrigger } = useAuth();

  const options: SidebarOption[] = sidebarOptions.map((item) => ({
    ...item,
    active:
      item.link === "/articles"
        ? pathname === "/articles" || pathname.startsWith("/articles/page")
        : pathname === item.link || pathname.startsWith(`${item.link}/`),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        username={authUserData?.username ?? "..."}
        onLogout={logoutTrigger}
      />
      <div className="flex flex-1">
        <Sidebar options={options} height="100%" className="min-h-full" />
        <div className="flex-1 bg-secondary-main p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PanelWrapper;
