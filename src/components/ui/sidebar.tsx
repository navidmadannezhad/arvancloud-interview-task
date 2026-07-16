import { ComponentProps, FC } from "react";
import Link from "next/link";
import clsx from "clsx";

export interface SidebarOption {
  title: string;
  link: string;
  active: boolean;
  variant: "primary" | "secondary";
}

interface SidebarProps extends ComponentProps<"aside"> {
  options: SidebarOption[];
  height?: string;
  width?: string;
}

const getOptionClassName = (option: SidebarOption) =>
  clsx(
    "block w-full px-4 py-3 text-sm font-medium transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
    {
      "text-foreground hover:bg-primary-light hover:text-primary-main":
        option.variant === "primary" && !option.active,
      "bg-primary-light text-primary-main font-bold":
        option.variant === "primary" && option.active,

      "text-foreground hover:bg-secondary-main hover:text-muted-dark":
        option.variant === "secondary" && !option.active,
      "bg-secondary-main text-muted-dark font-semibold":
        option.variant === "secondary" && option.active,
    },
  );

const Sidebar: FC<SidebarProps> = ({
  options,
  height = "100vh",
  width = "240px",
  className,
  style,
  ...rest
}) => {
  return (
    <aside
      {...rest}
      className={clsx("shrink-0 p-4 bg-background", className)}
      style={{ height, width, ...style }}
    >
      <nav aria-label="Sidebar navigation">
        <ul className="flex flex-col gap-1">
          {options.map((option) => (
            <li key={option.link}>
              <Link
                href={option.link}
                aria-current={option.active ? "page" : undefined}
                className={getOptionClassName(option)}
              >
                {option.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
