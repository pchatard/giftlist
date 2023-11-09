import { FC, ReactNode } from "react";

interface TextProps {
  variant?: "normal" | "large" | "small" | "lead" | "muted";
  children: ReactNode;
}

export const Text: FC<TextProps> = ({ variant = "normal", children }) => {
  switch (variant) {
    case "large":
      return <div className="text-lg font-semibold">{children}</div>;
    case "small":
      return (
        <small className="text-sm font-medium leading-none">{children}</small>
      );
    case "lead":
      return <p className="text-xl text-muted-foreground">{children}</p>;
    case "muted":
      return <p className="text-sm text-muted-foreground">{children}</p>;
    case "normal":
    default:
      return (
        <p className="leading-7 [&:not(:first-child)]:mt-3 md:[&:not(:first-child)]:mt-6">
          {children}
        </p>
      );
  }
};
