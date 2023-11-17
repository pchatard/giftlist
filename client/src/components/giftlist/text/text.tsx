import { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TextProps {
  variant?: "normal" | "large" | "small" | "lead" | "muted";
  className?: string;
  children: ReactNode;
}

export const Text: FC<TextProps> = ({
  variant = "normal",
  className,
  children,
}) => {
  switch (variant) {
    case "large":
      return (
        <div className={cn("text-lg font-semibold", className)}>{children}</div>
      );
    case "small":
      return (
        <small className={cn("text-sm font-medium leading-none", className)}>
          {children}
        </small>
      );
    case "lead":
      return (
        <p className={cn("text-xl text-muted-foreground", className)}>
          {children}
        </p>
      );
    case "muted":
      return (
        <p className={cn("text-sm text-muted-foreground", className)}>
          {children}
        </p>
      );
    case "normal":
    default:
      return (
        <p
          className={cn(
            "leading-7 [&:not(:first-child)]:mt-3 md:[&:not(:first-child)]:mt-6",
            className
          )}
        >
          {children}
        </p>
      );
  }
};
