import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { useTasks } from "../../context/TaskContext";
import { RootStackParamList } from "../../App";
import { showConfirm } from "../utils/alert";

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetails">;

export const TaskDetailsScreen = ({ navigation, route }: Props) => {
  const { taskId } = route.params;
  const { getTaskById, toggleTaskCompletion, deleteTask } = useTasks();

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

  // Set header icons
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-4">
        <Text className="text-textSecondary text-lg">Task not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header Section */}
      <View
        className={`px-4 pt-12 pb-6 ${
          task.isCompleted ? "bg-success/10" : "bg-secondary/10"
        }`}
      >
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-row items-start flex-1 mr-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 -ml-2 mr-2"
            >
              <Text className="text-2xl">←</Text>
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-textPrimary text-2xl font-bold mb-2">
                {task.title}
              </Text>
              <TouchableOpacity
                onPress={() => toggleTaskCompletion(taskId)}
                className="self-start"
              >
                <View
                  className={`flex-row items-center gap-2 px-3 py-1 rounded-full ${
                    task.isCompleted ? "bg-success" : "bg-secondary"
                  }`}
                >
                  <View
                    className={`w-4 h-4 rounded-full border-2 border-white items-center justify-center ${
                      task.isCompleted ? "bg-white" : "bg-transparent"
                    }`}
                  >
                    {task.isCompleted && (
                      <Text className="text-success text-xs font-bold">✓</Text>
                    )}
                  </View>
                  <Text className="text-white text-sm font-medium">
                    {task.isCompleted ? "Completed" : "Pending"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row gap-4 pt-2">
            <TouchableOpacity
              onPress={() => navigation.navigate("TaskForm", { taskId })}
            >
              <Text className="text-xl">✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text className="text-xl">🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView className="flex-1 p-4">
        <Text className="text-textPrimary text-base font-semibold mb-3">
          Description
        </Text>
        <View className="bg-surface rounded-xl p-4 min-h-[120px]">
          <Text className="text-textPrimary text-base leading-6">
            {task.description || "No description provided."}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
