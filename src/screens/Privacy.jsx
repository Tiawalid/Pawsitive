import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const PrivacyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" type="ionicon" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Data & Privacy</Text>

      <View style={styles.content}>
        <Text style={styles.description}>
          Welcome to Pawsitive, where your privacy is our priority.
        </Text>
        <Text style={styles.description}>
          We collect personal information, pet details, and usage data to
          improve our services and personalize your experience.
        </Text>
        <Text style={styles.description}>
          Your data is securely protected and only shared with trusted third
          parties under confidentiality agreements. You have the right to
          access, update, or delete your information and withdraw consent for
          data processing. Any policy changes will be communicated via the app
          or email. For questions, contact us. Thank you for trusting us with
          your pet’s care.
        </Text>
        <Text style={styles.contactText}>
          Contact us via email:
          <Text style={styles.emailText}> Pawsitive@gmail.com</Text>
        </Text>
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginTop: 16,
  },
  emailText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default PrivacyScreen;
