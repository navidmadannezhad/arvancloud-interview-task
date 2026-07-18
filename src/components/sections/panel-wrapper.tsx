"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header, Sidebar, Spinner } from "@/src/components/ui";
import type { SidebarOption } from "@/src/components/ui";
import DrawerWrapper from "@/src/components/major/drawer-wrapper";
import { useAuthActions, useAuthenticatedUser } from "@/src/hooks";

interface PanelWrapperProps {
  children: ReactNode;
  sidebarOptions: Omit<SidebarOption, "active">[];
}

const PanelWrapper: FC<PanelWrapperProps> = ({ children, sidebarOptions }) => {
  const pathname = usePathname();
  const { authUserData, authUserDataIsPending } = useAuthenticatedUser();
  const { logoutTrigger } = useAuthActions();
  const [menuOpen, setMenuOpen] = useState(false);

  const options: SidebarOption[] = sidebarOptions.map((item) => ({
    ...item,
    active:
      item.link === "/articles"
        ? pathname === "/articles" || pathname.startsWith("/articles/page")
        : pathname === item.link || pathname.startsWith(`${item.link}/`),
  }));
  
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (authUserDataIsPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        username={authUserData?.username ?? "..."}
        onLogout={logoutTrigger}
        onMenuClick={() => setMenuOpen(true)}
      />
      <div className="flex flex-1">
        <Sidebar
          options={options}
          height="100%"
          className="hidden min-h-full md:block"
        />
        <div className="flex-1 md:w-unset w-full bg-secondary-main p-4">{children}</div>
      </div>
      <DrawerWrapper
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
        side="right"
        contentClassName="p-4"
      >
        <Sidebar
          options={options}
          height="100%"
          width="100%"
          className="min-h-full p-0"
        />
      </DrawerWrapper>
    </div>
  );
};

export default PanelWrapper;

