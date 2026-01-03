import React from "react";
import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatsOverview } from "../components/Dashboard/StatsOverview";
import { TaskCharts } from "../components/Dashboard/TaskCharts";
import { RecentTasks } from "../components/Dashboard/RecentTasks";
import { RootStackParamList } from "../../App";
import { Task } from "../types/task";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard"> & {
  getTasks: () => Task[];
};

export const DashboardScreen = ({ getTasks }: Props) => {
  const tasks = getTasks();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-textPrimary text-2xl font-bold mb-2">
          Welcome Back! 👋
        </Text>
        <Text className="text-textSecondary mb-6">
          Here's an overview of your tasks
        </Text>

        <StatsOverview tasks={tasks} />

        {/* Responsive layout: side-by-side on desktop, stacked on mobile */}
        <View className="flex-col md:flex-row gap-4 mt-4">
          <View className="md:flex-1">
            <TaskCharts tasks={tasks} />
          </View>
          <View className="md:flex-1">
            <RecentTasks tasks={tasks} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
