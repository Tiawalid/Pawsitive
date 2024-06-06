import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function Home() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    const fetchData = async () => {
      await getToken();
      try {
        const response = await axios.get(
          "https://pawsitive-c80s.onrender.com/api/get/chip"
        );
        console.log(response.data);
        setLoading(false) 
        // setSearch(response.data);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      }
    };
    
    fetchData();
  }, []);

  const handleSubscriptionPress = (item) => {
    navigation.navigate("Checkout", { subscriptionType: item.text });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.price}>{item.price}</Text>
      {item.features &&
        item.features.map((feature, index) => (
          <Text key={index} style={styles.feature}>
            - {feature}
          </Text>
        ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubscriptionPress(item)}
      >
        <Text style={styles.buttonText}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
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
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    marginRight: 10,
    marginTop: 20,
  },
  logoContainer: {
    marginLeft: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  cardsContainer: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 50,
    width: 250,
    height: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  feature: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
