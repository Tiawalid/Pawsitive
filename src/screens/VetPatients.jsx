import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const patients = [
  {
    id: "1",
    name: "Maria",
    age: 25,
    role: "Dog Owner",
    lastVisit: "20/09/2023",
  },
  { id: "2", name: "", age: 23, role: "Dog Owner", lastVisit: "10/08/2023" },
  { id: "3", name: "", age: 40, role: "Cat Owner", lastVisit: "17/07/2023" },
  { id: "4", name: "", age: 37, role: "Bird Owner", lastVisit: "04/04/2023" },
];

const PatientItem = ({ item }) => (
  <View style={styles.patientItem}>
    <Image
      source={{ uri: "https://via.placeholder.com/50" }}
      style={styles.image}
    />
    <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.age}>{item.age}</Text>
      <Text style={styles.lastVisit}>Last visit {item.lastVisit}</Text>
    </View>
    <TouchableOpacity style={styles.moreButton}>
      <Text style={styles.moreText}>⋮</Text>
    </TouchableOpacity>
  </View>
);

const MyPatients = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Patients</Text>
      <FlatList
        data={patients}
        renderItem={({ item }) => <PatientItem item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<Text style={styles.loadMore}>Load more...</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#aad8e6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
  },
  patientItem: {
    flexDirection: "row",
    backgroundColor: "#aed8e6",
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
  age: {
    fontSize: 14,
    color: "#666",
  },
  lastVisit: {
    fontSize: 14,
    color: "#666",
  },
  moreButton: {
    padding: 8,
  },
  moreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  loadMore: {
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
    marginTop: 16,
  },
});

export default MyPatients;
