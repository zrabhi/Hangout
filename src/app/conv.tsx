import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
} from "react-native";
import * as SMS from "expo-sms";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ConversationInput } from "@/components/ui/ConverstationInput";
import { ConversationMessage } from "@/components/ui/ConverstationMessage";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import Colors from "@/utils/Colors";
import { usePermissionCheck } from "@/hooks/usePermissionCheck";

import { sendSms } from "@/nativeModule/sms/smsService";
type Sms = {
  _id: string;
  address: string;
  body: string;
  date: string;
  type: string;
};

export default function ConversationDetail() {
  const { id, fullName, address, image, phoneNumber } = useLocalSearchParams();

  const {requestPermission} = usePermissionCheck(PermissionsAndroid.PERMISSIONS.SEND_SMS);
  const [messages, setMessages] = useState<Sms[]>([
    {
      _id: "1",
      address: "+123456789", // the other contact
      body: "Hey! How’s your day going?",
      date: (Date.now() - 60000).toString(),
      type: "1", // received
    },
    {
      _id: "2",
      address: "+123456789",
      body: "Hi! Pretty good, just finished a workout. You?",
      date: (Date.now() - 50000).toString(),
      type: "2", // sent
    },
    {
      _id: "3",
      address: "+123456789",
      body: "Nice! I’ve been working on a project all day. 😅",
      date: (Date.now() - 40000).toString(),
      type: "1",
    },
    {
      _id: "4",
      address: "+123456789",
      body: "Cool! Want to grab a coffee later?",
      date: (Date.now() - 30000).toString(),
      type: "2",
    },
    {
      _id: "5",
      address: "+123456789",
      body: "Sounds perfect! Let’s meet at 5pm.",
      date: (Date.now() - 20000).toString(),
      type: "1",
    },
    {
      _id: "6",
      address: "+123456789",
      body: "See you then! 😎",
      date: (Date.now() - 10000).toString(),
      type: "2",
    },
    {
      _id: "7",
      address: "+123456789",
      body: "Cool! Want to grab a coffee later?",
      date: (Date.now() - 30000).toString(),
      type: "2",
    },
    {
      _id: "8",
      address: "+123456789",
      body: "Sounds perfect! Let’s meet at 5pm.",
      date: (Date.now() - 20000).toString(),
      type: "1",
    },
    {
      _id: "9",
      address: "+123456789",
      body: "See you then! 😎",
      date: (Date.now() - 10000).toString(),
      type: "2",
    },
  ]);
  const [text, setText] = useState("");
  const flashListRef = useRef<FlashListRef<Sms>>(null);

  const loadMessagesForContact = async () => {
    const getSms = (box: "inbox" | "sent") =>
      new Promise<Sms[]>((resolve) =>
        SmsAndroid.list(
          JSON.stringify({ box, maxCount: 1000 }),
          () => resolve([]),
          (_, smsList) =>
            resolve(
              JSON.parse(smsList).filter((msg: Sms) => msg.address === address),
            ),
        ),
      );

    const inbox = await getSms("inbox");
    const sent = await getSms("sent");

    const allMessages = [...inbox, ...sent].sort(
      (a, b) => Number(a.date) - Number(b.date),
    );
    setMessages(allMessages);
  };

  useEffect(() => {
    // loadMessagesForContact();
  }, []);


const handleSendMessage = async () => {
  if (!text.trim()) return;

  const newMessage = {
    _id: Date.now().toString(),
    address: phoneNumber,
    body: text,
    date: Date.now().toString(),
    type: "2",
    deliveryState: "SENDING",
  };

  setMessages(prev => [...prev, newMessage]);
  setText("");

  const result = await sendSms(phoneNumber, newMessage.body);


  console.log(result)
  setMessages(prev =>
    prev.map(msg =>
      msg._id === newMessage._id
        ? { ...msg, deliveryState: result.success ? "SENT" : "FAILED" }
        : msg
    )
  );

  if (!result.success) {
    console.warn("Failed to send SMS:", result.error);
  }
};


  return (
    <>
      <Stack.Screen
        options={{
          title: fullName ? "Chat With " + fullName : "Conversation",
          header: (props) => (
            <ScreenHeader options={props} isTab={false}>
              <View
                style={{
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "Baloo2-SemiBold", fontSize: 14 }}>
                  {fullName ? "Chat With " + fullName : "Conversation"}
                </Text>
                <Text
                  style={{
                    fontFamily: "Baloo2-Medium",
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  {phoneNumber}
                </Text>
              </View>
            </ScreenHeader>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlashList
          ref={flashListRef}
          contentContainerStyle={styles.conversationConatiner}
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ConversationMessage
              senderName={fullName}
              time={item.date}
              type={item.type}
              message={item.body}
            />
          )}
        />
        <ConversationInput
          input={text}
          onPress={handleSendMessage}
          onInputChange={setText}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  conversationConatiner: {
    gap: 20,
  },
  sent: { alignSelf: "flex-end", backgroundColor: "#DCF8C6" },
  received: { alignSelf: "flex-start", backgroundColor: "#ECECEC" },
  messageText: { fontSize: 16 },

  sendText: { color: "#fff", fontWeight: "bold" },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
});
