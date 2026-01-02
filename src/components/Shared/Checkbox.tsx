import React from "react";
import { TouchableOpacity, View } from "react-native";

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
}

export const Checkbox = ({ checked, onToggle, size = "md" }: CheckboxProps) => {
  const sizeStyles = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`${
        sizeStyles[size]
      } rounded border-2 items-center justify-center ${
        checked ? "bg-success border-success" : "bg-surface border-gray-300"
      }`}
    >
      {checked && (
        <View className="w-2 h-4 border-r-2 border-b-2 border-white rotate-45 mb-1" />
      )}
    </TouchableOpacity>
  );
};
