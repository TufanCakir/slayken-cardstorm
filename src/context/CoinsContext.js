// src/context/CoinsContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CoinsContext = createContext({
  coins: 0,
  setCoins: () => {},
});

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);

  // Beim Mounten: Lade den gespeicherten Coins-Wert
  useEffect(() => {
    async function loadCoins() {
      try {
        const storedCoins = await AsyncStorage.getItem("coins");
        if (storedCoins !== null) {
          setCoins(parseInt(storedCoins, 10));
        }
      } catch (error) {
        console.error("Fehler beim Laden der Coins:", error);
      }
    }
    loadCoins();
  }, []);

  // Speichere den Coins-Wert in AsyncStorage, wenn sich der State ändert
  useEffect(() => {
    async function saveCoins() {
      try {
        await AsyncStorage.setItem("coins", coins.toString());
      } catch (error) {
        console.error("Fehler beim Speichern der Coins:", error);
      }
    }
    saveCoins();
  }, [coins]);

  return (
    <CoinsContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};
