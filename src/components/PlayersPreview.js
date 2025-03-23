// src/components/PlayersPreview.js
import React, { useState, useEffect } from "react";
import { ScrollView, Image, Text, StyleSheet } from "react-native";

const PLAYER_URL =
  "https://raw.githubusercontent.com/TufanCakir/slayken-cardstorm-assets/refs/heads/main/player.json";
const basePlayerURL =
  "https://raw.githubusercontent.com/TufanCakir/slayken-cardstorm-assets/main/players/";

export default function PlayersPreview() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(PLAYER_URL);
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Spieler-Daten");
        }
        const data = await response.json();
        const playersArray = data.players || data;
        if (Array.isArray(playersArray)) {
          const playersWithUrl = playersArray.map((player) => ({
            ...player,
            image: basePlayerURL + player.image,
          }));
          setPlayers(playersWithUrl);
        }
      } catch (error) {
        console.error("Fehler:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Lade Spieler...</Text>;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {players.map((player) => (
        <Image
          key={player.id}
          source={{ uri: player.image }}
          style={styles.previewImage}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#FFD700", // Goldener Rahmen
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
});
