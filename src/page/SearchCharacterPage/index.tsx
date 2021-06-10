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
    <View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : availableCharacters.length > 0 ? (
        <>
          <Text>{currentCharacter.name}</Text>
          <Text>{currentCharacter.description}</Text>
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
                api.acceptAvailableCharacter(table._id, currentCharacter._id);
                removeCurrentFromList();
              }}
            />
            <Button
              title="Rejeitar"
              onPress={() => {
                api.rejectAvailableCharacter(table._id, currentCharacter._id);
                removeCurrentFromList();
              }}
            />
          </View>
        </>
      ) : (
        <Text>Não há mais personagens disponiveis</Text>
      )}
    </View>
  );
};

export default SearchCharacterPage;
