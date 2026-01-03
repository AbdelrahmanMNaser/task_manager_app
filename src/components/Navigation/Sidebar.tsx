import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpen: boolean;
  onClose: () => void;
}

type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItem {
  name: string;
  label: string;
  icon: string;
  route: keyof RootStackParamList;
  params?: object;
}

const menuItems: MenuItem[] = [
  { name: "dashboard", label: "Dashboard", icon: "🏠", route: "Dashboard" },
  { name: "tasks", label: "Tasks", icon: "📋", route: "TaskList" },
  { name: "addTask", label: "Add Task", icon: "➕", route: "TaskForm",params: {}},
]; 

export const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  isOpen,
  onClose,
}: SidebarProps) => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute();

  const isActive = (itemRoute: string) => {
    return route.name === itemRoute;
  };

  const handleNavigate = (item: MenuItem) => {
    if (item.params !== undefined) {
      navigation.navigate(
        item.route as "TaskForm",
        item.params as { taskId?: string }
      );
    } else {
      navigation.navigate(item.route as "Dashboard" | "TaskList");
    }
    onClose();
  };

  return (
    <React.Fragment>
      {/* Mobile overlay */}
      {isOpen && (
        <Pressable
          className="absolute inset-0 bg-black/50 z-40 md:hidden"
          onPress={onClose}
        />
      )}

      {/* Sidebar */}
      <View
        className={`
          bg-[#1e293b] z-50
          ${isOpen ? "flex" : "hidden"} md:flex
          ${isCollapsed ? "w-16" : "w-56"}
          absolute md:relative h-full
          transition-all duration-300
        `}
      >
        {/* Header */}
        <View className="p-4 border-b border-slate-700">
          <View className="flex-row items-center justify-between">
            {!isCollapsed && (
              <Text className="text-white text-xl font-bold">TaskMaster</Text>
            )}
            {/* Collapse button - desktop only */}
            <TouchableOpacity
              onPress={onToggleCollapse}
              className="hidden md:flex p-2"
            >
              <Text className="text-white text-lg">
                {isCollapsed ? "→" : "←"}
              </Text>
            </TouchableOpacity>
            {/* Close button - mobile only */}
            <TouchableOpacity onPress={onClose} className="flex md:hidden p-2">
              <Text className="text-white text-lg">✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="flex-1 py-4">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleNavigate(item)}
              className={`
                flex-row items-center px-4 py-3 mx-2 rounded-lg mb-1
                ${isActive(item.route) ? "bg-primary" : ""}
              `}
            >
              <Text className="text-xl">{item.icon}</Text>
              {!isCollapsed && (
                <Text className="text-white ml-3 text-base">{item.label}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </React.Fragment>
  );
};
