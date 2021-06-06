import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  navigation: StackNavigationProp<any>;
};

const TablePage: React.FC<Props> = () => {
  return (
    <View>
      <Text>Table Page</Text>
    </View>
  );
};

export default TablePage;
