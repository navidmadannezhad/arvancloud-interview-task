import { FC } from "react";
import { IconProps } from "@/src/types";

const ForbiddenIcon: FC<IconProps> = ({ 
    size = 24, 
    className = "",
    ...rest 
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} { ...rest }>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 8.47988C12.4971 8.47988 12.9 8.88283 12.9 9.37988V13.1199C12.9 13.6169 12.4971 14.0199 12 14.0199C11.503 14.0199 11.1 13.6169 11.1 13.1199V9.37988C11.1 8.88283 11.503 8.47988 12 8.47988Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.85 16.3783C10.8472 15.7384 11.3663 15.225 11.999 15.225C12.6327 15.225 13.15 15.7376 13.15 16.375C13.15 17.0101 12.6351 17.525 12 17.525C11.3661 17.525 10.8518 17.0118 10.85 16.3783Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M13.2472 4.58545C12.6956 3.61944 11.3039 3.61944 10.7523 4.58545L3.09317 17.9897C2.5454 18.9475 3.23672 20.1402 4.34074 20.1402H19.6587C20.7614 20.1402 21.4537 18.9479 20.9063 17.9896L13.2472 4.58545ZM14.8102 3.69269C13.5677 1.51703 10.4318 1.51703 9.18931 3.69269C9.18926 3.69277 9.18936 3.6926 9.18931 3.69269L1.53048 17.0964C0.296248 19.2546 1.85477 21.9402 4.34074 21.9402H19.6587C22.1441 21.9402 23.7018 19.2544 22.4692 17.0968L14.8102 3.69269C14.8102 3.69277 14.8101 3.6926 14.8102 3.69269Z" fill="currentColor"/>
        </svg>
    );
}

export default ForbiddenIcon;
