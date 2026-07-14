import { FC } from "react";
import { IconProps } from "@/src/types/common";

const CheckCircleIcon: FC<IconProps> = ({ 
    size = 20, 
    className = "",
    ...rest 
}) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            { ...rest }
        >
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M9.9 1.8C5.42606 1.8 1.8 5.42606 1.8 9.9C1.8 14.3739 5.42606 18 9.9 18C14.3739 18 18 14.3739 18 9.9C18 5.42606 14.3739 1.8 9.9 1.8ZM9.9 0C4.43194 0 0 4.43194 0 9.9C0 15.3681 4.43194 19.8 9.9 19.8C15.3681 19.8 19.8 15.3681 19.8 9.9C19.8 4.43194 15.3681 0 9.9 0Z" 
                fill="currentColor"
            />
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M14.5364 7.2636C14.8879 7.61508 14.8879 8.18492 14.5364 8.5364L9.5364 13.5364C9.18492 13.8879 8.61508 13.8879 8.2636 13.5364L5.2636 10.5364C4.91213 10.1849 4.91213 9.61508 5.2636 9.2636C5.61508 8.91213 6.18492 8.91213 6.5364 9.2636L8.9 11.6272L13.2636 7.2636C13.6151 6.91213 14.1849 6.91213 14.5364 7.2636Z" 
                fill="currentColor"
            />
        </svg>
    );
}

export default CheckCircleIcon;