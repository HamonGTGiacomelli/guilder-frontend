import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleProp, ViewStyle, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import TextInput from "../../view/Fields/TextInput";
import { addAuthenticationToken } from "../../reducer/actions/auth";

type Props = {
  navigation: StackNavigationProp<any>;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  height: "100%",
  width: "100%",
  padding: 15,
};

const RegisterPage: React.FC<Props> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const addAuthToken = (token: string) =>
    dispatch(addAuthenticationToken(token));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const api = new GuilderApi();

  return (
    <View style={wrapperStyles}>
      <TextInput label="Nome" setValue={setFirstName} value={firstName} />
      <TextInput label="Sobrenome" setValue={setLastName} value={lastName} />
      <TextInput label="Usuário" setValue={setUsername} value={username} />
      <TextInput label="Senha" setValue={setPassword} value={password} />
      <Button
        title="Cadastrar"
        onPress={() => {
          api
            .createUser(username, password, firstName, lastName)
            .then((response) => {
              if (response.data.error) {
                Alert.alert(
                  "Erro",
                  "Usuário já em uso, por favor altere e tente novamente!"
                );
              } else {
                addAuthToken(response.data.token);
                navigation.reset({ index: 0, routes: [{ name: "Home" }] });
              }
            });
        }}
      />
    </View>
  );
};

export default RegisterPage;
