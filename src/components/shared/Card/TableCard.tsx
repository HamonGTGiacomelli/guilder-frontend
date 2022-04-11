import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, Text } from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../../api/GuilderApi";
import { getAuthenticationToken } from "../../../reducer/selectors/auth";
import { ROUTES } from "../../../router/constants";
import { Table } from "../../../types/userData";
import TableCharacterItemList from "./TableCharacterItemListCard";

type Props = {
  table: Table;
  navigation: StackNavigationProp<any>;
  triggerUpdateList: () => void;
};

const TableCard: React.FC<Props> = (props) => {
  const { table, triggerUpdateList, navigation } = props;
  const { name, characters, maxCharacters } = table;
  const token = useSelector(getAuthenticationToken);
  const guilderApi = new GuilderApi(token);

  const handleRemovePress = () => {
    Alert.alert(
      "Deletar Mesa",
      "Você tem certeza que deseja deletar essa Mesa?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => {
            guilderApi.deleteTable(table._id!).then(() => triggerUpdateList());
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleEditPress = () => {
    navigation.navigate(ROUTES.MANAGE_TABLE, { table });
  };

  const handleOnCardPress = () => {
    navigation.navigate(ROUTES.TABLE, { table });
  };

  return (
    <TableCharacterItemList
      source={require("../../../../assets/table.png")}
      onBodyPress={handleOnCardPress}
      onEditPress={handleEditPress}
      onRemovePress={handleRemovePress}
    >
      <Text style={{ fontWeight: "bold" }}>{`${name} (${
        characters?.length || 0
      }/${maxCharacters})`}</Text>
      <Text style={{ fontSize: 10 }}>
        Clique aqui para visualizar detalhes do grupo.
      </Text>
    </TableCharacterItemList>
  );
};

export default TableCard;
