import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: ReactNode;
  variant?: "default" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = ({
  children,
  variant = "default",
  padding = "md",
  className,
  ...props
}: CardProps) => {
  const baseStyles = "rounded-xl";

  const variantStyles = {
    default: "bg-surface shadow-sm",
    outlined: "bg-surface border border-gray-200",
  };

  const paddingStyles = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <View
      className={`${baseStyles} ${variantStyles[variant]} ${
        paddingStyles[padding]
      } ${className || ""}`}
      {...props}
    >
      {children}
    </View>
  );
};
