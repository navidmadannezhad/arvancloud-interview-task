"use client"

import { FC, ReactNode } from "react";

interface InputWrapperProps{
    children: ReactNode;
    label?: string;
}

const InputWrapper: FC<InputWrapperProps> = ({ label, children }) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-light text-gray-700">
                    {label}
                </label>
            )}
            {children}
        </div>
    )
}

export default InputWrapper;
