import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTasks } from "../../../context/TaskContext";
import { Card } from "../Shared/Card";

export const TaskCharts = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const pendingTasks = tasks.length - completedTasks;

  const pieData = [
    {
      value: pendingTasks,
      color: "#f97316", // secondary/warning - orange
      text: `${pendingTasks}`,
      focused: pendingTasks > completedTasks,
    },
    {
      value: completedTasks,
      color: "#22c55e", // success - green
      text: `${completedTasks}`,
      focused: completedTasks >= pendingTasks,
    },
  ];

  const hasData = tasks.length > 0;

  return (
    <Card className="items-center py-6">
      <Text className="text-textPrimary text-lg font-bold mb-4">
        Task Distribution
      </Text>
      {hasData ? (
        <View className="items-center">
          <PieChart
            data={pieData}
            donut
            radius={80}
            innerRadius={50}
            centerLabelComponent={() => (
              <View className="items-center">
                <Text className="text-textPrimary text-2xl font-bold">
                  {tasks.length}
                </Text>
                <Text className="text-textSecondary text-xs">Tasks</Text>
              </View>
            )}
          />
          <View className="flex-row gap-6 mt-4">
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 rounded-full bg-secondary" />
              <Text className="text-textSecondary text-sm">Pending</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 rounded-full bg-success" />
              <Text className="text-textSecondary text-sm">Completed</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text className="text-textSecondary">No tasks yet</Text>
      )}
    </Card>
  );
};
