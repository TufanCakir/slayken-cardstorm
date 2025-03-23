// src/screens/StartScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// URL, die ein JSON-Array mit Dateinamen (z. B. ["player1.png", "player2.png", ...]) zurückgibt
const PLAYER_URL =
  "https://raw.githubusercontent.com/TufanCakir/slayken-cardstorm-assets/main/players/player";
// Basis-URL zum Ergänzen der Bildpfade
const basePlayerURL =
  "https://raw.githubusercontent.com/TufanCakir/slayken-cardstorm-assets/main/players/";

export default function StartScreen() {
  const navigation = useNavigation();
  const [playersImages, setPlayersImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;

  // JSON laden und Array mit vollständigen Bild-URLs erstellen
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(PLAYER_URL);
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Spieler-Daten");
        }
        const data = await response.json();
        // data sollte ein Array mit Dateinamen sein
        const fullURLs = data.map((fileName) => basePlayerURL + fileName);
        setPlayersImages(fullURLs);
      } catch (error) {
        console.error("Fehler:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, []);

  // Animation starten, sobald die Spieler-Bilder geladen sind
  useEffect(() => {
    if (playersImages.length === 0) return;

    // Start: Bild einblenden
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const intervalId = setInterval(() => {
      // Bild ausblenden
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % playersImages.length);
        // Neues Bild einblenden
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [playersImages, opacity]);

  const handleStart = () => {
    navigation.replace("HomeScreen");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {playersImages.length > 0 && (
        <Animated.Image
          source={{ uri: playersImages[currentIndex] }}
          style={[styles.backgroundImage, { opacity }]}
        />
      )}
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: "cover",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
