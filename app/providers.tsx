"use client"

import { FC, ReactNode, useEffect } from "react";
import { ToastProvider } from "@/src/components/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/src/configs/queryClient";
import { ProgressProvider } from '@bprogress/next/app';

interface ProvidersProps{
    children: ReactNode;
}

const logWelcomeMessage = () => {
    if (process.env.NODE_ENV !== "development") {
        return;
    }

    console.log(
        "%c Dear Arvan team, I hope you like my implementation! %c Navid Madannezhad ",
        "color:#fff;background:#009595;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:600;",
        "color:#009595;background:#f0f0f0;padding:2px 6px;border-radius:0 3px 3px 0;font-weight:500;",
    );
};

const Providers: FC<ProvidersProps> = ({ children }) => {
    useEffect(() => {
        logWelcomeMessage();
    }, []);

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