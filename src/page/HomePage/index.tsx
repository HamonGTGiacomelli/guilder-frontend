import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert, Button, RefreshControl, View } from "react-native";
import { GuilderApi } from "../../api/GuilderApi";
import * as _ from "lodash";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import CharacterCard from "../../components/view/Card/CharacterCard";
import TableCard from "../../components/view/Card/TableCard";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ROUTES } from "../../router/constants";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const homePageStyle = {
  width: "100%",
  height: "100%",
};

const mergeTablesAndCharacter = (characterList: any, tableList: any) => {
  const charList = characterList.map((item: any) => ({
    ...item,
    isCharacter: true,
  }));
  const tabList = tableList.map((item: any) => ({ ...item, isTable: true }));
  return [...charList, ...tabList];
};

const HomePage: React.FC<Props> = ({ navigation, route }) => {
  const token = useSelector(getAuthenticationToken);
  const guilderApi = new GuilderApi(token);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ characters: [], rpgTables: [] });

  const loadUserData = () => {
    guilderApi.getUserData().then((response) => {
      setIsLoading(false);
      setUser(response.data.user);
    });
  };

  useEffect(() => {
    if (isLoading) {
      loadUserData();
    }
    return () => {};
  }, []);

  return (
    <View style={homePageStyle}>
      <FlatList
        data={mergeTablesAndCharacter(user.characters, user.rpgTables)}
        renderItem={({ item }) =>
          item.isCharacter ? (
            <TouchableWithoutFeedback
              onPress={() => {
                if (item.table && item.table.length > 0) {
                  Alert.alert("TODO: Go to Table");
                } else {
                  navigation.navigate(ROUTES.CHARACTER, { character: item });
                }
              }}
            >
              <CharacterCard character={item} />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                if (item.table && item.table.length > 0) {
                  Alert.alert("TODO: Go to Table");
                } else {
                  navigation.navigate(ROUTES.TABLE, { table: item });
                }
              }}
            >
              <TableCard table={item} />
            </TouchableWithoutFeedback>
          )
        }
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setIsLoading(true);
              loadUserData();
            }}
          />
        }
      />
      <View
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          title="Adicionar Personagem"
          onPress={() => {
            navigation.navigate(ROUTES.MANAGE_CHARACTER, {
              callback: () => loadUserData(),
            });
          }}
        ></Button>
        <Button
          title="Adicionar Mesa"
          onPress={() => {
            navigation.navigate(ROUTES.MANAGE_TABLE, {
              callback: () => loadUserData(),
            });
          }}
        ></Button>
      </View>
    </View>
  );
};

export default HomePage;
