import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, RefreshControl, Text, View } from "react-native";
import { GuilderApi } from "../../api/GuilderApi";
import * as _ from "lodash";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import CharacterCard from "../../components/shared/Card/CharacterCard";
import TableCard from "../../components/shared/Card/TableCard";
import { FlatList } from "react-native-gesture-handler";
import { ROUTES } from "../../router/constants";
import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";

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

  const updateList = () => {
    setIsLoading(true);
    loadUserData();
  };

  useEffect(() => {
    if (isLoading) {
      loadUserData();
    }
    return () => {};
  }, []);

  const mergedList = mergeTablesAndCharacter(user.characters, user.rpgTables);

  return (
    <View style={homePageStyle}>
      {mergedList.length > 0 ? (
        <FlatList
          data={mergedList}
          renderItem={({ item }) =>
            item.isCharacter ? (
              <CharacterCard
                key={item._id}
                character={item}
                navigation={navigation}
                triggerUpdateList={() => updateList()}
              />
            ) : (
              <TableCard
                key={item._id}
                table={item}
                navigation={navigation}
                triggerUpdateList={() => updateList()}
              />
            )
          }
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={updateList} />
          }
        />
      ) : (
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            Crie um novo personagem ou uma nova mesa para começar.
          </Text>
        </View>
      )}
      <View
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <PrimaryButton
          label="Criar Personagem"
          onPress={() => {
            navigation.navigate(ROUTES.MANAGE_CHARACTER, {
              callback: () => updateList(),
            });
          }}
        ></PrimaryButton>
        <PrimaryButton
          label="Criar Mesa"
          onPress={() => {
            navigation.navigate(ROUTES.MANAGE_TABLE, {
              callback: () => updateList(),
            });
          }}
        ></PrimaryButton>
      </View>
    </View>
  );
};

export default HomePage;
