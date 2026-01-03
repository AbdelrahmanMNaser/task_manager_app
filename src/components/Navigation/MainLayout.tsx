import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
  useWindowDimensions,
} from "react-native";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const SWIPE_THRESHOLD = 50;

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const translateX = useRef(new Animated.Value(-250)).current;

  /* Function for Gesture Handling  */
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        // Only respond to touches near the left edge
        return evt.nativeEvent.pageX < 30;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return evt.nativeEvent.pageX < 30 && gestureState.dx > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.min(0, Math.max(-250, -250 + gestureState.dx));
        translateX.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          setIsSidebarOpen(true);
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: -250,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openSidebar = () => {
    setIsSidebarOpen(true);
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    Animated.spring(translateX, {
      toValue: -250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      className="flex-1 flex-row bg-background"
      {...(isMobile ? panResponder.panHandlers : {})}
    >
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          isOpen={true}
          onClose={() => {}}
        />
      )}

      {/* Mobile Sidebar - Animated */}
      {isMobile && (
        <>
          {isSidebarOpen && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={closeSidebar}
              className="absolute inset-0 bg-black/50 z-40"
            />
          )}
          <Animated.View
            style={{
              transform: [{ translateX }],
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 50,
              width: 224,
            }}
          >
            <View className="flex-1 bg-[#1e293b]">
              <Sidebar
                isCollapsed={false}
                onToggleCollapse={() => {}}
                isOpen={true}
                onClose={closeSidebar}
              />
            </View>
          </Animated.View>
        </>
      )}

      {/* Main Content */}
      <View className="flex-1">
        {/* Mobile Header with Hamburger */}
        {isMobile && (
          <View className="flex-row items-center px-4 py-3 bg-surface border-b border-gray-200">
            <TouchableOpacity onPress={openSidebar} className="p-2 mr-3">
              <Text className="text-xl">☰</Text>
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg font-bold">
              TaskMaster
            </Text>
          </View>
        )}

        {/* Content */}
        {children}
      </View>
    </View>
  );
};
