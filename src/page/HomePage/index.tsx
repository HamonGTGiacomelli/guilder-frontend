import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { GuilderApi } from "../../api/GuilderApi";
import * as _ from "lodash";
import CharacterCard from "../../view/Card/CharacterCard";
import TableCard from "../../view/Card/TableCard";
import { Character, Table } from "../../types/userData";

type Props = {
  navigation: StackNavigationProp<any>;
};

const homePageStyle = {
  width: "100%",
  height: "100%",
};

const HomePage: React.FC<Props> = ({ navigation }) => {
  const guilderApi = new GuilderApi();
  const { userCharacters, userTables } = guilderApi.getUserData();

  return (
    <View style={homePageStyle}>
      {_.map(userCharacters, (character: Character, index: number) => {
        return <CharacterCard key={index} character={character} />;
      })}
      {_.map(userTables, (table: Table, index: number) => {
        return <TableCard key={index} table={table} />;
      })}
      <View
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
        }}
      >
        <View style={{ bottom: 5 }}>
          <Button
            title="Adicionar Personagem"
            onPress={() => {
              navigation.navigate("Character");
            }}
          ></Button>
        </View>
        <View>
          <Button
            title="Adicionar Mesa"
            onPress={() => {
              navigation.navigate("Table");
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
