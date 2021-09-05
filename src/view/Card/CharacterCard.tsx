import React from "react";
import { Text, Image, View } from "react-native";
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
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require("../../../assets/user.png")}
        />
        <View>
          <Text>{name}</Text>
          {!table && <Text>Procurando Mesa...</Text>}
        </View>
      </View>
    </Card>
  );
};

export default CharacterCard;
