import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@components/haptic-tab";
import { ContactsIcon } from "@icons/Contacts";
import { AnimatedTabBar } from "@components/AnimatedTabBar";
import { MessageIcon } from "@icons/Message";
import { CallIcon } from "@icons/Call";
import { ScreenHeader } from "@components/ui/ScreenHeader";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        header: (props) => <ScreenHeader options={props} />,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Contacts",
          headerShown: true,
          headerTitle: "Contacts",
          tabBarIcon: ({ color }) => (
            <ContactsIcon fill={color} height={18} width={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MessageIcon fill={color} height={18} width={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          headerShown: true,
          title: "Calls",
          tabBarIcon: ({ color }) => (
            <CallIcon fill={color} height={18} width={18} />
          ),
        }}
      />
    </Tabs>
  );
}
