import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
  TextStyle,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  enabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  marginBottom: 10,
};

const labelStyles: StyleProp<TextStyle> = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#0066CC",
};

const TextField: React.FC<Props> = (props) => {
  const { value, setValue, label, enabled, keyboardType } = props;
  return (
    <View style={wrapperStyles}>
      <Text style={labelStyles}>{label}</Text>
      <TextInput
        enabled={enabled}
        editable={enabled}
        keyboardType={keyboardType}
        style={{ height: 40, borderBottomWidth: 1 }}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
    </View>
  );
};

export default TextField;
