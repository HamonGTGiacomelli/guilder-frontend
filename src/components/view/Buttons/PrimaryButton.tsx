import React from "react";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  label: string;
  onPressHandler: () => void;
  style?: StyleProp<ViewStyle>;
};

type StylesType = {
  wrapper: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
};

const styles: StylesType = {
  wrapper: {
    backgroundColor: "#9B0000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  text: { color: "#FFFFFF", textAlign: "center" },
};

const PrimaryButton: React.FC<Props> = ({ onPressHandler, label, style }) => {
  return (
    <TouchableOpacity
      style={{ ...(styles.wrapper as object), ...(style as object) }}
      onPress={onPressHandler}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
