// src/screens/SummonScreen.js
import React, { useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { TeamContext } from "../context/TeamContext";

const SummonScreen = () => {
  const { team } = useContext(TeamContext);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Summon Screen</Text>
        <Text style={styles.teamInfo}>Team Members: {team.length}</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default SummonScreen;

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
  teamInfo: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
  },
});
