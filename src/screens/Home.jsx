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
import * as SecureStore from "expo-secure-store";
import axios from "axios";

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

  const getSearch = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      const response = await axios.get(
        "https://3VQGNMZJRN-dsn.algolia.net/1/indexes/food/query"
      );
      console.log(response.data);
      setSearch(response.data);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);

  const handleCardPress = (item) => {
    if (item.text === "Petshops") {
      navigation.navigate("PetShops");
    }
    if (item.text === "Vets") {
      navigation.navigate("Vets");
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
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="What are you looking for?"
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchInputContainer}
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    flex: 1,
    marginTop: 80,
    marginBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 40,
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
