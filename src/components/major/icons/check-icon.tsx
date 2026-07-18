import { FC } from "react";
import { IconProps } from "@/src/types";

const CheckIcon: FC<IconProps> = ({ 
    size = 12, 
    className = "",
    ...rest 
}) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 12 12" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            { ...rest }
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M10.818 2.68179C10.9937 2.85753 10.9937 3.14245 10.818 3.31819L4.6305 9.50569C4.45477 9.68142 4.16984 9.68142 3.99411 9.50569L1.18161 6.69319C1.00587 6.51745 1.00587 6.23253 1.18161 6.05679C1.35734 5.88105 1.64227 5.88105 1.818 6.05679L4.3123 8.55109L10.1816 2.68179C10.3573 2.50605 10.6423 2.50605 10.818 2.68179Z" fill="currentColor"/>
        </svg>

    );
}

export default CheckIcon;
