import React from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { TaskCard, Button } from "../components/Shared";
import { useTasks } from "../../context/TaskContext";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "TaskList">;

export const TaskListScreen = ({ navigation }: Props) => {
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();

  const handleDelete = (id: string, title: string) => {
    Alert.alert("Delete Task", `Are you sure you want to delete "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTask(id);
          Toast.show({
            type: "success",
            text1: "Task Deleted",
            text2: `"${title}" has been deleted`,
          });
        },
      },
    ]);
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
      <View className="flex-row justify-end px-4 pt-4">
        <Button
          title="+ New Task"
          size="sm"
          onPress={() => navigation.navigate("TaskForm", {})}
        />
      </View>
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
