// src/context/CrystalsContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CrystalsContext = createContext({
  crystals: 0,
  setCrystals: () => {},
});

export const CrystalsProvider = ({ children }) => {
  const [crystals, setCrystals] = useState(0);

  // Beim Mounten: Lade den gespeicherten Wert
  useEffect(() => {
    async function loadCrystals() {
      try {
        const storedCrystals = await AsyncStorage.getItem("crystals");
        if (storedCrystals !== null) {
          setCrystals(parseInt(storedCrystals, 10));
        }
      } catch (error) {
        console.error("Fehler beim Laden der Crystals:", error);
      }
    }
    loadCrystals();
  }, []);

  // Speichere den Wert in AsyncStorage, wenn sich crystals ändert
  useEffect(() => {
    async function saveCrystals() {
      try {
        await AsyncStorage.setItem("crystals", crystals.toString());
      } catch (error) {
        console.error("Fehler beim Speichern der Crystals:", error);
      }
    }
    saveCrystals();
  }, [crystals]);

  return (
    <CrystalsContext.Provider value={{ crystals, setCrystals }}>
      {children}
    </CrystalsContext.Provider>
  );
};
