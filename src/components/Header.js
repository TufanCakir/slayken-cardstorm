// src/components/Header.js
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CoinsContext } from "../context/CoinsContext";
import { CrystalsContext } from "../context/CrystalsContext";
import { useAccount } from "../context/AccountContext";

const Header = () => {
  const { coins } = useContext(CoinsContext);
  const { crystals } = useContext(CrystalsContext);
  const { accountLevel } = useAccount();

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Level: {accountLevel}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.labelText}>Coins:</Text>
          <Text style={styles.statText}>{coins}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.labelText}>Crystals:</Text>
          <Text style={styles.statText}>{crystals}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222",
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#FFD700", // Leuchtender goldener Rahmen
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  levelText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
  },
  statItem: {
    marginLeft: 20,
    alignItems: "center",
  },
  labelText: {
    color: "#fff",
    fontSize: 14,
  },
  statText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
});
