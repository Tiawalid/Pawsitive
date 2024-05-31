import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { Appbar } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function Home({ navigation }) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const [vets, setVets] = useState([]);

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const getVets = async () => {
    await getToken();
    try {
      const response = await axios.get(
        "https://pawsitive-c80s.onrender.com/api/get/vet"
      );
      console.log(response.data);
      setVets(response.data);
    } catch (error) {
      console.error("Error fetching vets data: ", error);
    }
  };

  useEffect(() => {
    getVets();
  }, []);

  const items = [
    {
      id: 1,
      text: "Book an Appointment",
      image: require("../../assets/images/Vetshome.jpg"),
    },
    {
      id: 2,
      text: "View nearby vets",
      image: require("../../assets/images/Vetshome.jpg"),
    },
    {
      id: 3,
      text: "Chat with a vet",
      image: require("../../assets/images/chatbot.jpeg"),
    },
  ];

  const [search, setSearch] = useState("");

  const updateSearch = (text) => {
    setSearch(text);
  };

  const getSearch = async () => {
    await getToken();
    try {
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
    if (item.text === "Chat with a vet") {
      navigation.navigate("Chatbot");
    } else if (item.text === "Book an Appointment") {
      navigation.navigate("Vetsbooking");
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
        <TouchableOpacity onPress={handleBackPress}>
          <Appbar.BackAction style={styles.backButton} />
        </TouchableOpacity>
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
      </ScrollView>
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
    backgroundColor: "#ADD8E6",
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
  },
  searchInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 40,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: -20,
  },
  cardsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 25,
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    width: 170,
    height: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 160,
    marginBottom: 10,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
