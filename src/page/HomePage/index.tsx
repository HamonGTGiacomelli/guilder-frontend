import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { GuilderApi } from "../../api/GuilderApi";
import * as _ from "lodash";
import Card from "../../view/Card";
import CharacterCard from "../../view/Card/characterCard";
import TableCard from "../../view/Card/TableCard";

type Props = {
  navigation: StackNavigationProp<any>;
};

const HomePage: React.FC<Props> = ({ navigation }) => {
  const guilderApi = new GuilderApi();
  const { userCharacters, userTables } = guilderApi.getUserData();

  return (
    <View>
      {_.map(userCharacters, (character) => {
        return <CharacterCard character={character} />;
      })}
      {_.map(userTables, (table) => {
        return <TableCard table={table} />;
      })}
    </View>
  );
};

export default HomePage;
