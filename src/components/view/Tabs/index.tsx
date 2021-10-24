import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type Props = {
  currentTab: string;
  tabsConfig: { label: string; id: string }[];
  onChangeTab: (id: string) => void;
};

const TabsWrapperStyle: StyleProp<ViewStyle> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "nowrap",
};

const TabStyle: StyleProp<ViewStyle> = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginHorizontal: 5,
  height: 50,
  width: 25,
  backgroundColor: "#9B0000",
  borderTopWidth: 0,
  borderStyle: "solid",
  borderWidth: 2,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
};

const ActiveTabStyle: StyleProp<ViewStyle> = {
  ...TabStyle,
  height: 80,
};

const Tabs: React.FC<Props> = ({ currentTab, tabsConfig, onChangeTab }) => {
  return (
    <View style={TabsWrapperStyle}>
      {tabsConfig.map((tab) => {
        const { id, label } = tab;
        return (
          <TouchableWithoutFeedback
            key={id}
            style={currentTab === id ? ActiveTabStyle : TabStyle}
            onPress={() => onChangeTab(id)}
          >
            <Text style={{ color: "#FFFFFF", marginBottom: 8 }}>{label}</Text>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default Tabs;
