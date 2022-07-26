import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import { addAuthenticationToken } from "../../reducer/actions/auth";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { ROUTES } from "../../router/constants";
import TextInput from "../../components/shared/Fields/TextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";
import LinkButton from "../../components/shared/Buttons/LinkButton";

type Props = {
  navigation: StackNavigationProp<any>;
};

const wrapperStyles: StyleProp<ViewStyle> = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingHorizontal: 15,
};

const LoginPage: React.FC<Props> = (props) => {
  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const addAuthToken = (token: string) =>
    dispatch(addAuthenticationToken(token));

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
      <TextInput label="Usuário" setValue={setUsername} value={username} />
      <TextInput
        label="Senha"
        setValue={setPassword}
        value={password}
        secureTextEntry
      />
      <PrimaryButton label={"Login"} onPress={onLoginClicked} />
      <LinkButton
        label="Cadastrar-se"
        onPressHandler={onRegisterButtonClicked}
      />
    </View>
  );
};

export default LoginPage;
