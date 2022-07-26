import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert, Button, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import LinkButton from "../../components/shared/Buttons/LinkButton";
import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";
import { getAuthenticationToken } from "../../reducer/selectors/auth";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const SearchCharacterPage: React.FC<Props> = ({ route }) => {
  const token = useSelector(getAuthenticationToken);
  const api = new GuilderApi(token);
  const { table } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [availableCharacters, setAvailableCharacter] = useState<any>([]);

  useEffect(() => {
    if (isLoading) {
      api.getAvailableCharacters(table._id).then((response) => {
        setIsLoading(false);
        setAvailableCharacter(response.data.characters);
      });
    }
    return () => {};
  }, []);

  const removeCurrentFromList = () => {
    setAvailableCharacter(
      availableCharacters.filter((table: any, index: number) => {
        return index !== 0;
      })
    );
  };

  const currentCharacter = availableCharacters[0] || [];

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      {isLoading ? (
        <Text>Loading</Text>
      ) : availableCharacters.length > 0 ? (
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
                source={require("../../../assets/user.png")}
              />
            </View>
          </View>

          <Text>
            <Text style={{ fontWeight: "bold" }}>Nome:</Text>{" "}
            {currentCharacter.name}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Descrição:</Text>{" "}
            {currentCharacter.description}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>História:</Text>{" "}
            {currentCharacter.background}
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
                api.acceptAvailableCharacter(table._id, currentCharacter._id);
                removeCurrentFromList();
              }}
            />
            <LinkButton
              label="Rejeitar"
              onPressHandler={() => {
                api.rejectAvailableCharacter(table._id, currentCharacter._id);
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
            Não há mais personagens disponiveis. Procure novamente mais tarde.
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchCharacterPage;
