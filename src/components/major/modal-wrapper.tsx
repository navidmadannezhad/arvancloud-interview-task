"use client";

import { FC, ReactNode } from "react";
import clsx from "clsx";
import { Button } from "@/src/components/ui";
import { DialogParts } from "@/src/components/ui/dialog";
import {
  CheckCircleIcon,
  ForbiddenIcon,
  InfoIcon,
} from "@/src/components/major/icons";

type ModalVariant = "success" | "danger" | "info";

const variantConfig = {
  success: {
    iconBackground: "bg-success-light",
    iconColor: "text-success-main",
    Icon: CheckCircleIcon,
    confirmVariant: "primary" as const,
    defaultConfirmLabel: "Confirm",
  },
  danger: {
    iconBackground: "bg-danger-light",
    iconColor: "text-danger-main",
    Icon: ForbiddenIcon,
    confirmVariant: "danger" as const,
    defaultConfirmLabel: "Delete",
  },
  info: {
    iconBackground: "bg-secondary-dense",
    iconColor: "text-muted-dark",
    Icon: InfoIcon,
    confirmVariant: "primary" as const,
    defaultConfirmLabel: "Confirm",
  },
};

interface ModalWrapperProps {
  open: boolean;
  onClose?: () => void;
  variant: ModalVariant;
  title: string;
  description?: string;
  children: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  confirmLoading?: boolean;
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  open,
  onClose,
  variant,
  title,
  description,
  children,
  cancelLabel = "Cancel",
  confirmLabel,
  onConfirm,
  confirmLoading = false,
}) => {
  const config = variantConfig[variant];
  const { Icon } = config;
  const actionLabel = confirmLabel ?? config.defaultConfirmLabel;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose?.();
    }
  };

  const confirmButton = (
    <Button
      variant={config.confirmVariant}
      loading={confirmLoading}
      disabled={confirmLoading}
      onClick={onConfirm}
    >
      {actionLabel}
    </Button>
  );

  const cancelButton = (
    <Button variant="muted" onClick={onClose}>
      {cancelLabel}
    </Button>
  );

  return (
    <DialogParts.Root open={open} onOpenChange={handleOpenChange}>
      <DialogParts.Portal>
        <DialogParts.Backdrop />
        <DialogParts.Viewport>
          <DialogParts.Popup>
            <div className="border-b border-secondary-main p-6">
              <DialogParts.Title>{title}</DialogParts.Title>
              {description && (
                <DialogParts.Description>{description}</DialogParts.Description>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 border-b border-secondary-main p-6 text-center">
              <div
                className={clsx(
                  "flex size-16 items-center justify-center rounded-full",
                  config.iconBackground,
                )}
              >
                <Icon size={40} className={config.iconColor} />
              </div>
              <div className="text-sm text-muted-dark">{children}</div>
            </div>

            <div className="flex justify-end gap-3 p-6">
              {variant === "danger" ? (
                <>
                  {confirmButton}
                  {cancelButton}
                </>
              ) : (
                <>
                  {cancelButton}
                  {confirmButton}
                </>
              )}
            </div>
          </DialogParts.Popup>
        </DialogParts.Viewport>
      </DialogParts.Portal>
    </DialogParts.Root>
  );
};

export default ModalWrapper;
