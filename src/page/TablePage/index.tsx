import { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import React from "react";
import { View, Text, Button } from "react-native";
import { ROUTES } from "../../router/constants";
import { Table } from "../../types/userData";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const TablePage: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const { table } = route.params;
  const { name, description, characters } = table as Table;
  return (
    <View>
      <Text>{name}</Text>
      <Text>{description}</Text>
      {characters && characters.length > 0 && (
        <>
          <Text>Characters</Text>
          {_.map(characters, (character) => {
            return <Text>{character.name}</Text>;
          })}
        </>
      )}
      <Button
        title="Search Characters"
        onPress={() => {
          navigation.navigate(ROUTES.SEARCH_CHARACTER, { table });
        }}
      />
    </View>
  );
};

export default TablePage;
