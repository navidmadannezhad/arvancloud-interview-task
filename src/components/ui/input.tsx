import { ComponentProps, FC } from "react";
import { Input as RawInput } from "@base-ui/react/input";
import clsx from "clsx";

interface InputProps extends ComponentProps<typeof RawInput> {
  variant?: "default" | "danger";
}

const Input: FC<InputProps> = ({
  variant = "default",
  ...rest
}) => {
  return (
    <RawInput
      className={clsx(
        "w-full min-h-[40px] rounded-[8px] border-1 px-4 py-2 text-sm",
        "text-muted-dark placeholder:text-muted-light",
        "transition-colors duration-200 outline-none",
        "disabled:cursor-not-allowed disabled:border-muted-light disabled:text-muted-light",
        "data-[disabled]:cursor-not-allowed data-[disabled]:border-muted-light data-[disabled]:text-muted-light",
        {
          "border-muted-light focus:border-primary-main data-[focused]:border-primary-main":
            variant === "default",
          "border-danger-main focus:border-danger-main data-[focused]:border-danger-main":
            variant === "danger",
        },
        rest?.className ?? ""
      )}
      {...rest}
    />
  );
};

export default Input;
