import React from "react";
import { View, Text, Image } from "react-native";
import Card from ".";
import { Table } from "../../types/userData";

type Props = {
  table: Table;
};

const TableCard: React.FC<Props> = (props) => {
  const { table } = props;
  const { name, characters } = table;

  return (
    <Card>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require("../../../assets/table.png")}
        />
        <Text>{`${name}`}</Text>
      </View>
    </Card>
  );
};

export default TableCard;
