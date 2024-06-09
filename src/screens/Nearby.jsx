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
        <Image source={{ uri: item.image }} style={styles.image} />

        <Text style={styles.text}>{item.name}</Text>
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
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <FlatList
            data={vets}
            numColumns={2}
            keyExtractor={(item) => item._id}
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
