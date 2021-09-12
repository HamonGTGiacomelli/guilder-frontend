import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, Text, View } from "react-native";
import { ROUTES } from "../../../router/constants";
import { Character } from "../../../types/userData";
import TableCharacterItemList from "./TableCharacterItemListCard";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../../reducer/selectors/auth";
import { GuilderApi } from "../../../api/GuilderApi";

type Props = {
  character: Character;
  navigation: StackNavigationProp<any>;
  triggerUpdateList: () => void;
};

const CharacterCard: React.FC<Props> = (props) => {
  const { character, triggerUpdateList, navigation } = props;
  const { name, table } = character;
  const token = useSelector(getAuthenticationToken);
  const guilderApi = new GuilderApi(token);

  const handleRemovePress = () => {
    Alert.alert(
      "Deletar Personagem",
      "Você tem certeza que deseja deletar esse Personagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => {
            guilderApi.deleteCharacter(character._id!).then(() => {
              triggerUpdateList();
            });
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleEditPress = () => {
    navigation.navigate(ROUTES.MANAGE_CHARACTER, { character });
  };

  const handleOnCardPress = () => {
    if (table) {
      navigation.navigate(ROUTES.TABLE, { table });
    } else {
      navigation.navigate(ROUTES.SEARCH_TABLE, { character });
    }
  };

  return (
    <TableCharacterItemList
      source={require("../../../../assets/user.png")}
      onBodyPress={handleOnCardPress}
      onEditPress={handleEditPress}
      onRemovePress={handleRemovePress}
    >
      <View>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
        <Text style={{ fontSize: 10 }}>
          {table ? `Mesa: ${table.name}` : "Procurando Mesa..."}
        </Text>
      </View>
    </TableCharacterItemList>
  );
};

export default CharacterCard;
