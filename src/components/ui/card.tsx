"use client"

import { ComponentProps, FC, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends ComponentProps<"div"> {
  title?: string;
  children: ReactNode;
  contentClassName?: string;
}

const Card: FC<CardProps> = ({ 
  title,
  children,
  contentClassName,
  ...rest 
}) => {
  return (
    <div
      { ...rest }
      className={clsx("bg-background rounded-lg", rest?.className ?? "")}
    >
      {title && (
        <div className="p-6 border-b border-secondary-main font-bold">
          {title}
        </div>
      )}
      <div 
        className={clsx("p-6", contentClassName ?? "")}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;