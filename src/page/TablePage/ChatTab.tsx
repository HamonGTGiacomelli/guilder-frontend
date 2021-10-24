import React, { useEffect, useRef, useState } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { addMessage, listenToChat } from "../../api/Firebase";
import { Character } from "../../types/userData";
import * as _ from "lodash";
import ChatMessage from "./ChatMessage";

type Props = {
  tableId: string;
  character?: Character;
};

const ChatTab: React.FC<Props> = ({ character, tableId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const chatScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    listenToChat(tableId, (value) => setMessages(value));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: 16,
      }}
    >
      <ScrollView
        ref={chatScrollRef}
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 8,
          paddingHorizontal: 5,
          overflow: "hidden",
        }}
        onContentSizeChange={() =>
          chatScrollRef.current?.scrollToEnd({ animated: true })
        }
      >
        {_.keys(messages).map((msgKeys) => {
          const { senderName, senderId, message: msgText } = messages[msgKeys];
          return (
            <ChatMessage
              key={msgKeys}
              isUserMessage={senderId === character?._id}
              message={msgText}
              sender={senderName || "Mestre da Mesa"}
            />
          );
        })}
      </ScrollView>
      <View style={{ display: "flex", flexDirection: "row", marginBottom: 16 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderRadius: 5, marginRight: 8 }}
          onChangeText={(text) => {
            setMessage(text);
          }}
          value={message}
        />
        <Button
          title="Enviar"
          onPress={() => {
            const msg = {
              senderId: character?._id || null,
              senderName: character?.name || null,
              message,
            };
            console.log({ msg });
            addMessage(tableId, msg);
            setMessage("");
          }}
        />
      </View>
    </View>
  );
};

export default ChatTab;
