import React from "react";
import { Text, Image, View } from "react-native";
import Card from ".";
import { Character } from "../../types/userData";
import TableCharacterItemList from "./TableCharacterItemListCard";

type Props = {
  character: Character;
};

const CharacterCard: React.FC<Props> = (props) => {
  const { character } = props;
  const { name, table } = character;
  return (
    <TableCharacterItemList source={require("../../../assets/user.png")}>
      <View>
        <Text>{name}</Text>
        {!table && <Text>Procurando Mesa...</Text>}
      </View>
    </TableCharacterItemList>
  );
};

export default CharacterCard;
