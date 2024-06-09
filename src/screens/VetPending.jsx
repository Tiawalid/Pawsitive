import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const bookings = [
  {
    id: "1",
    name: "Youssef Enany",
    role: "Dog Owner",
    status: "Returning",
    time: "Tomorrow 2:00 PM",
  },
  {
    id: "2",
    name: "",
    role: "Dog Owner",
    status: "Returning",
    time: "Tomorrow 2:00 PM",
  },
  {
    id: "3",
    name: "",
    role: "Dog Owner",
    status: "Returning",
    time: "Tomorrow 2:00 PM",
  },
  {
    id: "4",
    name: "",
    role: "Dog Owner",
    status: "Returning",
    time: "Tomorrow 2:00 PM",
  },
];

const BookingItem = ({ item }) => (
  <View style={styles.bookingItem}>
    <Image
      source={{ uri: "https://via.placeholder.com/50" }}
      style={styles.image}
    />
    <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.status}>{item.status}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.acceptButton}>
        <Text style={styles.acceptText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton}>
        <Text style={styles.rejectText}>Reject</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Bookings</Text>
      <FlatList
        data={bookings}
        renderItem={BookingItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bookingItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: "#e0f7e0",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  acceptText: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  rejectButton: {
    backgroundColor: "#f7e0e0",
    padding: 8,
    borderRadius: 4,
  },
  rejectText: {
    color: "#f44336",
    fontWeight: "bold",
  },
});

export default App;
