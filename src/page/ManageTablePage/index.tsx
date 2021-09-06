import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import TextField from "../../view/Fields/TextInput";
import { GuilderApi } from "../../api/GuilderApi";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  paddingHorizontal: 15,
};

const ManageTablePage: React.FC<Props> = (props) => {
  const { navigation, route } = props;
  const token = useSelector(getAuthenticationToken);
  const [tableTitle, setTableTitle] = useState("");
  const [tableDescription, setTableDescription] = useState("");
  const [maxCharactersString, setMaxCharactersString] = useState("");

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
        value={maxCharactersString}
        keyboardType="number-pad"
        setValue={setMaxCharactersString}
      />
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Salvar"
          onPress={async () => {
            const response = await guilderApi.saveTable({
              name: tableTitle,
              description: tableDescription,
              maxCharacters: parseInt(maxCharactersString),
            });

            if (response) {
              Alert.alert("Personagem Salvo com Suceesso!", "Sucesso!");
              navigation.goBack();
              route.params.callback();
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
