import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import { getAuthenticationToken } from "../../reducer/selectors/auth";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const SearchTablePage: React.FC<Props> = ({ route }) => {
  const token = useSelector(getAuthenticationToken);
  const api = new GuilderApi(token);
  const { character } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [availableTables, setAvailableTables] = useState<any>([]);

  useEffect(() => {
    if (isLoading) {
      api.getAvailableTables(character._id).then((response) => {
        setIsLoading(false);
        setAvailableTables(response.data.rpgTables);
      });
    }
    return () => {};
  }, []);

  const removeCurrentFromList = () => {
    setAvailableTables(
      availableTables.filter((table: any, index: number) => {
        return index !== 0;
      })
    );
  };

  const currentTable = availableTables[0] || [];

  return (
    <View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : availableTables.length > 0 ? (
        <>
          <Text>{currentTable.name}</Text>
          <Text>{currentTable.description}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              title="Aceitar"
              onPress={() => {
                api.acceptAvailableTable(character._id, currentTable._id);
                removeCurrentFromList();
              }}
            />
            <Button
              title="Rejeitar"
              onPress={() => {
                api.rejectAvailableTable(character._id, currentTable._id);
                removeCurrentFromList();
              }}
            />
          </View>
        </>
      ) : (
        <Text>Não há mais mesas disponiveis</Text>
      )}
    </View>
  );
};

export default SearchTablePage;
