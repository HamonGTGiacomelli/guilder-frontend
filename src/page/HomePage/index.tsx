import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { GuilderApi } from "../../api/GuilderApi";
import * as _ from "lodash";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import CharacterCard from "../../view/Card/CharacterCard";
import { Character, Table } from "../../types/userData";
import TableCard from "../../view/Card/TableCard";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const homePageStyle = {
  width: "100%",
  height: "100%",
};

const HomePage: React.FC<Props> = ({ navigation, route }) => {
  const token = useSelector(getAuthenticationToken);
  const guilderApi = new GuilderApi(token);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ characters: [], rpgTables: [] });

  const reloadPage = () => {
    guilderApi.getUserData().then((response) => {
      setUser(response.data.user);
    });
  };

  if (isLoading) {
    guilderApi.getUserData().then((response) => {
      setIsLoading(false);
      setUser(response.data.user);
    });
  }

  return (
    <View style={homePageStyle}>
      {_.map(user.characters, (character: Character, index: number) => {
        return <CharacterCard key={index} character={character} />;
      })}
      {_.map(user.rpgTables, (table: Table, index: number) => {
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
              navigation.navigate("Table", reloadPage);
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
