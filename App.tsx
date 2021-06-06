import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import CharacterPage from "./src/page/CharacterPage";
import HomePage from "./src/page/HomePage";
import LoginPage from "./src/page/LoginPage";
import RegisterPage from "./src/page/RegisterPage";
import TablePage from "./src/page/TablePage";
import reducers from "./src/reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Character" component={CharacterPage} />
            <Stack.Screen name="Table" component={TablePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
