import { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { FlashList, type FlashListRef } from "@shopify/flash-list";

import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ConversationInput } from "@/components/ui/ConverstationInput";
import { ConversationMessage } from "@/components/ui/ConverstationMessage";

import { usePermissionCheck } from "@/hooks/usePermissionCheck";
import { sendSms } from "@/nativeModule/sms/smsService";
import { useDataBaseContext } from "@/context/DatabaseContext";

import { DeleviryStateType, type Message } from "@/types/Message";
import { MessageType } from "@/types/MessageTYpe";
import { type Contact } from "@/types/Contacts";
import { Loader } from "@/components/ui/Loader";
import { useAppSettings } from "@/context/AppSettingsContext";

export default function ConversationDetail() {
  const { id } = useLocalSearchParams();
  const contactId = Number(id);
  const {t} = useAppSettings();
  const { getConversationByContactId, addMessage, getContactById, isLoading , isAddingMessage} =
    useDataBaseContext();

  const { requestPermission } = usePermissionCheck(
    PermissionsAndroid.PERMISSIONS.SEND_SMS
  );

  const [contact, setContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const flashListRef = useRef<FlashListRef<Message>>(null);


  const loadConversation = useCallback(async () => {
    if (!contactId) return;

    const [contactData, convo] = await Promise.all([
      getContactById(contactId.toString()),
      getConversationByContactId(contactId),
    ]);

    setContact(contactData);
    setMessages(convo);
  }, [contactId]);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);



  const handleSendMessage = async () => {
    if (!text.trim() || !contact) return;

    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const newMessage: Message = {
      contactId,
      body: text,
      type: MessageType.SENT,
      deleviryState: DeleviryStateType.SENT,
      date: Date.now(),
    };

    // 🔥 Optimistic UI
    setMessages((prev) => [...prev, newMessage]);
    setText("");

    const result = await sendSms(contact.address, text);

    const deliveryState = result.success
      ? DeleviryStateType.SENT
      : DeleviryStateType.FAILED;

    await addMessage({
      ...newMessage,
      deleviryState: deliveryState,
    });

    if (!result.success) {
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? { ...msg, deleviryState: deliveryState }
            : msg
        )
      );
    }
    
    flashListRef.current?.scrollToEnd({ animated: true });
  };

  const fullName = contact
    ? `${contact.firstName} ${contact.lastName}`
    : "Conversation";

  if (isLoading) return <Loader />

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <ScreenHeader options={props} isTab={false}>
              <View style={styles.headerContainer}>
                <Text style={styles.fullName}>
                  {fullName}
                </Text>
                <Text style={styles.phoneNumber}>
                  {contact?.address}
                </Text>
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
          data={messages}
          estimatedItemSize={80}
          keyExtractor={(item) =>
            item.id?.toString()
          }
          renderItem={({ item }) => (
            <ConversationMessage
              senderName={fullName}
              time={item.date}
              type={item.type}
              deleviryState={item.deleviryState}
              message={item.body}
            />
          )}
        />

        <ConversationInput
          placeholder={t('typeMessage')}
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
  headerContainer:{
     alignItems: "center" 
  },
  container:{
    flex:1
  },
  fullName:{
      fontSize:16,
      fontFamily:'Baloo2-SemiBold'
  },
  phoneNumber:{
     fontSize: 12, color: "gray" 
  }
})