"use client";

import { Textarea } from "@/src/components/ui";
import { FC, ComponentProps } from "react";
import InputWrapper from "./input-wrapper";
import { Controller, useFormContext } from "react-hook-form";

interface SimpleRawTextareaProps extends ComponentProps<typeof Textarea> {
  label?: string;
}

export const SimpleRawTextarea: FC<SimpleRawTextareaProps> = ({
  label,
  ...rest
}) => {
  return (
    <InputWrapper label={label}>
      <Textarea {...rest} />
    </InputWrapper>
  );
};

interface FormRawTextareaProps extends SimpleRawTextareaProps {
  name: string;
}

export const FormRawTextarea: FC<FormRawTextareaProps> = ({
  name,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputWrapper>
          <SimpleRawTextarea
            {...rest}
            {...field}
            variant={errors[name] ? "danger" : "default"}
            onChange={(e) => field.onChange(e.target.value)}
          />
          <p className="form-error-msg">
            {errors[name]?.message as string}
          </p>
        </InputWrapper>
      )}
    />
  );
};
