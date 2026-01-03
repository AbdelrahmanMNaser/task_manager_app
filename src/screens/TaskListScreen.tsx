import React from "react";
import { View, Text, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { TaskCard } from "../components/Shared/TaskCard";
import { Button } from "../components/Shared/Button";
import { RootStackParamList } from "../../App";
import { showConfirm } from "../utils/alert";
import { Task } from "../types/task";

type Props = NativeStackScreenProps<RootStackParamList, "TaskList"> & {
  getTasks: () => Task[];
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
};

export const TaskListScreen = ({
  navigation,
  getTasks,
  toggleTaskCompletion,
  deleteTask,
}: Props) => {
  const tasks = getTasks();

  const handleDelete = (id: string, title: string) => {
    showConfirm(
      "Delete Task",
      `Are you sure you want to delete "${title}"?`,
      () => {
        deleteTask(id);
        Toast.show({
          type: "success",
          text1: "Task Deleted",
          text2: `"${title}" has been deleted`,
        });
      },
      "Delete"
    );
  };

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-textSecondary text-lg mb-4">No tasks yet</Text>
      <Button
        title="Create First Task"
        variant="primary"
        onPress={() => navigation.navigate("TaskForm", {})}
      />
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      {tasks.length > 0 && (
        <View className="flex-row justify-end px-4 pt-4">
          <Button
            title="+ New Task"
            size="sm"
            onPress={() => navigation.navigate("TaskForm", {})}
          />
        </View>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <TaskCard
            id={item.id}
            title={item.title}
            description={item.description}
            isCompleted={item.isCompleted}
            onToggle={() => toggleTaskCompletion(item.id)}
            onPress={() =>
              navigation.navigate("TaskDetails", { taskId: item.id })
            }
            onEdit={() => navigation.navigate("TaskForm", { taskId: item.id })}
            onDelete={() => handleDelete(item.id, item.title)}
          />
        )}
      />
    </View>
  );
};
