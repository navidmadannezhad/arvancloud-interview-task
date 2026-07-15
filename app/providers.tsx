"use client"

import { FC, ReactNode } from "react";
import ToastProvider from "@/src/components/ui/toast";

interface ProvidersProps{
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    )
}

export default Providers;