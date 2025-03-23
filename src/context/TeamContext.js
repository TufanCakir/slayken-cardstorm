// src/context/TeamContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TeamContext = createContext({
  team: [],
  setTeam: () => {},
});

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);

  // Lade das Team beim Mounten aus AsyncStorage
  useEffect(() => {
    async function loadTeam() {
      try {
        const storedTeam = await AsyncStorage.getItem("myTeam");
        if (storedTeam !== null) {
          setTeam(JSON.parse(storedTeam));
        }
      } catch (error) {
        console.error("Fehler beim Laden des Teams:", error);
      }
    }
    loadTeam();
  }, []);

  // Speichere das Team in AsyncStorage, wenn sich der Team-State ändert
  useEffect(() => {
    async function saveTeam() {
      try {
        await AsyncStorage.setItem("myTeam", JSON.stringify(team));
      } catch (error) {
        console.error("Fehler beim Speichern des Teams:", error);
      }
    }
    saveTeam();
  }, [team]);

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
