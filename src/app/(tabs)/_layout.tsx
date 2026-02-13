import { Tabs } from "expo-router";
import React from "react";

import { AnimatedTabBar } from "@components/AnimatedTabBar";
import { HapticTab } from "@components/haptic-tab";
import { ScreenHeader } from "@components/ui/ScreenHeader";
import { CallIcon } from "@icons/Call";
import { ContactsIcon } from "@icons/Contacts";
import { MessageIcon } from "@icons/Message";

export default function TabLayout() {
 // const {t, headerColor} = useAppSettings();
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
