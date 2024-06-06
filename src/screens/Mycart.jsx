import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const Mycart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://pawsitive-c80s.onrender.com/api/get/cart"
        );
        console.log("Data fetched: ", response.data);

        const allProducts = response.data.flatMap((order) => order.products);
        const totalPrice = allProducts.reduce(
          (sum, item) => sum + (item.price || 0),
          0
        );

        setCartItems(allProducts);
        setTotalPrice(totalPrice);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price?.toFixed(2)}</Text>
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
      <Appbar.Header style={styles.header}>
        <View style={styles.logoContainer}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </Appbar.Header>
      <View style={styles.content}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.cartList}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total Price: ${totalPrice.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    backgroundColor: "#ADD8E6",
    elevation: 0,
    shadowOpacity: 0,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cartList: {
    width: "100%",
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    padding: 16,
    backgroundColor: "#ADD8E6",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#0097f2",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 50,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Mycart;
