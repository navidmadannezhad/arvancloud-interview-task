import { ComponentProps, FC } from "react";
import SpinnerIcon from "@/src/components/major/icons/spinner-icon";
import clsx from "clsx";

interface SpinnerProps extends ComponentProps<typeof SpinnerIcon> {}

const Spinner: FC<SpinnerProps> = ({ 
    ...rest 
}) => {
  return (
    <SpinnerIcon    
        { ...rest }
        className={clsx('animate-[spin_1s_linear_infinite]', rest.className)}
    />
  );
}

export default Spinner;