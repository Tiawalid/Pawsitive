import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MyChip() {
  const navigation = useNavigation();

  const handleMoodCheckerPress = () => {
    navigation.navigate("Mood");
  };

  const handleRealTimeLocationPress = () => {
    navigation.navigate("Location");
  };

  const handleHealthMonitoringPress = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </View>
      <Text style={styles.title}>Hope your pet is doing great!</Text>
      <Text style={styles.subtitle}>
        You can now use your chip to track your pet and ensure their safety
      </Text>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, styles.moodCheckerButton]}
          onPress={handleMoodCheckerPress}
        >
          <Text style={styles.buttonText}>Mood Checker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.realTimeLocationButton]}
          onPress={handleRealTimeLocationPress}
        >
          <Text style={styles.buttonText}>Real-Time Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.healthMonitoringButton]}
          onPress={handleHealthMonitoringPress}
        >
          <Text style={styles.buttonText}>Health Monitoring</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  logoContainer: {
    marginLeft: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 30,
    color: "#333",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "70%",
    height: "15%",
  },
  moodCheckerButton: {
    backgroundColor: "#6A5ACD",
  },
  realTimeLocationButton: {
    backgroundColor: "#FF4500",
  },
  healthMonitoringButton: {
    backgroundColor: "#32CD32",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
