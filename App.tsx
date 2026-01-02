import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { TaskProvider } from "./src/context/TaskContext";

// Screens
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { TaskListScreen } from "./src/screens/TaskListScreen";
import { TaskDetailsScreen } from "./src/screens/TaskDetailsScreen";
import { TaskFormScreen } from "./src/screens/TaskFormScreen";

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
      <Toast />
    </SafeAreaProvider>
  );
}
