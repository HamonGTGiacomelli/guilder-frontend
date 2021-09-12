import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, Text, View } from "react-native";
import { ROUTES } from "../../../router/constants";
import { Character } from "../../../types/userData";
import TableCharacterItemList from "./TableCharacterItemListCard";

type Props = {
  character: Character;
  navigation: StackNavigationProp<any>;
};

const CharacterCard: React.FC<Props> = (props) => {
  const { character, navigation } = props;
  const { name, table } = character;
  return (
    <TableCharacterItemList
      source={require("../../../../assets/user.png")}
      onBodyPress={() => navigation.navigate(ROUTES.CHARACTER, { character })}
      onImagePress={() => navigation.navigate(ROUTES.CHARACTER, { character })}
      onEditPress={() => Alert.alert("Edit")}
      onRemovePress={() => Alert.alert("Remove")}
    >
      <View>
        <Text>{name}</Text>
        {table ? (
          <Text>Mesa: {table.name}</Text>
        ) : (
          <Text>Procurando Mesa...</Text>
        )}
      </View>
    </TableCharacterItemList>
  );
};

export default CharacterCard;
