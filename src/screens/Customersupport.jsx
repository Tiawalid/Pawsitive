import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const Customersupport = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Customer Support</Text>
        <Text style={styles.description}>
          At Pawsitive, we know your pets are family.
        </Text>
        <Text style={styles.description}>
          Our 24/7 customer support team is here to help with any app issues,
          pet care advice, or account queries.
        </Text>
        <Text style={styles.description}>
          We're committed to providing quick, efficient solutions to ensure a
          seamless experience for you and your pets. Your satisfaction is our
          priority, so don’t hesitate to reach out anytime. We're here to help
          keep your pets happy and healthy.
        </Text>
      </View>

      <View style={styles.footer}></View>
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#007AFF",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 16,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  learnMoreButton: {
    marginBottom: 20,
  },
  learnMoreText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default Customersupport;
