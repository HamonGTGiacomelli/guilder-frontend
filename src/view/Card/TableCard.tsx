import React from "react";
import { View, Text } from "react-native";
import Card from ".";
import { Table } from "../../types/userData";

type Props = {
  table: Table;
};

const TableCard: React.FC<Props> = (props) => {
  const { table } = props;
  const { name } = table;

  return (
    <Card>
      <Text>{`Mesa: ${name}`}</Text>
    </Card>
  );
};

export default TableCard;
