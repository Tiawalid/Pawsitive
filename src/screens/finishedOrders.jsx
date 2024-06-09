import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const orders = [
  {
    id: "224568",
    service: "Vet Appointment",
    assigned: "Happy Paws Clinic",
    schedule: "26 July | 11 am to 12:30 pm",
    status: "Completed",
  },
  {
    id: "224569",
    service: "Pet Grooming",
    assigned: "Grooming Salon",
    schedule: "26 July | 2 pm to 3:30 pm",
    status: "Completed",
  },
  {
    id: "224570",
    service: "Pet Shop Delivery",
    assigned: "Pets R Us",
    schedule: "27 July | 10 am to 11:30 am",
    status: "Completed",
  },
  {
    id: "224572",
    service: "Vet Appointment",
    assigned: "City Vets",
    schedule: "29 July | 9 am to 10:30 am",
    status: "Cancelled",
  },
  {
    id: "224573",
    service: "Pet Grooming",
    assigned: "Furry Friends Grooming",
    schedule: "30 July | 1 pm to 2:30 pm",
    status: "Cancelled",
  },
  {
    id: "224574",
    service: "Pet Shop Delivery",
    assigned: "Paw Mart",
    schedule: "31 July | 11 am to 12:30 pm",
    status: "Requested",
  },
];

const finishedOrders = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Completed");

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderService}>{item.service}</Text>
        <Text style={styles.orderId}>#{item.id}</Text>
      </View>
      <Text style={styles.orderAssigned}>Assigned: {item.assigned}</Text>
      <Text style={styles.orderSchedule}>Schedule: {item.schedule}</Text>
    </View>
  );

  const filteredOrders = orders.filter(
    (order) => order.status === selectedTab && order.service !== "Pet Boarding"
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.header}>My Orders</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Completed" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("Completed")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Completed" && styles.selectedTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Cancelled" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("Cancelled")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Cancelled" && styles.selectedTabText,
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Requested" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("Requested")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Requested" && styles.selectedTabText,
            ]}
          >
            Requested
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  goBackButton: {
    marginRight: 16,
  },
  goBackButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 60,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  selectedTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  selectedTabText: {
    color: "#fff",
  },
  orderList: {
    paddingBottom: 16,
  },
  orderCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderService: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderId: {
    color: "#999",
  },
  orderAssigned: {
    color: "#555",
    marginBottom: 4,
  },
  orderSchedule: {
    color: "#555",
  },
});

export default finishedOrders;
