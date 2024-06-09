import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function App() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [petName, setPetName] = useState("");

  const handleBackPress = () => {
    navigation.navigate("Vets");
  };

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return token;
      } else {
        console.error("No token found");
        return null;
      }
    } catch (error) {
      console.error("Error getting token:", error.response);
      return null;
    }
  };

  const handleCheckout = async () => {
    if (!selectedDate || !name || !email || !petName) {
      Alert.alert("Error", "Please fill all fields and select a date.");
      return;
    }

    const token = await getToken();
    if (!token) {
      Alert.alert("Error", "User is not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        "https://pawsitive-c80s.onrender.com/api/new/booking",
        {
          name,
          email,
          petName,
          status: "pending",
          verificationNumber: 34567,

          date: selectedDate,
        }
      );
      console.log("Response data:", response.data);
      Alert.alert("Success", "Your appointment has been booked.");
      navigation.navigate("Checkout");
    } catch (error) {
      console.error(
        "Error booking appointment:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Error", "Failed to book the appointment. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Appbar.BackAction style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.sectionTitle}>Book an appointment</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Pet's Name"
            value={petName}
            onChangeText={setPetName}
          />
          <TouchableOpacity style={styles.dateButton}>
            <Text style={styles.dateText}>
              {selectedDate || "No date selected"}
            </Text>
          </TouchableOpacity>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            theme={{
              backgroundColor: "#FFFFFF",
              calendarBackground: "#FFFFFF",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#ffffff",
              selectedDayTextColor: "#000000",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              arrowColor: "orange",
              monthTextColor: "blue",
              indicatorColor: "blue",
              textDayFontFamily: "monospace",
              textMonthFontFamily: "monospace",
              textDayHeaderFontFamily: "monospace",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
          <TouchableOpacity
            style={styles.appointmentButton}
            onPress={handleCheckout}
          >
            <Text style={styles.appointmentButtonText}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 18,
  },
  backButton: {
    marginRight: 10,
  },
  logoContainer: {
    marginLeft: 10,
  },
  logo: {
    width: 90,
    height: 50,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 18,
    paddingBottom: 70,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  questionButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  questionText: {
    fontSize: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dateText: {
    fontSize: 16,
    textAlign: "center",
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
  },
  appointmentButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  appointmentButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
