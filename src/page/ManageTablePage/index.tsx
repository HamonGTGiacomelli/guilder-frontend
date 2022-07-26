import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleProp, ViewStyle, Alert, ScrollView } from "react-native";
import TextField from "../../components/shared/Fields/TextInput";
import { GuilderApi } from "../../api/GuilderApi";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { Table } from "../../types/userData";
import * as _ from "lodash";
import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
  table?: Table;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  paddingHorizontal: 15,
};

const ManageTablePage: React.FC<Props> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { callback, table } = params;
  const token = useSelector(getAuthenticationToken);
  const id = _.get(table, "_id");
  const title = _.get(table, "name", "");
  const description = _.get(table, "description", "");
  const maxCharacterString = _.get(table, "maxCharacters", "").toString();
  const [tableTitle, setTableTitle] = useState(title);
  const [tableDescription, setTableDescription] = useState(description);
  const [tableMaxCharactersString, setTableMaxCharactersString] =
    useState(maxCharacterString);

  const guilderApi = new GuilderApi(token);

  return (
    <ScrollView style={wrapperStyles}>
      <TextField
        label="Título da Mesa"
        value={tableTitle}
        setValue={setTableTitle}
      />
      <TextField
        label="Descrição"
        value={tableDescription}
        setValue={setTableDescription}
      />
      <TextField
        label="Número máximo de Jogadores"
        value={tableMaxCharactersString}
        keyboardType="number-pad"
        setValue={setTableMaxCharactersString}
      />
      <View style={{ marginBottom: 20 }}>
        <PrimaryButton
          label="Salvar"
          onPress={async () => {
            const response = await guilderApi.saveTable({
              _id: id,
              name: tableTitle,
              description: tableDescription,
              maxCharacters: parseInt(tableMaxCharactersString),
            });

            if (response) {
              Alert.alert("Personagem Salvo com Suceesso!", "Sucesso!");
              callback();
            } else {
              Alert.alert(
                "Erro",
                "Falha ao criar o personagem, por favor tente novamente!"
              );
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ManageTablePage;
