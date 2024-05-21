import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, StyleSheet, ScrollView } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Productdetails from '../screens/Productdetails';
import MyTab from '../screens/Tab';


export default function PetShops() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  
  const handleBackPress = () => {
    navigation.navigate('Home');
  };


  const handleMyCartPress = () => {
    console.log('Navigating to Mycart'); 
    navigation.navigate('Mycart'); 
  };
  const [items] = useState([
    { 
      id: 1, 
      name: 'Chicken can for kittens', 
      price: '$10.99', 
      description: 'High-quality chicken cat food suitable for kittens.', 
      image: require('../../assets/images/catcanfood.jpeg'), 
      category: 'Food'
    },
    { 
      id: 2, 
      name: 'ROYAL CANIN for cats', 
      price: '$15.99', 
      description: 'Premium cat food formulated for adult cats.', 
      image: require('../../assets/images/catcanin.jpg'), 
      category: 'Food'
    },
    { 
      id: 3, 
      name: 'Dog can chicken flavor', 
      price: '$8.99', 
      description: 'Delicious chicken-flavored dog food for all breeds.', 
      image: require('../../assets/images/dogcanfood.jpg'), 
      category: 'Food'
    },
    { 
      id: 4, 
      name: 'ROYAL CANIN for dogs', 
      price: '$20.99', 
      description: 'Specialized dog food for different breeds and sizes.', 
      image: require('../../assets/images/dogcanin.jpeg'), 
      category: 'Food'
    },
    { 
      id: 5, 
      name: 'Pedigree for dogs', 
      price: '$12.99', 
      description: 'Balanced nutrition for adult dogs in a tasty formula.', 
      image: require('../../assets/images/dogfood.jpeg'), 
      category: 'Food'
    },
    { 
      id: 6, 
      name: 'Dry food for cats', 
      price: '$14.99', 
      description: 'Nutritious dry food suitable for adult cats.', 
      image: require('../../assets/images/catfood.jpg'), 
      category: 'Food'
    },
    { 
      id: 7, 
      name: 'Cat collar', 
      price: '$8.99', 
      description: 'Stylish collar for your cat.', 
      image: require('../../assets/images/catcollar.jpg'), 
      category: 'Accessories'
    },
    { 
      id: 8, 
      name: 'Dog leash', 
      price: '$12.99', 
      description: 'Durable leash for walking your dog.', 
      image: require('../../assets/images/dogleash.jpg'), 
      category: 'Accessories'
    },
    { 
      id: 9, 
      name: 'Catnip toy', 
      price: '$5.99', 
      description: 'Interactive toy filled with catnip.', 
      image: require('../../assets/images/catniptoy.jpg'), 
      category: 'Accessories'
    },
    { 
      id: 10, 
      name: 'Dog bowl', 
      price: '$6.99', 
      description: 'Stainless steel bowl for your dog.', 
      image: require('../../assets/images/dogbowl.jpg'), 
      category: 'Accessories'
    },
    { 
      id: 11, 
      name: 'Dog chew toy', 
      price: '$7.99', 
      description: 'Durable chew toy for your dog.', 
      image: require('../../assets/images/dogchewtoy.jpg'), 
      category: 'Accessories'
    },
    { 
      id: 12, 
      name: 'Cat bed', 
      price: '$19.99', 
      description: 'Soft and cozy bed for your cat.', 
      image: require('../../assets/images/catbed.jpeg'), 
      category: 'Accessories'
    },
    { 
      id: 13, 
      name: 'Dog treats', 
      price: '$4.99', 
      description: 'Tasty treats for rewarding your dog.', 
      image: require('../../assets/images/dogtreats.jpg'), 
      category: 'Treats'
    },
    { 
      id: 14, 
      name: 'Cat treats', 
      price: '$3.99', 
      description: 'Irresistible treats for your cat.', 
      image: require('../../assets/images/cattreats.jpg'), 
      category: 'Treats'
    },
  ]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const updateSearch = (text) => {
    setSearch(text);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (item) => {
    console.log('Adding item to cart:', item);
  };

  const handleCardPress = (item) => {
    console.log("Card clicked:", item);
    navigation.navigate('Productdetails', { item });
  };

  const filteredItems = selectedCategory ? items.filter(item => item.category === selectedCategory) : items;


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <View style={styles.cardContent}>
        <Image source={item.image} style={styles.image} />
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
  const goToTabs = () => {
    navigation.navigate('MyTab'); 
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
      <TouchableOpacity onPress={handleBackPress}>
        <Appbar.BackAction style={styles.backButton} />
                </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
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
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'Food' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('Food')}
          >
            <Text style={styles.categoryButtonText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'Accessories' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('Accessories')}
          >
            <Text style={styles.categoryButtonText}>Accessories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'Treats' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('Treats')}
          >
            <Text style={styles.categoryButtonText}>Treats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'Chips' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('Chips')}
          >
            <Text style={styles.categoryButtonText}>Chips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <FlatList
            data={filteredItems}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
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
    backgroundColor: '#ADD8E6',
  },
  header: {
    backgroundColor: '#ADD8E6',
  },
  logoContainer: {
    marginRight: 'auto',
  },
  logo: {
    width: 100,
    height: 100,
  },
  searchContainer: {
    backgroundColor: '#ADD8E6',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    backgroundColor: 'transparent', 
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    flex: 1,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#0097f2',
  },
  categoryButtonText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  cardsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    width: 170,
    height: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    alignSelf: 'center',
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    textAlign: 'center',
    marginBottom: 5,
    color: 'blue', 
  },
  description: {
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});