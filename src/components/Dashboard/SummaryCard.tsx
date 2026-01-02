import React from "react";
import { View, Text } from "react-native";
import { Card } from "../Shared/Card";

interface SummaryCardProps {
  title: string;
  value: number;
  color?: "primary" | "success" | "warning" | "danger";
}

export const SummaryCard = ({
  title,
  value,
  color = "primary",
}: SummaryCardProps) => {
  const colorStyles = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };

  return (
    <Card className="flex-1 min-w-[100px]">
      <View className={`w-3 h-3 rounded-full ${colorStyles[color]} mb-2`} />
      <Text className="text-textSecondary text-sm">{title}</Text>
      <Text className="text-textPrimary text-2xl font-bold">{value}</Text>
    </Card>
  );
};
