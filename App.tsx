import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CharacterPage from "./src/page/CharacterPage";
import HomePage from "./src/page/HomePage";
import SettingsPage from "./src/page/SettingsPage";
import TablePage from "./src/page/TablePage";

const Stack = createStackNavigator();

const image = require("./assets/settings_icon.png");

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
  );
}
