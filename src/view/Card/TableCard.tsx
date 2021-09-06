import React from "react";
import { Text } from "react-native";
import { Table } from "../../types/userData";
import TableCharacterItemList from "./TableCharacterItemListCard";

type Props = {
  table: Table;
};

const TableCard: React.FC<Props> = (props) => {
  const { table } = props;
  const { name, characters, maxCharacters } = table;

  return (
    <TableCharacterItemList source={require("../../../assets/table.png")}>
      <Text>{`${name} (${characters?.length || 0}/${maxCharacters})`}</Text>
    </TableCharacterItemList>
  );
};

export default TableCard;
