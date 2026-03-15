import { FlashList, type FlashListRef } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";

import { ConversationInput } from "@/components/ui/ConverstationInput";
import { ConversationMessage } from "@/components/ui/ConverstationMessage";
import { ScreenHeader } from "@/components/ui/ScreenHeader";

import { useDataBaseContext } from "@/context/DatabaseContext";
import { usePermissionCheck } from "@/hooks/usePermissionCheck";
import { sendSms } from "@/nativeModule/sms/smsService";

import { Loader } from "@/components/ui/Loader";
import { useAppSettings } from "@/context/AppSettingsContext";
import { type Contact } from "@/types/Contacts";
import { DeleviryStateType, type Message } from "@/types/Message";
import { MessageType } from "@/types/MessageTYpe";
import { PermissionType } from "@/types/Permissions";
import Colors from "@/utils/Colors";

export default function ConversationDetail() {
  const { id } = useLocalSearchParams();
  const contactId = Number(id);
  const { t, handleSetPermissionPrompt } = useAppSettings();
  const {
    getConversationByContactId,
    handleUpdateMessageStatus: updateMessageStatus,
    addMessage,
    getContactById,
    isLoading,
    isAddingMessage,
    convMessages,
    setConvMessages,
  } = useDataBaseContext();

  const { requestPermission } = usePermissionCheck(
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
  );

  const [contact, setContact] = useState<Contact | null>(null);
  const [text, setText] = useState("");

  const flashListRef = useRef<FlashListRef<Message>>(null);

  const loadConversation = useCallback(async () => {
    if (!contactId) return;

    const [contactData, convo] = await Promise.all([
      getContactById(contactId.toString()),
      getConversationByContactId(contactId),
    ]);
    if (!contactData) return;
    setContact(contactData);
    setConvMessages({
      address: contactData?.address,
      messages: convo,
    });
  }, [contactId]);

  useEffect(() => {
    if (id) loadConversation();
    return () => setConvMessages({ address: null, messages: [] });
  }, [loadConversation, id]);

  const handleSendMessage = async () => {
    if (!text.trim() || !contact || !contact.address) return;

    const hasPermission = await requestPermission();

    if (!hasPermission) {
      handleSetPermissionPrompt(PermissionType.SMS_SEND);
      return;
    }
    const result = await sendSms(contact?.address, text);

    const tempId = -Date.now();
    const newMessage: Message = {
      contactId,
      id: tempId,
      address: contact?.address,
      body: text,
      type: MessageType.SENT,
      deleviryState: DeleviryStateType.PENDING,
      date: Date.now(),
    };

    setConvMessages((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    setText("");

    const deliveryState = result.success
      ? DeleviryStateType.SENT
      : DeleviryStateType.FAILED;

    const savedMessage = await addMessage({
      ...newMessage,
      deleviryState: deliveryState,
    });
    if (savedMessage.success === false) {
      ToastAndroid.showWithGravityAndOffset(
        `${t("errorSendingMessage")}`,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        ToastAndroid.BOTTOM,
        0,
      );
      return;
    }

    setConvMessages((prev) => ({
      ...prev,
      messages: prev.messages.map((msg, index) =>
        index === prev.messages.length - 1
          ? { ...msg, id: savedMessage.id, deleviryState: deliveryState }
          : msg,
      ),
    }));

    flashListRef.current?.scrollToEnd({ animated: true });
  };

  const handleRetryMessage = async (messageId: number) => {
    if (!contact || !contact.address) return;

    setConvMessages((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) =>
        msg.id === messageId
          ? { ...msg, deleviryState: DeleviryStateType.PENDING }
          : msg,
      ),
    }));

    const messageToRetry = convMessages.messages.find(
      (msg) => msg.id === messageId,
    );
    if (!messageToRetry) return;

    const result = await sendSms(contact.address, messageToRetry.body);

    const deliveryState = result.success
      ? DeleviryStateType.SENT
      : DeleviryStateType.FAILED;

    await updateMessageStatus(messageId, deliveryState);

    setConvMessages((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) =>
        msg.id === messageId ? { ...msg, deleviryState: deliveryState } : msg,
      ),
    }));
  };
  const fullName = contact
    ? `${contact.firstName} ${contact.lastName}`
    : "Conversation";

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <ScreenHeader options={props} isTab={false}>
              <View style={styles.headerContainer}>
                <Text style={styles.fullName}>{fullName}</Text>
                <Text style={styles.phoneNumber}>{contact?.address}</Text>
              </View>
            </ScreenHeader>
          ),
        }}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlashList
          ref={flashListRef}
          data={convMessages.messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ConversationMessage
              messageId={item?.id}
              onRetry={handleRetryMessage}
              senderName={fullName}
              time={item.date}
              type={item.type}
              deleviryState={item.deleviryState}
              message={item.body}
            />
          )}
        />

        <ConversationInput
          placeholder={t("typeMessage")}
          input={text}
          editable={!isAddingMessage}
          onPress={handleSendMessage}
          onInputChange={setText}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: Colors.background.screen,
  },
  fullName: {
    fontSize: 24,
    color: Colors.black,
    fontFamily: "Baloo2-Bold",
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: "Baloo2-SemiBold",
    color: Colors.text.gray,
  },
});
