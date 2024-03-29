import { Picker } from "@react-native-community/picker";
import React, { useState } from "react";
import * as _ from "lodash";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

type Item = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  values: Item[];
  value: string;
  setValue: (value: string) => void;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  width: "100%",
  marginBottom: 10,
};

const labelStyles: StyleProp<TextStyle> = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#0066CC",
};

const SelectOneInput: React.FC<Props> = (props) => {
  const { values, value, setValue, label } = props;
  return (
    <View style={wrapperStyles}>
      <Text style={labelStyles}>{label}</Text>
      <Picker
        selectedValue={value}
        style={{ height: 50, width: "100%" }}
        onValueChange={(itemValue, itemIndex) => setValue(itemValue.toString())}
      >
        {_.map(values, (item) => {
          return (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          );
        })}
      </Picker>
    </View>
  );
};

export default SelectOneInput;
