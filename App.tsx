import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useTaskManager } from "./src/hooks/useTaskManager";
import { MainLayout } from "./src/components/Navigation/MainLayout";

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
  const {
    getTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTaskManager();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerStyle: { backgroundColor: "#f8fafc" },
            headerTitleStyle: { fontWeight: "bold", color: "#1e293b" },
            contentStyle: { backgroundColor: "#f8fafc" },
          }}
        >
          <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
            {(props) => (
              <MainLayout>
                <DashboardScreen {...props} getTasks={getTasks} />
              </MainLayout>
            )}
          </Stack.Screen>

          <Stack.Screen name="TaskList" options={{ headerShown: false }}>
            {(props) => (
              <MainLayout>
                <TaskListScreen
                  {...props}
                  getTasks={getTasks}
                  toggleTaskCompletion={toggleTaskCompletion}
                  deleteTask={deleteTask}
                />
              </MainLayout>
            )}
          </Stack.Screen>

          <Stack.Screen name="TaskDetails" options={{ title: "Task Details" }}>
            {(props) => (
              <TaskDetailsScreen
                {...props}
                getTaskById={getTaskById}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="TaskForm"
            options={{ title: "Manage Task", presentation: "modal" }}
          >
            {(props) => (
              <TaskFormScreen
                {...props}
                getTaskById={getTaskById}
                addTask={addTask}
                updateTask={updateTask}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}
