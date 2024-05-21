import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderPlaced = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <Image source={require('../../assets/images/tick.png')} style={styles.tickImage} />
      <Text style={styles.title}>Confirmed</Text>
      <Text style={styles.subtitle}>
        Check your email for the confirmation.{"\n"}See you soon!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  tickImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0097f2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderPlaced;
