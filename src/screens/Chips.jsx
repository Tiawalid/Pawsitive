import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function Home() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [index, setIndex] = useState(0);
  const [items] = useState([
    {
      id: 1,
      text: "Basic Chip",
      price: "300 L.E./month or 3,168/year",
      features: ["Real time location"],
    },
    {
      id: 2,
      text: "Pro Chip",
      price: "370 L.E./month or 3,907/year",
      features: ["Real time location", "Health monitoring"],
    },
    {
      id: 3,
      text: "Premium Chip",
      price: "450 L.E./month or 4,752/year",
      features: ["Real time location", "Health monitoring", "Mood checker"],
    },
  ]);

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return token;
      } else {
        console.error("No token found");
        return null;
      }
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  const fetchProducts = async () => {
    await getToken();
    try {
      const response = await axios.get(
        "https://pawsitive-c80s.onrender.com/api/products"
      );

      console.log(response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetPrices = async () => {
    await getToken();
    try {
      const response = await axios.get(
        "https://pawsitive-c80s.onrender.com/api/PricesProducts"
      );

      setPrices(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubscriptionPress = async (item) => {
    console.log("Subscription button pressed for:", item.text);
    await getToken();
    try {
      const response = await axios.post(
        "https://pawsitive-c80s.onrender.com/api/new/chip",
        {
          chipType: item.text,
        }
      );
      console.log("Chip subscription successful:", response.data);
      navigation.navigate("Checkout", { subscriptionType: item.text });
    } catch (error) {
      console.error("Error subscribing to chip:", error.response);
      console.log(
        "Error details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetPrices();
  }, []);

  const renderProductItem = ({ item, i }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.price}>{item.priceAmount * 100} EGP</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Product pressed:", item.name)}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  const renderChipItem = ({ item }) => {
    prices.map((p, i) => {
      products[i].priceAmount = parseFloat(p.unit_amount);
    });
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.price}>{item.priceAmount / 100} EGP</Text>

        <Text style={styles.price}>{item.description}</Text>
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
  };

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {/* <Text style={styles.sectionTitle}>Products</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item._id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderProductItem}
            contentContainerStyle={styles.cardsContainer}
          /> */}
          <Text style={styles.sectionTitle}>Chip Subscriptions</Text>
          {prices.length > 0 && (
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={renderChipItem}
              contentContainerStyle={styles.cardsContainer}
            />
          )}
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
    marginBottom: 20,
    width: 250,
    height: 300,
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});
