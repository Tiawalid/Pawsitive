import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [items] = useState([
    {
      id: 1,
      text: "Booked Appointment",
      image: require("../../assets/images/booked.png"),
    },
    {
      id: 2,
      text: "Pending Bookings",
      image: require("../../assets/images/pending.png"),
    },
    {
      id: 3,
      text: "Statistics",
      image: require("../../assets/images/statistics.webp"),
    },
    {
      id: 4,
      text: "Patients",
      image: require("../../assets/images/patient.jpeg"),
    },
  ]);

  const [search, setSearch] = useState("");

  const updateSearch = (text) => {
    setSearch(text);
  };

  const handleCardPress = (item) => {
    switch (item.text) {
      case "Booked Appointment":
        navigation.navigate("VetBooked");
        break;
      case "Pending Bookings":
        navigation.navigate("VetPending");
        break;
      case "Statistics":
        navigation.navigate("VetStatistics");
        break;
      case "Patients":
        navigation.navigate("VetPatients");
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <View>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
        {(item.text === "Pet Lover Community" ||
          item.text === "Tips and Blogs") && (
          <View style={styles.comingSoonContainer}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={styles.cardsContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  logoContainer: {
    marginRight: "auto",
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -20,
    paddingBottom: 10,
  },
  cardsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    width: 170,
    height: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  comingSoonContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  comingSoonText: {
    color: "#fff",
    fontSize: 12,
  },
});
