import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TaskProvider } from "../context/TaskContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#f8fafc" },
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "bold", color: "#1e293b" },
            contentStyle: { backgroundColor: "#f8fafc" },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
          <Stack.Screen name="tasks/index" options={{ title: "Tasks" }} />
          <Stack.Screen name="tasks/[id]" options={{ title: "Task Details" }} />
          <Stack.Screen
            name="tasks/manage"
            options={{ title: "Manage Task", presentation: "modal" }}
          />
        </Stack>
      </TaskProvider>
    </SafeAreaProvider>
  );
}
