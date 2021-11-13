import React from "react";
import { Text, View } from "react-native";
import { Table } from "../../types/userData";

type Props = {
  table: Table;
};

const GroupInfoTab: React.FC<Props> = ({ table }) => {
  const { characters } = table;
  console.log({ characters });
  return (
    <View style={{ paddingVertical: 16 }}>
      {characters?.map((character) => {
        return (
          <View
            style={{
              borderWidth: 1,
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#000000", textAlign: "center" }}>
              {character.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default GroupInfoTab;
