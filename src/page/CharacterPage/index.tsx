import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleProp, ViewStyle, Button, Alert } from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import TextField from "../../view/Fields/TextInput";

type Props = {
  navigation: StackNavigationProp<any>;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  height: "100%",
  width: "100%",
  padding: 15,
};

// const systems = [
//   { value: "Teste1", label: "Teste 1" },
//   { value: "Teste2", label: "Teste 2" },
//   { value: "Teste3", label: "Teste 3" },
// ];

// const functions = [
//   { value: "Dano Físico", label: "Dano Físico" },
//   { value: "Dano Mágico", label: "Dano Mágico" },
//   { value: "Suporte", label: "Suporte" },
//   { value: "Tanque", label: "Tanque" },
// ];

const CharacterPage: React.FC<Props> = (props) => {
  const { navigation } = props;
  const token = useSelector(getAuthenticationToken);
  const [characterName, setCharacterName] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [chartacterBackground, setChartacterBackground] = useState("");
  // const [characterSystem, setCharacterSystem] = useState(systems[0].value);
  // const [characterFunction, setCharacterFunction] = useState(
  //   functions[0].value
  // );

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
      {/* <SelectOneInput
        label="Selecione o sistema"
        value={characterSystem}
        values={systems}
        setValue={setCharacterSystem}
      />
      <SelectOneInput
        label="Selecione o sistema"
        value={characterFunction}
        values={functions}
        setValue={setCharacterFunction}
      /> */}

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

export default CharacterPage;
