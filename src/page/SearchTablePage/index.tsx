import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import LinkButton from "../../components/shared/Buttons/LinkButton";
import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";
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
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      {isLoading ? (
        <Text>Loading</Text>
      ) : availableTables.length > 0 ? (
        <>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 16,
            }}
          >
            <View
              style={{ borderRadius: 100, borderWidth: 1, overflow: "hidden" }}
            >
              <Image
                style={{ height: 200, width: 200 }}
                source={require("../../../assets/table.png")}
              />
            </View>
          </View>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Nome:</Text>{" "}
            {currentTable.name}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Descrição:</Text>{" "}
            {currentTable.description}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 16,
            }}
          >
            <PrimaryButton
              label="Aceitar"
              onPress={() => {
                api.acceptAvailableTable(character._id, currentTable._id);
                removeCurrentFromList();
              }}
            />
            <LinkButton
              label="Rejeitar"
              onPressHandler={() => {
                api.rejectAvailableTable(character._id, currentTable._id);
                removeCurrentFromList();
              }}
            />
          </View>
        </>
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
            Não há mais mesas disponiveis. Procure novamente mais tarde.
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchTablePage;
