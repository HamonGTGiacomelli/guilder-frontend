import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, Text } from "react-native";
import { ROUTES } from "../../../router/constants";
import { Table } from "../../../types/userData";
import TableCharacterItemList from "./TableCharacterItemListCard";

type Props = {
  table: Table;
  navigation: StackNavigationProp<any>;
};

const TableCard: React.FC<Props> = (props) => {
  const { table, navigation } = props;
  const { name, characters, maxCharacters } = table;

  return (
    <TableCharacterItemList
      source={require("../../../../assets/table.png")}
      onBodyPress={() => navigation.navigate(ROUTES.TABLE, { table })}
      onImagePress={() => navigation.navigate(ROUTES.TABLE, { table })}
      onEditPress={() => Alert.alert("Edit")}
      onRemovePress={() => Alert.alert("Remove")}
    >
      <Text>{`${name} (${characters?.length || 0}/${maxCharacters})`}</Text>
    </TableCharacterItemList>
  );
};

export default TableCard;
