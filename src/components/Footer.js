import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* HOME */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      {/* TEAM */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("TeamScreen")}
      >
        <Text style={styles.text}>Team</Text>
      </TouchableOpacity>

      {/* SUMMON */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("SummonScreen")}
      >
        <Text style={styles.text}>Summon</Text>
      </TouchableOpacity>

      {/* SHOP */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("ShopScreen")}
      >
        <Text style={styles.text}>Shop</Text>
      </TouchableOpacity>

      {/* EXCHANGE */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("ExchangeScreen")}
      >
        <Text style={styles.text}>Exchange</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
  },
  item: {
    padding: 10,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
