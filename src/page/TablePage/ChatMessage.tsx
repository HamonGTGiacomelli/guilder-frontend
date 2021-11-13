import React from "react";
import { Text, View } from "react-native";

type Props = {
  isUserMessage: boolean;
  sender: string;
  message: string;
};

const ChatMessage: React.FC<Props> = ({ isUserMessage, sender, message }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: isUserMessage ? "#9B0000" : "#000000",
        backgroundColor: isUserMessage ? "#9b000011" : "",
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginVertical: 4,
        alignSelf: isUserMessage ? "flex-end" : "flex-start",
      }}
    >
      <View>
        <Text style={{ color: "#000", fontWeight: "bold" }}>{sender}</Text>
        <View>
          <Text>{message}</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatMessage;
