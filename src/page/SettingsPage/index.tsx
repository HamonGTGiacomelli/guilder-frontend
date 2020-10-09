import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, Alert, StyleProp, ViewStyle, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SelectOneInput from "../../view/Fields/SelectOneInput";
import TextField from "../../view/Fields/TextInput";

type Props = {
  navigation: StackNavigationProp<any>;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  paddingHorizontal: 15,
};

const sessionTypes = [
  { value: "ONLINE", label: "Online" },
  { value: "LOCAL", label: "Local" },
];

const playerLevels = [
  { value: "begginer", label: "Iniciante" },
  { value: "medium", label: "Médio" },
  { value: "advanced", label: "Avançado" },
];

const languages = [
  { value: "pt_BR", label: "Português" },
  { value: "en_US", label: "English" },
];

const gameTypes = [
  {
    value: "NARRATIVE",
    label:
      "Narrativo (tendem a não seguir sempre as regras do sistema definido)",
  },
  {
    value: "RULED",
    label: "Regrado (tendem a sempre seguir as regras do sistema definido)",
  },
];

const SettingsPage: React.FC<Props> = (props) => {
  const { navigation } = props;

  const [tableSessionType, setTableSessionType] = useState("ONLINE");
  const [distance, setDistance] = useState("200");
  const [playerLevel, setPlayerLevel] = useState("begginer");
  const [language, setLanguage] = useState("pt_BR");
  const [timeAvailable, setAvailable] = useState("");
  const [gameType, setGameType] = useState("NARRATIVE");

  return (
    <ScrollView style={wrapperStyles}>
      <SelectOneInput
        label="Procurar por Mesas"
        values={sessionTypes}
        value={tableSessionType}
        setValue={setTableSessionType}
      />
      <TextField
        label="Raio para procura  (Km)"
        value={distance}
        setValue={setDistance}
      />
      <SelectOneInput
        label="Nível de Conhecimento de RPG"
        values={playerLevels}
        value={playerLevel}
        setValue={setPlayerLevel}
      />
      <SelectOneInput
        label="Idioma"
        values={languages}
        value={language}
        setValue={setLanguage}
      />
      <TextField
        label="Disponibilidade"
        value={timeAvailable}
        setValue={setAvailable}
      />
      <SelectOneInput
        label="Tipo de Jogo"
        values={gameTypes}
        value={gameType}
        setValue={setGameType}
      />
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Salvar"
          onPress={() => {
            const success = true;
            // const { success } = guilderApi.saveTable({
            //   description: tableDescription,
            //   gameType:
            //     tableGameType === "NARRATIVE"
            //       ? TABLE_GAME_TYPE.NARRATIVE
            //       : TABLE_GAME_TYPE.RULED,
            //   language: tableLanguage,
            //   playersMaxNum:
            //     (tablePlayersNumberString &&
            //       Number.parseInt(tablePlayersNumberString)) ||
            //     0,
            //   playersNum: 0,
            //   sessionType:
            //     tableSessionType === "LOCAL"
            //       ? TABLE_SESSION_TYPE.LOCAL
            //       : TABLE_SESSION_TYPE.ONLINE,
            //   time: tableSessionTime,
            //   title: tableTitle,
            // });

            if (success) {
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
    </ScrollView>
  );
};

export default SettingsPage;
