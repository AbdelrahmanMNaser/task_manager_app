import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  title,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = "rounded-lg items-center justify-center";

  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    danger: "bg-danger",
    outline: "bg-transparent border-2 border-primary",
  };

  const sizeStyles = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const textColor = variant === "outline" ? "text-primary" : "text-white";
  const textSize =
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        className || ""
      }`}
      {...props}
    >
      <Text className={`font-semibold ${textColor} ${textSize}`}>{title}</Text>
    </TouchableOpacity>
  );
};
