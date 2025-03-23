// src/context/LoginBonusContext.js
import React, { createContext, useState } from "react";
import {
  loginBonusData,
  calculateStreakBonus,
  getDailyReward,
} from "../data/LoginBonusData";

export const LoginBonusContext = createContext({
  bonus: { type: "", amount: 0 },
  setBonus: () => {},
  loginBonusData: {},
  calculateStreakBonus: () => {},
  getDailyReward: () => {},
});

export const LoginBonusProvider = ({ children }) => {
  const [bonus, setBonus] = useState({ type: "", amount: 0 });

  return (
    <LoginBonusContext.Provider
      value={{
        bonus,
        setBonus,
        loginBonusData,
        calculateStreakBonus,
        getDailyReward,
      }}
    >
      {children}
    </LoginBonusContext.Provider>
  );
};
