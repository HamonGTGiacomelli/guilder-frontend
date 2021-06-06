import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./src/reducer";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-community/async-storage";
import Router from "./src/router";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authentication"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}
