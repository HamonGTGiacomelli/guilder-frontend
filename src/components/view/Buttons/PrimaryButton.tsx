import React from "react";
import {
  ButtonProps,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = TouchableOpacityProps & {
  label: string;
};

type StylesType = {
  wrapper: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
};

const defaultStyles: StylesType = {
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

const PrimaryButton: React.FC<Props> = (props) => {
  const { style, label } = props;

  return (
    <TouchableOpacity {...props} style={[defaultStyles.wrapper, style]}>
      <Text style={defaultStyles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
