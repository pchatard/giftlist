import { Loader2 } from "lucide-react";
import React, { cloneElement, ReactElement } from "react";

import { Button, ButtonProps } from "../ui/button";

export interface GButtonProps extends ButtonProps {
  icon?: ReactElement;
  loading?: boolean;
  variant?: ButtonProps["variant"];
}

const GButton: React.FC<GButtonProps> = ({
  icon,
  loading,
  children,
  ...props
}) => {
  return (
    <Button {...(loading && { disabled: true })} {...props}>
      {loading && (
        <Loader2
          className={`w-4 h-4 animate-spin ${
            children && props.size !== "icon" ? "mr-2" : ""
          }`}
        />
      )}
      {!loading &&
        icon &&
        cloneElement(icon, {
          className: `w-4 h-4 ${
            children && props.size !== "icon" ? "mr-2" : ""
          }`,
        })}
      {props.size !== "icon" && children}
    </Button>
  );
};

export { GButton };
