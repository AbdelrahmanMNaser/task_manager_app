import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "./Card";
import { Checkbox } from "./Checkbox";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  onToggle: () => void;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard = ({
  title,
  description,
  isCompleted,
  onToggle,
  onPress,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const borderColor = isCompleted ? "border-l-success" : "border-l-secondary";

  return (
    <Card className={`border-l-4 ${borderColor} mb-3`}>
      <TouchableOpacity onPress={onPress} className="flex-row items-start">
        <Checkbox checked={isCompleted} onToggle={onToggle} />
        <View className="flex-1 ml-3">
          <Text
            className={`text-lg font-semibold ${
              isCompleted
                ? "text-textSecondary line-through"
                : "text-textPrimary"
            }`}
          >
            {title}
          </Text>
          <Text className="text-textSecondary text-sm mt-1" numberOfLines={2}>
            {description}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity onPress={onEdit} className="p-2">
            <Text className="text-primary">✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} className="p-2">
            <Text className="text-danger">🗑️</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
