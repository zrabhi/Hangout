import { Tabs } from "expo-router";
import React from "react";

import { AnimatedTabBar } from "@components/AnimatedTabBar";
import { HapticTab } from "@components/haptic-tab";
import { ScreenHeader } from "@components/ui/ScreenHeader";
import { CallIcon } from "@icons/Call";
import { ContactsIcon } from "@icons/Contacts";
import { MessageIcon } from "@icons/Message";
import Colors from "@/utils/Colors";
import { useAppSettings } from "@/context/AppSettingsContext";
import { PermissionModal } from "@/components/ui/PermissionsMessageModal";
import { PermissionsDialog } from "@/utils/PermissionsDialog";

export default function TabLayout() {
  const { t, permissionPrompt, handleCloseModal, handlePressSettingButton } =
    useAppSettings();
  return (
    <>
      <Tabs
        tabBar={(props) => <AnimatedTabBar {...props} />}
        screenOptions={{
          sceneStyle: {
            backgroundColor: Colors.background.screen,
          },
          header: (props) => <ScreenHeader options={props} />,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("allContacts"),
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <ContactsIcon fill={color} height={18} width={18} />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: t("inbox"),
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
            title: t("calls"),
            tabBarIcon: ({ color }) => (
              <CallIcon fill={color} height={18} width={18} />
            ),
          }}
        />
      </Tabs>
      <PermissionModal
        isModalVisible={permissionPrompt.visible}
        message={t(PermissionsDialog[permissionPrompt.permission] ?? "search")}
        onClose={handleCloseModal}
        onPress={handlePressSettingButton}
      />
    </>
  );
}
