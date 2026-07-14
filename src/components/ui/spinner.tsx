import { ComponentProps, FC } from "react";
import SpinnerIcon from "@/src/components/major/icons/spinner-icon";

interface SpinnerProps extends ComponentProps<typeof SpinnerIcon> {}

const Spinner: FC<SpinnerProps> = ({ 
    ...rest 
}) => {
  return (
    <SpinnerIcon    
        className='animate-[spin_1s_linear_infinite]'
        { ...rest }
    />
  );
}

export default Spinner;