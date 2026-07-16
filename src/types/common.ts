import { SVGProps } from "react";

export interface IconProps{}export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}