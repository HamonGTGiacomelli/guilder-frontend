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
  secureTextEntry?: boolean;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  width: "100%",
  marginBottom: 16,
};

const labelStyles: StyleProp<TextStyle> = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#9B0000",
  marginBottom: 4,
};

const TextField: React.FC<Props> = (props) => {
  const { value, setValue, label, enabled, keyboardType, secureTextEntry } =
    props;
  return (
    <View style={wrapperStyles}>
      <Text style={labelStyles}>{label}</Text>
      <TextInput
        enabled={enabled}
        editable={enabled}
        keyboardType={keyboardType}
        style={{
          height: 40,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 8,
          backgroundColor: "#FFFFFF",
        }}
        onChangeText={(text) => setValue(text)}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default TextField;
