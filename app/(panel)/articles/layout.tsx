import PanelWrapper from "@/src/components/sections/panel-wrapper";
import type { SidebarOption } from "@/src/components/ui";

const sidebarOptions: Omit<SidebarOption, "active">[] = [
  {
    title: "All Articles",
    link: "/articles",
    variant: "primary",
  },
  {
    title: "New Article",
    link: "/articles/create",
    variant: "primary",
  },
];

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PanelWrapper sidebarOptions={sidebarOptions}>{children}</PanelWrapper>
  );
}
