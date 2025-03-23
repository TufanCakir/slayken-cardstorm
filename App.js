// src/App.js
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import TeamScreen from "./src/screens/TeamScreen";
import SummonScreen from "./src/screens/SummonScreen";
import ShopScreen from "./src/screens/ShopScreen";
import ExchangeScreen from "./src/screens/ExchangeScreen";
import CardstormScreen from "./src/screens/CardstormScreen";
import BattleScreen from "./src/screens/BattleScreen";
import EventScreen from "./src/screens/EventScreen";

import { AccountProvider } from "./src/context/AccountContext";
import { CoinsProvider } from "./src/context/CoinsContext";
import { CrystalsProvider } from "./src/context/CrystalsContext";
import { TeamProvider } from "./src/context/TeamContext";
import { LoginBonusProvider } from "./src/context/LoginBonusContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <AccountProvider>
        <CoinsProvider>
          <CrystalsProvider>
            <TeamProvider>
              <LoginBonusProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName="HomeScreen"
                    screenOptions={{ headerShown: false }}
                  >
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="TeamScreen" component={TeamScreen} />
                    <Stack.Screen
                      name="SummonScreen"
                      component={SummonScreen}
                    />
                    <Stack.Screen name="ShopScreen" component={ShopScreen} />
                    <Stack.Screen
                      name="ExchangeScreen"
                      component={ExchangeScreen}
                    />
                    <Stack.Screen
                      name="CardstormScreen"
                      component={CardstormScreen}
                    />
                    <Stack.Screen
                      name="BattleScreen"
                      component={BattleScreen}
                    />
                    <Stack.Screen name="EventScreen" component={EventScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </LoginBonusProvider>
            </TeamProvider>
          </CrystalsProvider>
        </CoinsProvider>
      </AccountProvider>
    </SafeAreaProvider>
  );
}
