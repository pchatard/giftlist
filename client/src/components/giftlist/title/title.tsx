import { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TitleProps {
  variant?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  children: ReactNode;
}

export const Title: FC<TitleProps> = ({
  variant = "h1",
  className,
  children,
}) => {
  switch (variant) {
    case "h2":
      return (
        <h2
          className={cn(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            className
          )}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className
          )}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={cn(
            "scroll-m-20 text-xl font-semibold tracking-tight",
            className
          )}
        >
          {children}
        </h4>
      );
    default:
      return (
        <h1
          className={cn(
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            className
          )}
        >
          {children}
        </h1>
      );
  }
};
