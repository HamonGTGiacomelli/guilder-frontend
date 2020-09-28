import React from "react";
import { Text } from "react-native";
import Card from ".";
import { Character } from "../../types/userData";

type Props = {
  character: Character;
};

const CharacterCard: React.FC<Props> = (props) => {
  const { character } = props;
  const { name, table } = character;
  return (
    <Card>
      <Text>{name}</Text>
      {table ? <Text>{table.name}</Text> : <Text>Searching for a Table</Text>}
    </Card>
  );
};

export default CharacterCard;
