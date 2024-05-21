import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';

const Productdetails = ({ route, navigation }) => {
  const { item } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
   
    console.log('Adding item to cart:', item);
  };

  const handleReviews = () => {
   
    console.log('Viewing reviews for:', item.name);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBackPress} />  
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>
      </Appbar.Header>
      <View style={styles.content}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
         
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.reviewsButton} onPress={handleReviews}>
            <Text style={styles.reviewsButtonText}>Reviews</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  header: {
    backgroundColor: '#ADD8E6',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 20,
    marginTop: 50, 
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  image: {
    width: 250, 
    height: 250, 
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: 'blue',
  },
  reviewsButton: {
    marginLeft: 10,
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    
  },
  reviewsButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 5,
    width: 200,
    height: 50,
    marginTop: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Productdetails;
