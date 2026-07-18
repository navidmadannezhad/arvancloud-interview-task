"use client";

import { Toast as RawToast } from "@base-ui/react/toast";
import { ReactNode } from "react";
import type { ToastVariant } from "@/src/components/ui";

interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  timeout?: number;
}

export const useToaster = () => {
  const manager = RawToast.useToastManager();

  const show = (
    variant: ToastVariant,
    { title, description, timeout = 5000 }: ToastOptions,
  ) =>
    manager.add({
      type: variant,
      title,
      description,
      timeout: variant === "loading" ? 0 : timeout,
    });

  return {
    showSuccessToast: (options: ToastOptions) => show("success", options),
    showFailureToast: (options: ToastOptions) => show("danger", options),
    showLoadingToast: (content: ReactNode) =>
      manager.add({
        type: "loading",
        description: content,
        timeout: 0,
      }),
    closeToast: manager.close,
    updateToast: manager.update,
    promiseToast: manager.promise,
  };
};
