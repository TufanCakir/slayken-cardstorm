// src/screens/HomeScreen.js
import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LoginBonusContext } from "../context/LoginBonusContext";
import { CoinsContext } from "../context/CoinsContext";
import { CrystalsContext } from "../context/CrystalsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

// Beispiel-Menüeinträge: Jeder Eintrag enthält einen Titel, Route und ein Bild
const menuItems = [
  {
    id: "1",
    title: "Cardstorm",
    route: "CardstormScreen",
    image:
      "https://raw.githubusercontent.com/TufanCakir/slayken-cardstorm-assets/main/players/player1.png",
  },
  {
    id: "2",
    title: "Battle",
    route: "BattleScreen",
    image:
      "https://raw.githubusercontent.com/TufanCakir/slayken-cardstorm-assets/main/players/player2.png",
  },
  {
    id: "3",
    title: "Event",
    route: "EventScreen",
    image:
      "https://raw.githubusercontent.com/TufanCakir/slayken-cardstorm-assets/main/players/player3.png",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { bonus, setBonus, getDailyReward } = useContext(LoginBonusContext);
  const { coins, setCoins } = useContext(CoinsContext);
  const { crystals, setCrystals } = useContext(CrystalsContext);

  // Täglichen Bonus einmalig anwenden, falls er noch nicht beansprucht wurde
  useEffect(() => {
    async function applyDailyBonusOnce() {
      const today = new Date().toDateString();
      const lastBonusClaimDate = await AsyncStorage.getItem(
        "lastBonusClaimDate"
      );

      // Wenn der Bonus heute schon beansprucht wurde, tue nichts
      if (lastBonusClaimDate === today) return;

      // Falls noch kein Bonus vorhanden ist, wende ihn an:
      if (bonus.amount === 0) {
        const dailyReward = getDailyReward();
        if (dailyReward.type === "coins") {
          setCoins(coins + dailyReward.amount);
        } else if (dailyReward.type === "crystals") {
          setCrystals(crystals + dailyReward.amount);
        }
        // Setze den Bonus zurück, damit er nicht erneut hinzuaddiert wird
        setBonus({ type: "", amount: 0 });
        // Speichere das heutige Datum als Bonus-Claim-Datum
        await AsyncStorage.setItem("lastBonusClaimDate", today);
      }
    }
    applyDailyBonusOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => navigation.navigate(item.route)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.nameBelowImage}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.flatListContent}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
  },
  flatListContent: {
    alignItems: "center",
  },
  itemContainer: {
    width: width,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imageButton: {
    width: width,
    height: width,
    borderRadius: width / 2,
    overflow: "hidden",
    marginBottom: 10,
    // iOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    // Android Shadow (Elevation)
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  nameBelowImage: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
