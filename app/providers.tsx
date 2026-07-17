"use client"

import { FC, ReactNode } from "react";
import ToastProvider from "@/src/components/ui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/src/configs/queryClient";

interface ProvidersProps{
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <QueryClientProvider client={getQueryClient()}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </QueryClientProvider>
    )
}

export default Providers;