import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  label: string;
  onPressHandler: () => void;
};

type StyleType = {
  text: StyleProp<TextStyle>;
};

const styles: StyleType = {
  text: { color: "#9B0000", textDecorationLine: "underline" },
};

const LinkButton: React.FC<Props> = ({ label, onPressHandler }) => {
  return (
    <TouchableOpacity style={{ marginBottom: 16 }} onPress={onPressHandler}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
