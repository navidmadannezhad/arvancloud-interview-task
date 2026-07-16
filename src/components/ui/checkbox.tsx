import { ComponentProps, FC } from "react";
import { Checkbox as RawCheckbox } from "@base-ui/react/checkbox";
import clsx from "clsx";
import CheckIcon from "@/src/components/major/icons/check-icon";

interface CheckboxProps extends ComponentProps<typeof RawCheckbox.Root> {
  variant?: "light" | "main" | "dense" | "dark";
}

const variantStyles = {
  light: {
    checked: "data-[checked]:bg-primary-light data-[checked]:border-primary-light",
    unchecked: "data-[unchecked]:border-muted-light data-[unchecked]:bg-background",
  },
  main: {
    checked: "data-[checked]:bg-primary-main data-[checked]:border-primary-main",
    unchecked: "data-[unchecked]:border-muted-main data-[unchecked]:bg-background",
  },
  dense: {
    checked: "data-[checked]:bg-primary-dense data-[checked]:border-primary-dense",
    unchecked: "data-[unchecked]:border-muted-dense data-[unchecked]:bg-secondary-main",
  },
  dark: {
    checked: "data-[checked]:bg-primary-dark data-[checked]:border-primary-dark",
    unchecked: "data-[unchecked]:border-muted-dark data-[unchecked]:bg-secondary-main",
  },
} as const;

const Checkbox: FC<CheckboxProps> = ({
  variant = "main",
  ...rest
}) => {
  const styles = variantStyles[variant];

  return (
    <RawCheckbox.Root
      className={clsx(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-lg border-1",
        "cursor-pointer transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        styles.checked,
        styles.unchecked,
        rest?.className ?? "",
      )}
      {...rest}
    >
      <RawCheckbox.Indicator className="flex items-center justify-center">
        <CheckIcon className="text-primary-foreground" size={16} />
      </RawCheckbox.Indicator>
    </RawCheckbox.Root>
  );
};

export default Checkbox;
