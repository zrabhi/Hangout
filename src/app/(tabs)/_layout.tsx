import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@components/haptic-tab";
import { Colors } from "@constants/theme";
import { useColorScheme } from "@hooks/use-color-scheme";
import { ContactsIcon } from "@icons/Contacts";
import { AnimatedTabBar } from "@components/AnimatedTabBar";
import { MessageIcon } from "@/icons/Message";
import { CallIcon } from "@/icons/Call";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color }) => (
            <ContactsIcon fill={color} height={18} width={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <MessageIcon fill={color} height={18} width={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: "Calls",
          tabBarIcon: ({ color }) => (
            <CallIcon fill={color} height={18} width={18} />
          ),
        }}
      />
    </Tabs>
  );
}
