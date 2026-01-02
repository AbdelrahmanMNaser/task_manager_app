import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatsOverview, TaskCharts } from "../components/Dashboard";
import { Button } from "../components/Shared";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export const DashboardScreen = ({ navigation }: Props) => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-textPrimary text-2xl font-bold mb-2">
          Welcome Back! 👋
        </Text>
        <Text className="text-textSecondary mb-6">
          Here's an overview of your tasks
        </Text>

        <StatsOverview />
        <TaskCharts />

        <View className="flex-row gap-3 mt-6">
          <View className="flex-1">
            <Button
              title="View Tasks"
              variant="primary"
              onPress={() => navigation.navigate("TaskList")}
            />
          </View>
          <View className="flex-1">
            <Button
              title="Add Task"
              variant="outline"
              onPress={() => navigation.navigate("TaskForm", {})}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
