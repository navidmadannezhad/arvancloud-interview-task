"use client";

import { FC } from "react";
import clsx from "clsx";
import { Menu } from "@/src/components/ui";
import DotsIcon from "@/src/components/major/icons/dots-icon";

export interface OperationOption {
  title: string;
  onClick: () => void;
}

interface OperationButtonsProps {
  operationOptions: OperationOption[];
  className?: string;
}

const OperationButtons: FC<OperationButtonsProps> = ({
  operationOptions,
  className,
}) => {
  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="Open actions menu"
        className={clsx(
          "inline-flex size-8 items-center justify-center rounded-lg border-1 border-muted-light bg-background text-muted-dark transition-colors duration-200",
          "hover:border-muted-main hover:bg-secondary-main",
          className,
        )}
      >
        <DotsIcon size={16} />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end">
          <Menu.Popup>
            {operationOptions.map((option) => (
              <Menu.Item key={option.title} onClick={option.onClick}>
                {option.title}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};

export default OperationButtons;
