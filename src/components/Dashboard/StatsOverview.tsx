import React from "react";
import { View } from "react-native";
import { SummaryCard } from "./SummaryCard";
import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

export const StatsOverview = ({ tasks }: Props) => {
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
