import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleProp, ViewStyle, Button, Alert } from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import TextField from "../../view/Fields/TextInput";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  height: "100%",
  width: "100%",
  padding: 15,
};

const ManageCharacterPage: React.FC<Props> = (props) => {
  const { navigation, route } = props;
  const token = useSelector(getAuthenticationToken);
  const [characterName, setCharacterName] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [chartacterBackground, setChartacterBackground] = useState("");

  const guilderApi = new GuilderApi(token);

  return (
    <View style={wrapperStyles}>
      <TextField
        label="Nome do Personagem"
        value={characterName}
        setValue={setCharacterName}
      />

      <TextField
        label="Description"
        value={characterDescription}
        setValue={setCharacterDescription}
      />
      <TextField
        label="Background"
        value={chartacterBackground}
        setValue={setChartacterBackground}
      />

      <Button
        title="Salvar"
        onPress={async () => {
          const response = await guilderApi.saveCharacter({
            name: characterName,
            description: characterDescription,
            background: chartacterBackground,
          });
          if (!response.data.error) {
            Alert.alert("Personagem Salvo com Suceesso!", "Sucesso!");
            route.params.callback();
            navigation.goBack();
          } else {
            Alert.alert(
              "Erro",
              "Falha ao criar o personagem, por favor tente novamente!"
            );
          }
        }}
      />
    </View>
  );
};

export default ManageCharacterPage;
