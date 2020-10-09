import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  label: string;
  value: string;
  setValue: (value: string) => void;
};

const TextField: React.FC<Props> = (props) => {
  const { value, setValue, label } = props;
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={{ height: 40, borderBottomWidth: 1 }}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
    </View>
  );
};

export default TextField;
