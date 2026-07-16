import { ComponentProps, FC } from "react";
import clsx from "clsx";

interface TextareaProps extends ComponentProps<"textarea"> {
  variant?: "default" | "danger";
}

const Textarea: FC<TextareaProps> = ({
  variant = "default",
  ...rest
}) => {
  return (
    <textarea
      className={clsx(
        "w-full min-h-[120px] rounded-[8px] border-1 px-4 py-2 text-sm",
        "text-muted-dark placeholder:text-muted-light",
        "transition-colors duration-200 outline-none resize-y",
        "disabled:cursor-not-allowed disabled:border-muted-light disabled:text-muted-light",
        {
          "border-muted-light focus:border-primary-main":
            variant === "default",
          "border-danger-main focus:border-danger-main":
            variant === "danger",
        },
        rest?.className ?? "",
      )}
      {...rest}
    />
  );
};

export default Textarea;
