import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleProp, ViewStyle, Alert } from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import TextField from "../../components/shared/Fields/TextInput";
import { Character } from "../../types/userData";
import * as _ from "lodash";
import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
  character?: Character;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  height: "100%",
  width: "100%",
  padding: 15,
};

const ManageCharacterPage: React.FC<Props> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { callback, character } = params;
  const id = _.get(character, "_id");
  const name = _.get(character, "name", "");
  const background = _.get(character, "background", "");
  const description = _.get(character, "description", "");
  const token = useSelector(getAuthenticationToken);
  const [characterName, setCharacterName] = useState(name);
  const [characterDescription, setCharacterDescription] = useState(description);
  const [chartacterBackground, setChartacterBackground] = useState(background);

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

      <PrimaryButton
        label="Salvar"
        onPress={async () => {
          const response = await guilderApi.saveCharacter({
            _id: id,
            name: characterName,
            description: characterDescription,
            background: chartacterBackground,
          });
          if (!response.data.error) {
            Alert.alert("Personagem Salvo com Suceesso!", "Sucesso!");
            callback();
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
