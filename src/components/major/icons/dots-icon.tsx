import { FC } from "react";
import { IconProps } from "@/src/types/common";

const DotsIcon: FC<IconProps> = ({ 
    size = 12, 
    className = "",
    ...rest 
}) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            { ...rest }
        >
            <path d="M4.3501 9.74982C5.59274 9.74982 6.6001 10.7572 6.6001 11.9998C6.6001 13.2425 5.59274 14.2498 4.3501 14.2498C3.10746 14.2498 2.1001 13.2425 2.1001 11.9998C2.1001 10.7572 3.10746 9.74982 4.3501 9.74982Z" fill="currentColor"/>
            <path d="M12.0024 9.74982C13.2451 9.74982 14.2524 10.7572 14.2524 11.9998C14.2524 13.2425 13.2451 14.2498 12.0024 14.2498C10.7598 14.2498 9.75244 13.2425 9.75244 11.9998C9.75244 10.7572 10.7598 9.74982 12.0024 9.74982Z" fill="currentColor"/>
            <path d="M19.6548 9.74982C20.8974 9.74982 21.9048 10.7572 21.9048 11.9998C21.9048 13.2425   20.8974 14.2498 19.6548 14.2498C18.4121 14.2498 17.4048 13.2425 17.4048 11.9998C17.4048 10.7572 18.4121 9.74982 19.6548 9.74982Z" fill="currentColor"/>
        </svg>
    );
}

export default DotsIcon;
