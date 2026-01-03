import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card } from "../Shared/Card";
import { Button } from "../Shared/Button";
import { Task } from "../../types/task";
import { RootStackParamList } from "../../../App";

interface Props {
  tasks: Task[];
}

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export const RecentTasks = ({ tasks }: Props) => {
  const navigation = useNavigation<NavProp>();

  // Get the 3 most recent tasks (assuming tasks are ordered by creation)
  const recentTasks = tasks.slice(0, 3);

  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "bg-success" : "bg-secondary";
  };

  const getStatusText = (isCompleted: boolean) => {
    return isCompleted ? "Completed" : "Pending";
  };

  return (
    <Card className="flex-1">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-textPrimary text-lg font-bold">Recent Tasks</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("TaskList")}
          className="px-3 py-1 border border-primary rounded-lg"
        >
          <Text className="text-primary text-xs font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {recentTasks.length > 0 ? (
        <View className="gap-3">
          {recentTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              onPress={() =>
                navigation.navigate("TaskDetails", { taskId: task.id })
              }
              className="flex-row items-center justify-between p-3 bg-background rounded-lg"
            >
              <View className="flex-1 mr-3">
                <Text
                  className="text-textPrimary font-medium"
                  numberOfLines={1}
                >
                  {task.title}
                </Text>
              </View>
              <View
                className={`px-2 py-1 rounded ${getStatusColor(
                  task.isCompleted
                )}`}
              >
                <Text className="text-white text-xs font-medium">
                  {getStatusText(task.isCompleted)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View className="items-center py-6">
          <Text className="text-textSecondary">No tasks yet</Text>
        </View>
      )}
    </Card>
  );
};
