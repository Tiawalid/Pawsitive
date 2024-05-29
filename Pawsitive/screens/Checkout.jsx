import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Checkout = () => {
  const totalPrice = 0; 
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null); 
  

  const handlePlaceOrder = () => {
    navigation.navigate('Orderplaced');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <View style={styles.logoContainer}>
          
        </View>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Checkout</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Shipping Address</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter your shipping address"
            multiline
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentButtons}>
            <TouchableOpacity
              style={[styles.paymentButton, paymentMethod === 'cash' && styles.selectedPaymentButton]} 
              onPress={() => setPaymentMethod('cash')} 
            >
              <Text style={styles.paymentButtonText}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentButton, paymentMethod === 'debit' && styles.selectedPaymentButton]} 
              onPress={() => {
                setPaymentMethod('debit');
                navigation.navigate('Debitcard'); 
              }}
            >
              <Text style={styles.paymentButtonText}>Debit Card</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total Price: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Confirm</Text>
          </TouchableOpacity>
         
        </View>
      </ScrollView>
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
    elevation: 0, 
    shadowOpacity: 0, 
  },
  logoContainer: {
    marginLeft: 15,
  },
  logo: {
    width: 100,
    height: 100,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  paymentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentButton: {
    backgroundColor: '#0097f2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedPaymentButton: {
    backgroundColor: 'black', 
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeOrderButton: {
    backgroundColor: '#0097f2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkout;
