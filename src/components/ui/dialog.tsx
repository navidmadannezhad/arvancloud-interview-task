"use client";

import { ComponentProps, FC, ReactNode } from "react";
import { Dialog as RawDialog } from "@base-ui/react/dialog";
import clsx from "clsx";
import Button from "./button";

type DialogRootProps = ComponentProps<typeof RawDialog.Root>;
type DialogTriggerProps = ComponentProps<typeof RawDialog.Trigger>;
type DialogPortalProps = ComponentProps<typeof RawDialog.Portal>;
type DialogBackdropProps = ComponentProps<typeof RawDialog.Backdrop>;
type DialogViewportProps = ComponentProps<typeof RawDialog.Viewport>;
type DialogPopupProps = ComponentProps<typeof RawDialog.Popup>;
type DialogTitleProps = ComponentProps<typeof RawDialog.Title>;
type DialogDescriptionProps = ComponentProps<typeof RawDialog.Description>;
type DialogCloseProps = ComponentProps<typeof RawDialog.Close>;

const DialogRoot: FC<DialogRootProps> = (props) => <RawDialog.Root {...props} />;

const DialogTrigger: FC<DialogTriggerProps> = ({ className, ...rest }) => (
  <RawDialog.Trigger
    className={clsx(
      "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2",
      className,
    )}
    {...rest}
  />
);

const DialogPortal: FC<DialogPortalProps> = (props) => <RawDialog.Portal {...props} />;

const DialogBackdrop: FC<DialogBackdropProps> = ({ className, ...rest }) => (
  <RawDialog.Backdrop
    className={clsx(
      "fixed inset-0 bg-foreground/20 transition-opacity",
      className,
    )}
    {...rest}
  />
);

const DialogViewport: FC<DialogViewportProps> = ({ className, ...rest }) => (
  <RawDialog.Viewport
    className={clsx(
      "fixed inset-0 flex items-center justify-center p-4",
      className,
    )}
    {...rest}
  />
);

const DialogPopup: FC<DialogPopupProps> = ({ className, ...rest }) => (
  <RawDialog.Popup
    className={clsx(
      "w-full max-w-lg overflow-hidden rounded-xl bg-background outline-none",
      "shadow-[0_3px_6px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.07)]",
      className,
    )}
    {...rest}
  />
);

const DialogTitle: FC<DialogTitleProps> = ({ className, ...rest }) => (
  <RawDialog.Title
    className={clsx("text-base font-bold text-foreground", className)}
    {...rest}
  />
);

const DialogDescription: FC<DialogDescriptionProps> = ({ className, ...rest }) => (
  <RawDialog.Description
    className={clsx("mt-1 text-sm text-muted-main", className)}
    {...rest}
  />
);

const DialogClose: FC<DialogCloseProps> = (props) => <RawDialog.Close {...props} />;

interface DialogProps extends DialogRootProps {
  title: string;
  description?: string;
  children: ReactNode;
  trigger?: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
}

const Dialog: FC<DialogProps> = ({
  title,
  description,
  children,
  trigger,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  confirmLoading = false,
  ...rest
}) => {
  return (
    <DialogRoot {...rest}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <div className="border-b border-secondary-main p-6">
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </div>

            <div className="border-b border-secondary-main p-6">{children}</div>

            <div className="flex justify-end gap-3 p-6">
              <DialogClose
                nativeButton={false}
                render={
                  <Button variant="muted" onClick={onCancel}>
                    {cancelLabel}
                  </Button>
                }
              />
              <DialogClose
                nativeButton={false}
                render={
                  <Button
                    variant="primary"
                    loading={confirmLoading}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </Button>
                }
              />
            </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </DialogRoot>
  );
};

const DialogParts = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Backdrop: DialogBackdrop,
  Viewport: DialogViewport,
  Popup: DialogPopup,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
  createHandle: RawDialog.createHandle,
};

export default Dialog;
export { DialogParts };
