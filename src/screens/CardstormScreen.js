// src/screens/CardstormScreen.js
import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAccount } from "../context/AccountContext";
import { CoinsContext } from "../context/CoinsContext";
import { CrystalsContext } from "../context/CrystalsContext";

const CardstormScreen = () => {
  const { accountLevel } = useAccount();
  const { coins } = useContext(CoinsContext);
  const { crystals } = useContext(CrystalsContext);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome to the Cardstorm Screen! (Level {accountLevel})
        </Text>
        <Text style={styles.info}>
          Coins: {coins} | Crystals: {crystals}
        </Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default CardstormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  content: {
    flex: 1, // nimmt den restlichen Platz oberhalb des Footers ein
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  info: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
  },
});
