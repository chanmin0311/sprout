"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:opacity-90 active:scale-[0.98]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted active:scale-[0.98]",
        ghost:
          "bg-transparent text-foreground hover:bg-muted active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-lg [&_svg]:size-4",
        md: "h-10 px-4 text-sm rounded-xl [&_svg]:size-4",
        lg: "h-12 px-6 text-base rounded-2xl [&_svg]:size-5",
        icon: "size-10 rounded-xl [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
