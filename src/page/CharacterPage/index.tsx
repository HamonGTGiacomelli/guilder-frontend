import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Text, View } from "react-native";
import { ROUTES } from "../../router/constants";
import { Character } from "../../types/userData";

type Props = {
  route: any;
  navigation: StackNavigationProp<any>;
};

const CharacterPage: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const { character } = route.params;
  const { name, description } = character as Character;
  return (
    <View>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Button
        title="Search Tables"
        onPress={() => {
          navigation.navigate(ROUTES.SEARCH_TABLE, { character });
        }}
      />
    </View>
  );
};

export default CharacterPage;
