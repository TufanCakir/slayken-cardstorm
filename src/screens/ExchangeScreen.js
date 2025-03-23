// src/screens/ExchangeScreen.js
import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CoinsContext } from "../context/CoinsContext";
import { CrystalsContext } from "../context/CrystalsContext";

const ExchangeScreen = () => {
  const { coins } = useContext(CoinsContext);
  const { crystals } = useContext(CrystalsContext);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Exchange Screen</Text>
        <Text style={styles.stats}>
          Coins: {coins} | Crystals: {crystals}
        </Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default ExchangeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  stats: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
  },
});
