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
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function PetShops() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  const handleMyCartPress = () => {
    navigation.navigate("Mycart");
  };

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error getting token:", error.response);
    }
  };

  const getItems = async (category) => {
    await getToken();
    try {
      let response;
      if (category === "Food") {
        response = await axios.get(
          "https://pawsitive-c80s.onrender.com/api/category/food"
        );
      } else if (category === "Chips") {
        response = await axios.get(
          "https://pawsitive-c80s.onrender.com/api/get/chip"
        );
      } else {
        response = await axios.get(
          "https://pawsitive-c80s.onrender.com/api/get/product"
        );
      }
      setItems(response.data);
    } catch (error) {
      console.error(`Error fetching ${category} items: `, error.response);
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await getItems(category);
  };

  const handleAllProductsSelect = async () => {
    setSelectedCategory("All Products");
    await getItems("");
  };

  const updateSearch = (text) => {
    setSearch(text);
  };

  const getSearch = async () => {
    await getToken();
    try {
      const response = await axios.get(
        "https://3VQGNMZJRN-dsn.algolia.net/1/indexes/food/query"
      );
      setSearch(response.data);
    } catch (error) {
      console.error("Error fetching search results: ", error.response);
    }
  };

  useEffect(() => {
    handleAllProductsSelect();
  }, []);

  const handleAddToCart = async (item) => {
    await getToken();
    console.log(item);
    try {
      const response = await axios.post(
        "https://pawsitive-c80s.onrender.com/api/new/cart",
        { quantity: 1, products: item._id }
      );
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error.response.data);
    }
  };

  const handleCardPress = (item) => {
    navigation.navigate("Productdetails", { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Appbar.BackAction style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
        <Appbar.Action icon="cart" onPress={handleMyCartPress} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="What are you looking for?"
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchInputContainer}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === "All Products" &&
                  styles.selectedCategoryButton,
              ]}
              onPress={handleAllProductsSelect}
            >
              <Text style={styles.categoryButtonText}>All Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === "Food" && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelect("Food")}
            >
              <Text style={styles.categoryButtonText}>Food</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === "Chips" && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelect("Chips")}
            >
              <Text style={styles.categoryButtonText}>Chips</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.content}>
          <FlatList
            data={items}
            numColumns={2}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
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
    backgroundColor: "#ADD8E6",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    flex: 1,
  },
  searchInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 40,
  },
  categoryScroll: {
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: "#0097f2",
  },
  categoryButtonText: {
    fontWeight: "bold",
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  cardsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
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
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  price: {
    textAlign: "center",
    marginBottom: 5,
    color: "blue",
  },
  description: {
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
