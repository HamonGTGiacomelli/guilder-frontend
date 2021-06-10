import React from "react";
import { Text } from "react-native";
import Card from ".";
import { Character } from "../../types/userData";

type Props = {
  character: Character;
};

const CharacterCard: React.FC<Props> = (props) => {
  const { character } = props;
  const { name } = character;
  return (
    <Card>
      <Text>Personagem: {name}</Text>
    </Card>
  );
};

export default CharacterCard;
