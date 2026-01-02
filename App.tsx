import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TaskProvider } from "./context/TaskContext";

// Placeholder screens - will be replaced with actual screens
import { View, Text } from "react-native";

const DashboardScreen = () => (
  <View className="flex-1 items-center justify-center bg-background">
    <Text className="text-textPrimary text-xl">Dashboard Screen</Text>
  </View>
);

const TaskListScreen = () => (
  <View className="flex-1 items-center justify-center bg-background">
    <Text className="text-textPrimary text-xl">Task List Screen</Text>
  </View>
);

const TaskDetailsScreen = () => (
  <View className="flex-1 items-center justify-center bg-background">
    <Text className="text-textPrimary text-xl">Task Details Screen</Text>
  </View>
);

const TaskFormScreen = () => (
  <View className="flex-1 items-center justify-center bg-background">
    <Text className="text-textPrimary text-xl">Task Form Screen</Text>
  </View>
);

export type RootStackParamList = {
  Dashboard: undefined;
  TaskList: undefined;
  TaskDetails: { taskId: string };
  TaskForm: { taskId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerStyle: { backgroundColor: "#f8fafc" },
              headerTitleStyle: { fontWeight: "bold", color: "#1e293b" },
              contentStyle: { backgroundColor: "#f8fafc" },
            }}
          >
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: "Dashboard" }}
            />
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{ title: "Tasks" }}
            />
            <Stack.Screen
              name="TaskDetails"
              component={TaskDetailsScreen}
              options={{ title: "Task Details" }}
            />
            <Stack.Screen
              name="TaskForm"
              component={TaskFormScreen}
              options={{ title: "Manage Task", presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </SafeAreaProvider>
  );
}
