import { ComponentProps, FC, ReactNode } from "react";
import { Button as RawButton } from '@base-ui/react/button';
import clsx from "clsx";
import Spinner from "./spinner";

interface ButtonProps extends ComponentProps<typeof RawButton>{
    children: ReactNode;
    variant?: "primary" | "muted" | "danger";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
    loading?: boolean;
}

const Button: FC<ButtonProps> = ({ 
    children, 
    variant = "primary", 
    size = "medium",
    fullWidth = false,
    loading = false,
    ...rest 
}) => {
  return (
    <RawButton 
        { ...rest }
        className={
            clsx(
                // Base styles
                'relative inline-flex items-center justify-center',
                'font-medium transition-all duration-200',
                'rounded-[10px]', // MUI's default border radius
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'disabled:opacity-50 disabled:pointer-events-none',
                'cursor-pointer select-none',
                'border-0', // Remove default border
                
                // Size variants
                {
                    'p-2 py-1 text-xs min-h-[24px]': size === 'small',
                    'p-4 py-2 text-sm min-h-[36px]': size === 'medium',
                    'p-6 py-3 text-base min-h-[48px]': size === 'large',
                },
                
                // Shadow (MUI style elevation)
                'shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.05)]',
                'hover:shadow-[0_3px_6px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.07)]',
                'active:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.05)]',
                
                // Color variants using CSS variables
                {
                    // Primary
                    'bg-primary-main text-primary-foreground hover:bg-primary-dense active:bg-primary-main focus-visible:ring-primary-light':
                        variant === 'primary',
                    
                    // Danger
                    'bg-danger-main text-danger-foreground hover:bg-danger-dense active:bg-danger-main focus-visible:ring-danger-light':
                        variant === 'danger',
                    
                    // Muted
                    'text-muted-foreground border-1 border-muted-light hover:border-muted-main active:border-muted-light focus-visible:ring-success-light shadow-none hover:shadow-none active:shadow-none':
                        variant === 'muted',
                },
                
                // Full width
                {
                    'w-full': fullWidth,
                },
                
                // Disabled state (override shadows)
                'disabled:shadow-none',
                
                rest?.className ?? ""
            )
        }
    >
        <>
            {loading ? (
                <Spinner
                    trackColor={
                        variant === "muted" ? "var(--muted-main)"
                        : "var(--primary-foreground)"
                    }
                    tailColor={
                        variant === "muted" ? "var(--muted-dark)"
                        : "var(--muted-light)"
                    }
                />
            ) : children}
        </>
    </RawButton>
  );
}

export default Button;