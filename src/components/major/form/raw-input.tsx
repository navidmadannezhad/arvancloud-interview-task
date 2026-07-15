"use client"

import { Input } from "@/src/components/ui"
import { FC, ComponentProps } from "react";
import InputWrapper from "./input-wrapper";
import { Controller, useFormContext } from "react-hook-form"

interface SimpleRawInputProps extends ComponentProps<typeof Input>{
    label?: string;
}

export const SimpleRawInput: FC<SimpleRawInputProps> = ({ label, ...rest }) => {
    return (
        <InputWrapper label={label}>
            <Input {...rest} />
        </InputWrapper>
    )
}

interface FormRawInputProps extends SimpleRawInputProps{
    name: string;
}

export const FormRawInput: FC<FormRawInputProps> = ({ name, ...rest }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <InputWrapper>
                    <SimpleRawInput 
                        { ...rest }
                        { ...field } 
                        variant={errors[name] ? "danger" : "default"}
                        onChange={(e) => field.onChange(e.target.value)}
                    />
                    <p className="form-error-msg">
                        {errors[name]?.message as string}
                    </p>
                </InputWrapper>
            )}
        />
    )
}