// src/context/AccountContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountContext = createContext({
  accountLevel: 1,
  setAccountLevel: () => {},
});

export const AccountProvider = ({ children }) => {
  const [accountLevel, setAccountLevel] = useState(1);

  // Lade den Account-Level beim Mounten aus AsyncStorage
  useEffect(() => {
    async function loadAccountLevel() {
      try {
        const storedLevel = await AsyncStorage.getItem("accountLevel");
        if (storedLevel !== null) {
          setAccountLevel(parseInt(storedLevel, 10));
        }
      } catch (error) {
        console.error("Error loading account level:", error);
      }
    }
    loadAccountLevel();
  }, []);

  // Speichere den Account-Level in AsyncStorage, wenn er sich ändert
  useEffect(() => {
    async function saveAccountLevel() {
      try {
        await AsyncStorage.setItem("accountLevel", accountLevel.toString());
      } catch (error) {
        console.error("Error saving account level:", error);
      }
    }
    saveAccountLevel();
  }, [accountLevel]);

  return (
    <AccountContext.Provider value={{ accountLevel, setAccountLevel }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
