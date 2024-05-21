import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Debitcard = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handleSaveCard = () => {
    console.log('Card saved:', cardNumber, expiryDate, cvv);
    // Navigate back to the checkout page
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Card Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cardholder Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Cardholder name"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Expiry Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CVV:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter CVV"
            value={cvv}
            onChangeText={setCVV}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
          <Text style={styles.saveButtonText}>Save Card</Text>
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    fontSize: 15,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#0097f2',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Debitcard;
