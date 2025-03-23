// src/data/LoginBonusData.js

import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginBonusData = {
  dailyRewardOptions: [
    { type: "coins", amount: 50 },
    { type: "crystals", amount: 50 },
  ],
  streakBonuses: [
    { day: 1, bonus: 10 },
    { day: 2, bonus: 20 },
    { day: 3, bonus: 30 },
    { day: 4, bonus: 40 },
    { day: 5, bonus: 50 },
    { day: 6, bonus: 60 },
    { day: 7, bonus: 100 },
  ],
  description: "Earn extra rewards each consecutive day you log in.",
};

/**
 * Berechnet den Bonus basierend auf der aktuellen Login-Streak.
 * Falls die Streak größer als die definierten Tage ist, wird der Bonus
 * des letzten Tages zurückgegeben.
 *
 * @param {number} streak - Anzahl der aufeinanderfolgenden Tage.
 * @returns {number} - Der berechnete Bonus.
 */
export function calculateStreakBonus(streak) {
  const { streakBonuses } = loginBonusData;
  const bonusObj = streakBonuses.find((item) => item.day === streak);
  if (bonusObj) return bonusObj.bonus;
  return streakBonuses[streakBonuses.length - 1].bonus;
}

/**
 * Gibt zufällig einen täglichen Bonus zurück.
 *
 * @returns {object} - Ein Objekt mit den Eigenschaften "type" und "amount".
 */
export function getDailyReward() {
  const options = loginBonusData.dailyRewardOptions;
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

/**
 * Prüft, ob der tägliche Bonus bereits für heute beansprucht wurde.
 * Falls nicht, wird der Bonus zurückgegeben und das heutige Datum gespeichert.
 * Andernfalls wird eine Nachricht zurückgegeben, dass der Bonus bereits beansprucht wurde.
 *
 * @returns {Promise<object>} - Ein Objekt mit { eligible: boolean, reward } oder { eligible: false, message }
 */
export async function getDailyRewardIfEligible() {
  const today = new Date().toDateString();
  try {
    const lastClaim = await AsyncStorage.getItem("lastBonusClaimDate");
    if (lastClaim === today) {
      return {
        eligible: false,
        message: "Bonus already claimed. Please wait until tomorrow.",
      };
    } else {
      const reward = getDailyReward();
      await AsyncStorage.setItem("lastBonusClaimDate", today);
      return { eligible: true, reward };
    }
  } catch (error) {
    console.error("Error checking daily reward eligibility", error);
    // Im Fehlerfall erlauben wir die Beanspruchung
    const reward = getDailyReward();
    await AsyncStorage.setItem("lastBonusClaimDate", today);
    return { eligible: true, reward };
  }
}
