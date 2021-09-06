import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Button, StyleProp, View, ViewStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import { addAuthenticationToken } from "../../reducer/actions/auth";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { ROUTES } from "../../router/constants";
import TextInput from "../../view/Fields/TextInput";

type Props = {
  navigation: StackNavigationProp<any>;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  height: "100%",
  width: "100%",
  padding: 15,
};

const LoginPage: React.FC<Props> = (props) => {
  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const addAuthToken = (token: string) =>
    dispatch(addAuthenticationToken(token));
  const auth = useSelector(getAuthenticationToken);
  if (auth && auth != "") {
    navigation.replace("Home");
  }

  const onLoginClicked = () => {
    const api = new GuilderApi();
    api.login(username, password).then((response) => {
      if (response.data.error) {
        Alert.alert("Error", "Login failed!", [{ text: "OK" }], {
          cancelable: false,
        });
      } else {
        addAuthToken(response.data.token);
        navigation.replace(ROUTES.HOME);
      }
    });
  };

  const onRegisterButtonClicked = () => {
    navigation.navigate(ROUTES.REGISTER);
  };

  return (
    <View style={wrapperStyles}>
      <TextInput label="Username" setValue={setUsername} value={username} />
      <TextInput
        label="Password"
        setValue={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={onLoginClicked} />
      <Button title="Cadastre-se" onPress={onRegisterButtonClicked} />
    </View>
  );
};

export default LoginPage;
