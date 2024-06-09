import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const appointments = [
  {
    id: 1,
    name: "Youssef Enany",
    type: "Dog Owner",
    status: "Returning",
    date: "Tomorrow 2:00 PM",
    color: "#D0EACF",
  },
  {
    id: 2,
    name: "",
    type: "",
    status: "",
    date: "",
    color: "#A0E4E9",
  },
  {
    id: 3,
    name: "",
    type: "",
    status: "",
    date: "",
    color: "#64D9E8",
  },
  {
    id: 4,
    name: "",
    type: "",
    status: "",
    date: "",
    color: "#30C7D7",
  },
];

const AppointmentsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Booked Appointments</Text>
      {appointments.map((appointment) => (
        <View
          key={appointment.id}
          style={[
            styles.appointmentContainer,
            { backgroundColor: appointment.color },
          ]}
        >
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{appointment.name}</Text>
            <Text style={styles.details}>{appointment.type}</Text>
            <Text style={styles.details}>{appointment.status}</Text>
            <Text style={styles.date}>{appointment.date}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aad8e6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    marginTop: 70,
  },
  appointmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#FF0000",
  },
  loadMore: {
    textAlign: "center",
    marginVertical: 20,
    color: "#007BFF",
    fontSize: 16,
  },
});

export default AppointmentsScreen;
