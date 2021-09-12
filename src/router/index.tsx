import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAuthenticationToken } from "../reducer/selectors/auth";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../page/HomePage";
import ManageCharacterPage from "../page/ManageCharacterPage";
import ManageTablePage from "../page/ManageTablePage";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import SearchCharacterPage from "../page/SearchCharacterPage";
import SearchTablePage from "../page/SearchTablePage";
import { Image } from "react-native";
import { deleteAuthenticationToken } from "../reducer/actions/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import TablePage from "../page/TablePage";
import { Character, Table } from "../types/userData";
import { ROUTES } from "./constants";
import CharacterPage from "../page/CharacterPage";

const Router = () => {
  const token = useSelector(getAuthenticationToken);
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name={ROUTES.HOME}
              component={HomePage}
              options={{
                headerTintColor: "#FFFFFF",
                headerStyle: {
                  backgroundColor: "#9B0000",
                },
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => dispatch(deleteAuthenticationToken())}
                  >
                    <Image
                      source={require("../../assets/logout.png")}
                      style={{ maxHeight: 24, maxWidth: 24, marginRight: 16 }}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name={ROUTES.MANAGE_CHARACTER}
              component={ManageCharacterPage}
            />
            <Stack.Screen
              name={ROUTES.MANAGE_TABLE}
              component={ManageTablePage}
            />
            <Stack.Screen name={ROUTES.TABLE} component={TablePage} />
            <Stack.Screen
              name={ROUTES.SEARCH_CHARACTER}
              component={SearchCharacterPage}
            />
            <Stack.Screen name={ROUTES.CHARACTER} component={CharacterPage} />
            <Stack.Screen
              name={ROUTES.SEARCH_TABLE}
              component={SearchTablePage}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginPage} />
            <Stack.Screen name={ROUTES.REGISTER} component={RegisterPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
