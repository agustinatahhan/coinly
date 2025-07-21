import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "indigo",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="favorites/index"
        options={{
            title: "",
            tabBarIcon: ({ color }) => (
                <Ionicons size={28} name="heart-outline" color={color} />
            ),
        }}
      />
        <Tabs.Screen
          name="home/index"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="home-outline" color={color} />
            ),
          }}
        />
    </Tabs>
  );
};

export default TabsLayout;
