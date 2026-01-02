import React from "react";
import { View } from "react-native";
import { SummaryCard } from "./SummaryCard";
import { useTasks } from "../../../context/TaskContext";

export const StatsOverview = () => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <View className="flex-row gap-3 mb-6">
      <SummaryCard title="Total" value={totalTasks} color="primary" />
      <SummaryCard title="Pending" value={pendingTasks} color="warning" />
      <SummaryCard title="Completed" value={completedTasks} color="success" />
    </View>
  );
};
