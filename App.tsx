import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { createStore } from "redux";
import CharacterPage from "./src/page/CharacterPage";
import HomePage from "./src/page/HomePage";
import LoginPage from "./src/page/LoginPage";
import RegisterPage from "./src/page/RegisterPage";
import SettingsPage from "./src/page/SettingsPage";
import TablePage from "./src/page/TablePage";
import reducers from "./src/reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const Stack = createStackNavigator();
const image = require("./assets/settings_icon.png");

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Settings");
                    }}
                  >
                    <Image
                      source={image}
                      style={{
                        height: 30,
                        width: 30,
                        marginEnd: 15,
                      }}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="Settings" component={SettingsPage} />
            <Stack.Screen name="Character" component={CharacterPage} />
            <Stack.Screen name="Table" component={TablePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
