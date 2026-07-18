"use client";

import { FC, ReactNode } from "react";
import clsx from "clsx";
import { Button } from "@/src/components/ui";
import { DialogParts, DrawerParts } from "@/src/components/ui";
import {
  CheckCircleIcon,
  ForbiddenIcon,
  InfoIcon,
} from "@/src/components/major/icons";
import { useMediaQuery } from "@/src/hooks/ui";

type ModalVariant = "success" | "danger" | "info";

type TitleComponent = FC<{ children: ReactNode }>;
type DescriptionComponent = FC<{ children: ReactNode }>;

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

interface ModalContentProps {
  Title: TitleComponent;
  Description: DescriptionComponent;
  title: string;
  description?: string;
  variant: ModalVariant;
  children: ReactNode;
  cancelLabel: string;
  confirmButton: ReactNode;
  cancelButton: ReactNode;
  isDanger: boolean;
}

const ModalContent: FC<ModalContentProps> = ({
  Title,
  Description,
  title,
  description,
  variant,
  children,
  confirmButton,
  cancelButton,
  isDanger,
}) => {
  const config = variantConfig[variant];
  const { Icon } = config;

  return (
    <>
      <div className="border-b border-secondary-main p-6">
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
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
        {isDanger ? (
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
    </>
  );
};

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
  const isMobile = useMediaQuery("(max-width: 767px)");
  const config = variantConfig[variant];
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

  const contentProps = {
    title,
    description,
    variant,
    children,
    cancelLabel,
    confirmButton,
    cancelButton,
    isDanger: variant === "danger",
  };

  if (isMobile) {
    return (
      <DrawerParts.Root
        open={open}
        onOpenChange={handleOpenChange}
        swipeDirection="down"
      >
        <DrawerParts.Portal>
          <DrawerParts.Backdrop />
          <DrawerParts.Viewport side="bottom">
            <DrawerParts.Popup side="bottom">
              <ModalContent
                Title={DrawerParts.Title}
                Description={DrawerParts.Description}
                {...contentProps}
              />
            </DrawerParts.Popup>
          </DrawerParts.Viewport>
        </DrawerParts.Portal>
      </DrawerParts.Root>
    );
  }

  return (
    <DialogParts.Root open={open} onOpenChange={handleOpenChange}>
      <DialogParts.Portal>
        <DialogParts.Backdrop />
        <DialogParts.Viewport>
          <DialogParts.Popup>
            <ModalContent
              Title={DialogParts.Title}
              Description={DialogParts.Description}
              {...contentProps}
            />
          </DialogParts.Popup>
        </DialogParts.Viewport>
      </DialogParts.Portal>
    </DialogParts.Root>
  );
};

export default ModalWrapper;
