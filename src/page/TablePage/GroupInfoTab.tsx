import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import PrimaryButton from "../../components/view/Buttons/PrimaryButton";
import { ROUTES } from "../../router/constants";
import { Character, Table } from "../../types/userData";

type Props = {
  table: Table;
  character?: Character;
  navigation: StackNavigationProp<any>;
};

const GroupInfoTab: React.FC<Props> = ({ table, navigation, character }) => {
  const { characters } = table;
  console.log({ characters });
  return (
    <View style={{ paddingVertical: 16 }}>
      {characters?.map((character) => {
        return (
          <View
            style={{
              borderWidth: 1,
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#000000", textAlign: "center" }}>
              {character.name}
            </Text>
          </View>
        );
      })}
      {!character && (
        <PrimaryButton
          label="Procurar Personagem"
          onPress={() => {
            navigation.navigate(ROUTES.SEARCH_CHARACTER, { table });
          }}
        />
      )}
    </View>
  );
};

export default GroupInfoTab;
