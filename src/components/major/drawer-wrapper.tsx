"use client";

import { FC, ReactNode } from "react";
import clsx from "clsx";
import { Button } from "@/src/components/ui";
import { DrawerParts } from "@/src/components/ui/drawer";
import type { DrawerSide } from "@/src/components/ui/drawer";

interface DrawerWrapperProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  side?: DrawerSide;
  showClose?: boolean;
  contentClassName?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  confirmLoading?: boolean;
}

const swipeDirectionBySide: Record<
  DrawerSide,
  "left" | "right" | "down"
> = {
  left: "left",
  right: "right",
  bottom: "down",
};

const DrawerWrapper: FC<DrawerWrapperProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  side = "right",
  showClose = true,
  contentClassName,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  confirmLoading = false,
}) => {
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose?.();
    }
  };

  const confirmButton = onConfirm ? (
    <Button
      variant="primary"
      loading={confirmLoading}
      disabled={confirmLoading}
      onClick={onConfirm}
    >
      {confirmLabel}
    </Button>
  ) : null;

  const cancelButton = onConfirm ? (
    <Button variant="muted" onClick={onClose}>
      {cancelLabel}
    </Button>
  ) : null;

  return (
    <DrawerParts.Root
      open={open}
      onOpenChange={handleOpenChange}
      swipeDirection={swipeDirectionBySide[side]}
    >
      <DrawerParts.Portal>
        <DrawerParts.Backdrop />
        <DrawerParts.Viewport side={side}>
          <DrawerParts.Popup side={side}>
            <div className="flex items-start justify-between gap-4 border-b border-secondary-main p-6">
              <div className="min-w-0 flex-1">
                <DrawerParts.Title>{title}</DrawerParts.Title>
                {description && (
                  <DrawerParts.Description>{description}</DrawerParts.Description>
                )}
              </div>
              {showClose && (
                <DrawerParts.Close
                  nativeButton={true}
                  render={
                    <Button
                      variant="muted"
                      size="small"
                      aria-label="Close drawer"
                      className="min-h-8 min-w-8 shrink-0 px-0"
                      onClick={onClose}
                    >
                      ×
                    </Button>
                  }
                />
              )}
            </div>

            <DrawerParts.Content className={clsx(contentClassName)}>
              {children}
            </DrawerParts.Content>

            {onConfirm && (
              <div className="flex justify-end gap-3 border-t border-secondary-main p-6">
                {cancelButton}
                {confirmButton}
              </div>
            )}
          </DrawerParts.Popup>
        </DrawerParts.Viewport>
      </DrawerParts.Portal>
    </DrawerParts.Root>
  );
};

export default DrawerWrapper;
