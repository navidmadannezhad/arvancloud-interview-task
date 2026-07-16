"use client";

import { ComponentProps, FC } from "react";
import { Menu as RawMenu } from "@base-ui/react/menu";
import clsx from "clsx";

type MenuRootProps = ComponentProps<typeof RawMenu.Root>;
type MenuTriggerProps = ComponentProps<typeof RawMenu.Trigger>;
type MenuPortalProps = ComponentProps<typeof RawMenu.Portal>;
type MenuPositionerProps = ComponentProps<typeof RawMenu.Positioner>;
type MenuPopupProps = ComponentProps<typeof RawMenu.Popup>;
type MenuItemProps = ComponentProps<typeof RawMenu.Item>;

const MenuRoot: FC<MenuRootProps> = (props) => <RawMenu.Root {...props} />;

const MenuTrigger: FC<MenuTriggerProps> = ({ className, ...rest }) => (
  <RawMenu.Trigger
    className={clsx(
      "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2",
      className,
    )}
    {...rest}
  />
);

const MenuPortal: FC<MenuPortalProps> = (props) => <RawMenu.Portal {...props} />;

const MenuPositioner: FC<MenuPositionerProps> = ({
  sideOffset = 4,
  className,
  ...rest
}) => (
  <RawMenu.Positioner
    sideOffset={sideOffset}
    className={className}
    {...rest}
  />
);

const MenuPopup: FC<MenuPopupProps> = ({ className, ...rest }) => (
  <RawMenu.Popup
    className={clsx(
      "flex min-w-[160px] flex-col gap-3 rounded-xl bg-background p-4 outline-none",
      "shadow-[0_3px_6px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.07)]",
      className,
    )}
    {...rest}
  />
);

const MenuItem: FC<MenuItemProps> = ({ className, ...rest }) => (
  <RawMenu.Item
    className={clsx(
      "cursor-pointer rounded-lg px-1 py-1 text-sm text-muted-dark transition-colors duration-200",
      "data-[highlighted]:bg-secondary-main",
      "focus-visible:outline-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      className,
    )}
    {...rest}
  />
);

const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Positioner: MenuPositioner,
  Popup: MenuPopup,
  Item: MenuItem,
  createHandle: RawMenu.createHandle,
};

export default Menu;
