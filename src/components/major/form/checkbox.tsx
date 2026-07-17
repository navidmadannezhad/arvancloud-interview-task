"use client";

import { Checkbox } from "@/src/components/ui";
import { FC, ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface SimpleCheckboxProps extends ComponentProps<typeof Checkbox> {
  label?: string;
}

export const SimpleRawCheckbox: FC<SimpleCheckboxProps> = ({
  label,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox {...rest} />
        {label && (
          <span className="text-sm font-light text-gray-700">{label}</span>
        )}
      </div>
    </div>
  );
};

interface FormCheckboxProps extends SimpleCheckboxProps {
  name: string;
}

export const FormCheckbox: FC<FormCheckboxProps> = ({
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
        <div className="flex flex-col gap-2">
          <SimpleRawCheckbox
            {...rest}
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
          />
          <p className="form-error-msg">
            {errors[name]?.message as string}
          </p>
        </div>
      )}
    />
  );
};
