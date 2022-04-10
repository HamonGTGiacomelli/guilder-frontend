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
import { ROUTES } from "./constants";

const Router = () => {
  const token = useSelector(getAuthenticationToken);
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  // TODO: refactor to set by default
  const defaultOptions = {
    headerTintColor: "#FFFFFF",
    headerStyle: {
      backgroundColor: "#9B0000",
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name={ROUTES.HOME}
              component={HomePage}
              options={{
                ...defaultOptions,
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
              options={defaultOptions}
            />
            <Stack.Screen
              name={ROUTES.MANAGE_TABLE}
              component={ManageTablePage}
              options={defaultOptions}
            />
            <Stack.Screen
              name={ROUTES.TABLE}
              component={TablePage}
              options={defaultOptions}
            />
            <Stack.Screen
              name={ROUTES.SEARCH_CHARACTER}
              component={SearchCharacterPage}
              options={defaultOptions}
            />
            <Stack.Screen
              name={ROUTES.SEARCH_TABLE}
              component={SearchTablePage}
              options={defaultOptions}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={ROUTES.LOGIN}
              component={LoginPage}
              options={defaultOptions}
            />
            <Stack.Screen
              name={ROUTES.REGISTER}
              component={RegisterPage}
              options={defaultOptions}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
