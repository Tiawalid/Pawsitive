import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [items] = useState([
    { id: 1, text: "Vets", image: require("../../assets/images/vets.jpg") },
    {
      id: 2,
      text: "Petshops",
      image: require("../../assets/images/Petshops.jpg"),
    },
    {
      id: 3,
      text: "Pet Chips",
      image: require("../../assets/images/Petchips.jpg"),
    },
    {
      id: 4,
      text: "Pet Lover Community",
      image: require("../../assets/images/Petlover.jpg"),
    },
    {
      id: 5,
      text: "Tips and Blogs",
      image: require("../../assets/images/tipsblogs.jpg"),
    },
  ]);

  const [search, setSearch] = useState("");

  const updateSearch = (text) => {
    setSearch(text);
  };

  const handleCardPress = (item) => {
    if (item.text === "Petshops") {
      navigation.navigate("PetShops");
    }
    if (item.text === "Vets") {
      navigation.navigate("Vets");
    }
    if (item.text === "Pet Chips") {
      navigation.navigate("Chips");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <View>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
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
});
