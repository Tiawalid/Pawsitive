import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyChip = () => {
  const navigation = useNavigation();

  const handlesubscribeButton = () => {
    navigation.navigate('Checkout'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <View style={styles.planContainer}>
        <View style={styles.plan}>
          <Text style={styles.saveText}>Save 20%</Text>
          <Text style={styles.planTitle}>Yearly Pro</Text>
          <Text style={styles.planPrice}>$48/year</Text>
          <Text style={styles.planMonthly}>$4/mo</Text>
        </View>
        <View style={styles.plan}>
          <Text style={styles.planTitle}>Monthly</Text>
          <Text style={styles.planPrice}>$5/mo</Text>
        </View>
      </View>
      <View style={styles.features}>
        <Text style={styles.feature}>✔ Real-time location</Text>
        <Text style={styles.feature}>✔ Mood checker</Text>
        <Text style={styles.feature}>✔ Health monitor</Text>
        <Text style={styles.feature}>✔ Reminder</Text>
      </View>
      <TouchableOpacity style={styles.subscribeButton} onPress={handlesubscribeButton}>
        <Text style={styles.subscribeButtonText}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logoContainer: {
    marginRight: 'auto',
  },
  logo: {
    width: 120,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A0FF',
    marginBottom: 20,
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  plan: {
    backgroundColor: '#E0F7FA',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  saveText: {
    backgroundColor: '#00A0FF',
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  planPrice: {
    fontSize: 16,
    color: '#333',
  },
  planMonthly: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  features: {
    marginTop: 40,
  },
  feature: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  subscribeButton: {
    backgroundColor: '#00A0FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 40,
  },
  subscribeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyChip;
