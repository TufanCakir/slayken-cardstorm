// src/screens/SummonScreen.js
import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CrystalsContext } from "../context/CrystalsContext";

export default function SummonScreen() {
  const { crystals } = useContext(CrystalsContext);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* Anzeige der verfügbaren Crystals */}
        <Text style={styles.crystalsText}>Crystals: {crystals}</Text>
        {/* Rundes Banner */}
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/TufanCakir/slayken-cardstorm-assets/main/players/player1.png",
          }}
          style={styles.bannerImage}
        />
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Single 5 Crystals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Multi 50 Crystals</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  crystalsText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  bannerImage: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2, // Rundes Bild
    borderWidth: 4,
    borderColor: "#FFD700", // goldener Rahmen
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "blue",
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: "#FFD700", // goldener Rahmen
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
