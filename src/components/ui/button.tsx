import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-wide user-select-none transition-all duration-[180ms] ease-out focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[hsl(var(--focus-ring))] focus-visible:outline-offset-[3px] disabled:pointer-events-none disabled:opacity-56 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary / Filled - CTA principal
        default: 
          "bg-[hsl(var(--btn-bg))] text-[hsl(var(--btn-text-on-brand))] shadow-[var(--btn-shadow)] border-[1.5px] border-transparent " +
          "hover:bg-[hsl(var(--btn-bg-hover))] hover:-translate-y-[1px] " +
          "active:bg-[hsl(var(--btn-bg-pressed))] active:translate-y-0 active:shadow-[var(--btn-shadow-pressed)]",
        
        // Primary with gradient for hero sections
        gradient:
          "bg-gradient-to-b from-[hsl(var(--btn-bg))] to-[hsl(var(--btn-bg))]/88 text-[hsl(var(--btn-text-on-brand))] shadow-[var(--btn-shadow)] border-[1.5px] border-transparent " +
          "hover:from-[hsl(var(--btn-bg-hover))] hover:to-[hsl(var(--btn-bg-hover))]/88 hover:-translate-y-[1px] " +
          "active:from-[hsl(var(--btn-bg-pressed))] active:to-[hsl(var(--btn-bg-pressed))]/88 active:translate-y-0 active:shadow-[var(--btn-shadow-pressed)]",
        
        // Secondary / Outline
        outline: 
          "bg-card text-[hsl(var(--btn-text))] border-[1.5px] border-[hsl(var(--btn-outline))] " +
          "hover:bg-[hsl(var(--btn-ghost-hover))] hover:border-[hsl(var(--btn-outline-hover))] hover:-translate-y-[1px] " +
          "active:bg-[hsl(var(--btn-ghost-hover))] active:translate-y-0",
        
        // Outline with brand glow (dupla borda)
        "outline-glow":
          "bg-card text-[hsl(var(--btn-bg))] border-[1.5px] border-[hsl(var(--btn-bg))] " +
          "hover:shadow-[0_0_0_4px_rgba(245,110,15,0.15)] hover:-translate-y-[1px] " +
          "active:shadow-[0_0_0_4px_rgba(245,110,15,0.15)] active:translate-y-0",
        
        // Ghost / Text
        ghost: 
          "bg-transparent text-[hsl(var(--btn-text))] border-[1.5px] border-transparent " +
          "hover:bg-[hsl(var(--btn-ghost-hover))] " +
          "active:bg-[hsl(var(--btn-ghost-hover))]/80",
        
        // Destructive
        destructive: 
          "bg-destructive text-destructive-foreground shadow-[var(--btn-shadow)] border-[1.5px] border-transparent " +
          "hover:bg-destructive/90 hover:-translate-y-[1px] " +
          "active:bg-destructive/80 active:translate-y-0 active:shadow-[var(--btn-shadow-pressed)]",
        
        // Link style (mantido para compatibilidade)
        link: 
          "text-[hsl(var(--btn-bg))] underline-offset-4 hover:underline hover:text-[hsl(var(--btn-bg-hover))]",
      },
      size: {
        // Large: 48px
        lg: "h-12 px-5 text-base rounded-[var(--btn-radius)] [&_svg]:size-5",
        // Medium: 40px (default)
        default: "h-10 px-4 text-[15px] rounded-[var(--btn-radius)] [&_svg]:size-[18px]",
        // Small: 32px
        sm: "h-8 px-3 text-sm rounded-[var(--btn-radius-sm)] [&_svg]:size-4",
        // Icon buttons - circular
        icon: "h-10 w-10 rounded-full [&_svg]:size-[18px]",
        "icon-lg": "h-12 w-12 rounded-full [&_svg]:size-5",
        "icon-sm": "h-7 w-7 rounded-full [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        style={loading ? { cursor: 'progress' } : undefined}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
