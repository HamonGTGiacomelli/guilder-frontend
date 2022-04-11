import React, { useEffect, useRef, useState } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { addMessage, listenToChat } from "../../api/Firebase";
import { Character } from "../../types/userData";
import * as _ from "lodash";
import ChatMessage from "./ChatMessage";
import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";

type Props = {
  tableId: string;
  character?: Character;
};

const ChatTab: React.FC<Props> = ({ character, tableId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const chatScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const removeListener = listenToChat(tableId, (value) => setMessages(value));
    return () => removeListener();
  }, []);

  const handleSendMessage = () => {
    const msg = {
      senderId: character?._id || null,
      senderName: character?.name || null,
      message,
    };
    addMessage(tableId, msg);
    setMessage("");
  };

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
          marginBottom: 16,
          paddingHorizontal: 8,
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
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 8,
            marginRight: 8,
          }}
          multiline={true}
          onChangeText={(text) => {
            setMessage(text);
          }}
          value={message}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <PrimaryButton label="Enviar" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

export default ChatTab;
