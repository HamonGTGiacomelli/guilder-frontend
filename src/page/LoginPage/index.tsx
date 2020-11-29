import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Button, StyleProp, View, ViewStyle } from "react-native";
import { GuilderApi } from "../../api/GuilderApi";
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

  const onLoginClicked = () => {
    const api = new GuilderApi();
    api.login(username, password).then((response) => {
      if (response.data.error) {
        Alert.alert("Error", "Login failed!", [{ text: "OK" }], {
          cancelable: false,
        });
      } else {
        navigation.replace("Home");
      }
    });
  };

  const onRegisterButtonClicked = () => {
    navigation.navigate("Register");
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
