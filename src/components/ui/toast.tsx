"use client";

import { FC, ReactNode } from "react";
import { Toast as RawToast } from "@base-ui/react/toast";
import clsx from "clsx";
import Spinner from "./spinner";
import { toastManager } from "@/src/utils/toast";

export type ToastVariant = "success" | "danger" | "loading";

interface ToastProviderProps {
  children: ReactNode;
}

const ToastList: FC = () => {
  const { toasts } = RawToast.useToastManager();

  return (
    <RawToast.Portal>
      <RawToast.Viewport
        className={clsx(
          "fixed top-4 left-1/2 z-[1000] -translate-x-1/2",
          "flex w-full max-w-md flex-col items-center gap-2 px-4",
          "pointer-events-none outline-none",
        )}
      >
        {toasts.map((toast) => (
          <RawToast.Root
            key={toast.id}
            toast={toast}
            // WIP -- direction not working
            // WIP -- animation not working like in document, if multiple toasts are shown, the animation is not smooth
            swipeDirection={["up", "right"]}
            className={clsx(
              "pointer-events-auto",
              "rounded-xl px-6 py-3",
              "shadow-[0_3px_8px_rgba(0,0,0,0.05)]",
              "transition-all duration-200",
              "data-[type=success]:bg-success-light",
              "data-[type=danger]:bg-danger-light",
              "data-[type=loading]:bg-secondary-main",
              "data-[limited]:opacity-0",
              "data-[starting-style]:opacity-0 data-[starting-style]:-translate-y-2",
              "data-[ending-style]:opacity-0 data-[ending-style]:-translate-y-2",
            )}
          >
            <RawToast.Content className="overflow-hidden">
              <div className="flex items-center gap-2">
                {toast.type === "loading" && (
                  <Spinner
                    className="size-4 shrink-0"
                    trackColor="var(--muted-light)"
                    tailColor="var(--muted-main)"
                  />
                )}
                {toast.title && (
                  <RawToast.Title
                    className={clsx(
                      "shrink-0 text-sm font-semibold",
                      "data-[type=success]:text-success-main",
                      "data-[type=danger]:text-danger-main",
                      "data-[type=loading]:text-muted-dark",
                    )}
                  />
                )}
                {toast.description && (
                  <RawToast.Description
                    className={clsx(
                      "text-sm font-light",
                      "data-[type=success]:text-success-dense",
                      "data-[type=danger]:text-danger-dense",
                      "data-[type=loading]:text-muted-main",
                    )}
                  />
                )}
              </div>
            </RawToast.Content>
          </RawToast.Root>
        ))}
      </RawToast.Viewport>
    </RawToast.Portal>
  );
};

const ToastProvider: FC<ToastProviderProps> = ({ children }) => (
  <RawToast.Provider toastManager={toastManager}>
    {children}
    <ToastList />
  </RawToast.Provider>
);

export default ToastProvider;
