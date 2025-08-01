import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 15,
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={80}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        ),
        tabBarActiveTintColor: "#A29BFE",
        tabBarInactiveTintColor: "#d6d6d6",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />
        <Tabs.Screen
          name="favorites/index"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="heart-outline" color={color} />
            ),
          }}
        />
    </Tabs>
  );
};

export default TabsLayout;
