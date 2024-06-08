import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Data & Privacy</Text>
        <Text style={styles.description}>
        At Pawsitive, we know your pets are family.        </Text>
        <Text style={styles.description}>
        Our 24/7 customer support team is here to help with any app issues, pet care advice, or account queries.        </Text>
        <Text style={styles.description}>
        We're committed to providing quick, efficient solutions to ensure a seamless experience for you and your pets. Your satisfaction is our priority, so don’t hesitate to reach out anytime. We're here to help keep your pets happy and healthy.        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ADD8E6",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  learnMoreButton: {
    marginBottom: 20,
  },
  learnMoreText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default PrivacyScreen;
