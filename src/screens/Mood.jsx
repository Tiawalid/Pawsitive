import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Mood = () => {
  const navigation = useNavigation();
  const [mood, setMood] = useState("Happy");

  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Pet Mood Tracker" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.title}>Current Mood</Text>
        <Text style={styles.moodText}>{mood}</Text>
        <Image
          source={
            mood === "Happy"
              ? require("../../assets/images/happy.png")
              : require("../../assets/images/sad.png")
          }
          style={styles.moodImage}
        />
        <View style={styles.moodButtonsContainer}>
          <TouchableOpacity
            style={styles.moodButton}
            onPress={() => handleMoodChange("Happy")}
          >
            <Text style={styles.moodButtonText}>Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.moodButton}
            onPress={() => handleMoodChange("Sad")}
          >
            <Text style={styles.moodButtonText}>Sad</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    backgroundColor: "#ADD8E6",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  moodText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  moodImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  moodButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  moodButton: {
    backgroundColor: "#0097f2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  moodButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Mood;
