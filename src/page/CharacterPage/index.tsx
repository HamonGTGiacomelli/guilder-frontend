import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  navigation: StackNavigationProp<any>;
};

const CharacterPage: React.FC<Props> = () => {
  return (
    <View>
      <Text>Character Page</Text>
    </View>
  );
};

export default CharacterPage;
