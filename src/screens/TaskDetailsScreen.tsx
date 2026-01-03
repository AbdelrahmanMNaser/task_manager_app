import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { RootStackParamList } from "../../App";
import { showConfirm } from "../utils/alert";
import { Task } from "../types/task";

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetails"> & {
  getTaskById: (id: string) => Task | undefined;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
};

export const TaskDetailsScreen = ({
  navigation,
  route,
  getTaskById,
  toggleTaskCompletion,
  deleteTask,
}: Props) => {
  const { taskId } = route.params;

  const task = getTaskById(taskId);

  const handleDelete = () => {
    showConfirm(
      "Delete Task",
      `Are you sure you want to delete "${task?.title}"?`,
      () => {
        const title = task?.title;
        deleteTask(taskId);
        navigation.goBack();
        Toast.show({
          type: "success",
          text1: "Task Deleted",
          text2: `"${title}" has been deleted`,
        });
      },
      "Delete"
    );
  };

  // Set header options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: task?.title || "Task Details",
      headerStyle: { backgroundColor: "#f8fafc" },
      headerShadowVisible: false,
      headerRight: () => (
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("TaskForm", { taskId })}
          >
            <Text className="text-xl">✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text className="text-xl">🗑️</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, task, taskId]);

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-4">
        <Text className="text-textSecondary text-lg">Task not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Dynamic Status Banner */}
      <View
        className={`px-4 py-3 flex-row items-center justify-between ${
          task.isCompleted ? "bg-success/10" : "bg-secondary/10"
        }`}
      >
        <TouchableOpacity
          onPress={() => toggleTaskCompletion(taskId)}
          className="flex-row items-center gap-2"
        >
          <View
            className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
              task.isCompleted
                ? "bg-success border-success"
                : "border-secondary"
            }`}
          >
            {task.isCompleted && (
              <Text className="text-white text-xs font-bold">✓</Text>
            )}
          </View>
          <Text
            className={`text-sm font-semibold ${
              task.isCompleted ? "text-success" : "text-secondary"
            }`}
          >
            {task.isCompleted ? "Completed" : "Mark as Done"}
          </Text>
        </TouchableOpacity>
        <Text className="text-textSecondary text-xs">
          Status: {task.isCompleted ? "Done" : "In Progress"}
        </Text>
      </View>

      <View className="p-4">
        <Text className="text-textPrimary text-base font-semibold mb-2">
          Description
        </Text>
        <View className="bg-surface border border-gray-300 rounded-lg p-3 min-h-[150px]">
          <Text className="text-textPrimary text-base leading-6">
            {task.description || "No description provided."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
