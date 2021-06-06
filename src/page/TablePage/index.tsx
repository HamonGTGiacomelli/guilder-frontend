import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import SelectOneInput from "../../view/Fields/SelectOneInput";
import TextField from "../../view/Fields/TextInput";
import { GuilderApi } from "../../api/GuilderApi";
import { TABLE_GAME_TYPE, TABLE_SESSION_TYPE } from "../../utils/const";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  paddingHorizontal: 15,
};

const sessionTypes = [
  { value: "ONLINE", label: "Online" },
  { value: "LOCAL", label: "Local" },
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

const TablePage: React.FC<Props> = (props) => {
  const { navigation, route } = props;
  const token = useSelector(getAuthenticationToken);
  const [tableTitle, setTableTitle] = useState("");
  const [tableDescription, setTableDescription] = useState("");
  // const [tableSessionType, setTableSessionType] = useState("ONLINE");
  // const [tableLocal, setTableLocal] = useState("");
  // const [tablePlayersNumberString, setTablePlayersNumberString] = useState("3");
  // const [tableLanguage, setTableLanguage] = useState("pt_BR");
  // const [tableDescription, setTableDescription] = useState("");
  // const [tableGameType, setTableGameType] = useState("NARRATIVE");
  // const [tableSessionTime, setTableSessionTime] = useState("22:00/00:00");

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
      {/* <SelectOneInput
        label="Tipo de Sessão"
        values={sessionTypes}
        value={tableSessionType}
        setValue={setTableSessionType}
      />
      <TextField
        label="Local"
        enabled={tableSessionType === "LOCAL"}
        value={tableLocal}
        setValue={setTableLocal}
      />
      <TextField
        label="Quantidade de Players"
        value={tablePlayersNumberString}
        setValue={setTablePlayersNumberString}
        keyboardType="decimal-pad"
      />
      <SelectOneInput
        label="Idioma"
        values={languages}
        value={tableLanguage}
        setValue={setTableLanguage}
      />
      <TextField
        label="Descrição"
        value={tableDescription}
        setValue={setTableDescription}
      />
      <TextField
        label="Horário"
        value={tableSessionTime}
        setValue={setTableSessionTime}
      />
      <SelectOneInput
        label="Tipo de Jogo"
        values={gameTypes}
        value={tableGameType}
        setValue={setTableGameType}
      /> */}
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Salvar"
          onPress={async () => {
            const response = await guilderApi.saveTable({
              name: tableTitle,
              description: tableDescription,
            });

            console.log({ response });

            if (response) {
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

export default TablePage;
