"use client";

import { ComponentProps, FC, ReactNode } from "react";
import { Drawer as RawDrawer } from "@base-ui/react/drawer";
import clsx from "clsx";
import Button from "./button";

type DrawerSide = "left" | "right" | "bottom";

type DrawerRootProps = ComponentProps<typeof RawDrawer.Root>;
type DrawerTriggerProps = ComponentProps<typeof RawDrawer.Trigger>;
type DrawerPortalProps = ComponentProps<typeof RawDrawer.Portal>;
type DrawerBackdropProps = ComponentProps<typeof RawDrawer.Backdrop>;
type DrawerViewportProps = ComponentProps<typeof RawDrawer.Viewport>;
type DrawerPopupProps = ComponentProps<typeof RawDrawer.Popup> & {
  side?: DrawerSide;
};
type DrawerContentProps = ComponentProps<typeof RawDrawer.Content>;
type DrawerTitleProps = ComponentProps<typeof RawDrawer.Title>;
type DrawerDescriptionProps = ComponentProps<typeof RawDrawer.Description>;
type DrawerCloseProps = ComponentProps<typeof RawDrawer.Close>;

const swipeDirectionBySide: Record<DrawerSide, DrawerRootProps["swipeDirection"]> = {
  left: "left",
  right: "right",
  bottom: "down",
};

const viewportClassBySide: Record<DrawerSide, string> = {
  left: "justify-start",
  right: "justify-end",
  bottom: "items-end justify-center",
};

const popupClassBySide: Record<DrawerSide, string> = {
  left: "h-full w-full max-w-sm border-r border-secondary-main",
  right: "h-full w-full max-w-sm border-l border-secondary-main",
  bottom:
    "w-full max-h-[min(85vh,640px)] rounded-t-2xl border-t border-secondary-main",
};

const popupMotionClassBySide: Record<DrawerSide, string> = {
  left: clsx(
    "data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
    "data-[swiping]:data-[swipe-direction=left]:translate-x-[var(--drawer-swipe-movement-x)]",
  ),
  right: clsx(
    "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
    "data-[swiping]:data-[swipe-direction=right]:translate-x-[var(--drawer-swipe-movement-x)]",
  ),
  bottom: clsx(
    "data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
    "data-[swiping]:data-[swipe-direction=down]:translate-y-[calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y))]",
  ),
};

const DrawerRoot: FC<DrawerRootProps> = (props) => <RawDrawer.Root {...props} />;

const DrawerTrigger: FC<DrawerTriggerProps> = ({ className, ...rest }) => (
  <RawDrawer.Trigger
    className={clsx(
      "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2",
      className,
    )}
    {...rest}
  />
);

const DrawerPortal: FC<DrawerPortalProps> = (props) => <RawDrawer.Portal {...props} />;

const DrawerBackdrop: FC<DrawerBackdropProps> = ({ className, ...rest }) => (
  <RawDrawer.Backdrop
    className={clsx(
      "fixed inset-0 bg-foreground/20 transition-opacity duration-300 ease-out",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      "data-[swiping]:duration-0",
      className,
    )}
    {...rest}
  />
);

const DrawerViewport: FC<DrawerViewportProps & { side?: DrawerSide }> = ({
  side = "right",
  className,
  ...rest
}) => (
  <RawDrawer.Viewport
    className={clsx(
      "fixed inset-0 flex",
      viewportClassBySide[side],
      className,
    )}
    {...rest}
  />
);

const DrawerPopup: FC<DrawerPopupProps> = ({
  side = "right",
  className,
  ...rest
}) => (
  <RawDrawer.Popup
    className={clsx(
      "flex flex-col bg-background outline-none",
      "shadow-[0_3px_6px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.07)]",
      "transition-transform duration-300 ease-out",
      "data-[swiping]:transition-none data-[swiping]:duration-0",
      popupClassBySide[side],
      popupMotionClassBySide[side],
      className,
    )}
    {...rest}
  />
);

const DrawerContent: FC<DrawerContentProps> = ({ className, ...rest }) => (
  <RawDrawer.Content
    className={clsx("flex flex-1 flex-col overflow-y-auto p-6", className)}
    {...rest}
  />
);

const DrawerTitle: FC<DrawerTitleProps> = ({ className, ...rest }) => (
  <RawDrawer.Title
    className={clsx("text-base font-bold text-foreground", className)}
    {...rest}
  />
);

const DrawerDescription: FC<DrawerDescriptionProps> = ({ className, ...rest }) => (
  <RawDrawer.Description
    className={clsx("mt-1 text-sm text-muted-main", className)}
    {...rest}
  />
);

const DrawerClose: FC<DrawerCloseProps> = (props) => <RawDrawer.Close {...props} />;

interface DrawerProps extends Omit<DrawerRootProps, "swipeDirection"> {
  title: string;
  description?: string;
  children: ReactNode;
  trigger?: ReactNode;
  side?: DrawerSide;
  showClose?: boolean;
}

const Drawer: FC<DrawerProps> = ({
  title,
  description,
  children,
  trigger,
  side = "right",
  showClose = true,
  ...rest
}) => {
  return (
    <DrawerRoot swipeDirection={swipeDirectionBySide[side]} {...rest}>
      {trigger && <DrawerTrigger>{trigger}</DrawerTrigger>}
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport side={side}>
          <DrawerPopup side={side}>
            <div className="flex items-start justify-between gap-4 border-b border-secondary-main p-6">
              <div className="min-w-0 flex-1">
                <DrawerTitle>{title}</DrawerTitle>
                {description && <DrawerDescription>{description}</DrawerDescription>}
              </div>
              {showClose && (
                <DrawerClose
                  nativeButton={true}
                  render={
                    <Button
                      variant="muted"
                      size="small"
                      aria-label="Close drawer"
                      className="min-h-8 min-w-8 shrink-0 px-0"
                    >
                      ×
                    </Button>
                  }
                />
              )}
            </div>
            <DrawerContent>{children}</DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </DrawerRoot>
  );
};

const DrawerParts = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Backdrop: DrawerBackdrop,
  Viewport: DrawerViewport,
  Popup: DrawerPopup,
  Content: DrawerContent,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
  Provider: RawDrawer.Provider,
  Indent: RawDrawer.Indent,
  IndentBackground: RawDrawer.IndentBackground,
  SwipeArea: RawDrawer.SwipeArea,
  VirtualKeyboardProvider: RawDrawer.VirtualKeyboardProvider,
  createHandle: RawDrawer.createHandle,
};

export default Drawer;
export { DrawerParts };
export type { DrawerSide };
