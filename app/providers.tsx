"use client"

import { FC, ReactNode } from "react";
import ToastProvider from "@/src/components/ui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/src/configs/queryClient";
import { ProgressProvider } from '@bprogress/next/app';

interface ProvidersProps{
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <QueryClientProvider client={getQueryClient()}>
            <ToastProvider>
            <ProgressProvider
                height="6px"
                color="var(--primary-main)"
                options={{ showSpinner: false }}
                shallowRouting
                
            />
                {children}
            </ToastProvider>
        </QueryClientProvider>
    )
}

export default Providers;