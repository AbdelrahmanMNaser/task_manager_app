import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
        onPress: () => deleteTask(id),
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
      <View className="p-4 bg-surface border-t border-gray-200">
        <Button
          title="Add New Task"
          variant="primary"
          onPress={() => navigation.navigate("TaskForm", {})}
        />
      </View>
    </View>
  );
};
