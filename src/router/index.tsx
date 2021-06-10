import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../reducer/selectors/auth";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../page/HomePage";
import ManageCharacterPage from "../page/ManageCharacterPage";
import ManageTablePage from "../page/ManageTablePage";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import SearchCharacterPage from "../page/SearchCharacterPage";
import SearchTablePage from "../page/SearchTablePage";

const Router = () => {
  const token = useSelector(getAuthenticationToken);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen
              name="ManageCharacter"
              component={ManageCharacterPage}
            />
            <Stack.Screen name="ManageTable" component={ManageTablePage} />
            <Stack.Screen name="Table" component={SearchCharacterPage} />
            <Stack.Screen name="Character" component={SearchTablePage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
