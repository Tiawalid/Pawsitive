import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Checkout = () => {
  const totalPrice = 0;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [governorate, setGovernorate] = useState("Select Governorate");
  const [streetName, setStreetName] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const governorates = ["Alexandria", "Cairo"];

  const handleCheckout = () => {
    navigation.navigate("Orderplaced");
    console.log({
      name,
      governorate,
      streetName,
      buildingNumber,
      floorNumber,
      apartmentNumber,
      paymentMethod,
    });
  };

  const renderGovernorateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setGovernorate(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <View style={styles.logoContainer}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Checkout</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.label}>Governorate</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text>{governorate}</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Street Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Street Name"
              value={streetName}
              onChangeText={setStreetName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Building Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Building Number"
              value={buildingNumber}
              onChangeText={setBuildingNumber}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Floor Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Floor Number"
              value={floorNumber}
              onChangeText={setFloorNumber}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Apartment Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Apartment Number"
              value={apartmentNumber}
              onChangeText={setApartmentNumber}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Payment Method</Text>
            <View style={styles.paymentButtons}>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  paymentMethod === "cash" && styles.selectedPaymentButton,
                ]}
                onPress={() => setPaymentMethod("cash")}
              >
                <Text style={styles.paymentButtonText}>Cash</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  paymentMethod === "debit" && styles.selectedPaymentButton,
                ]}
                onPress={() => {
                  setPaymentMethod("debit");
                  navigation.navigate("Debitcard");
                }}
              >
                <Text style={styles.paymentButtonText}>Debit Card</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total Price: ${totalPrice.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={handleCheckout}
            >
              <Text style={styles.placeOrderButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={governorates}
                renderItem={renderGovernorateItem}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    backgroundColor: "#ADD8E6",
    elevation: 0,
    shadowOpacity: 0,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  paymentButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentButton: {
    backgroundColor: "#0097f2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedPaymentButton: {
    backgroundColor: "black",
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  placeOrderButton: {
    backgroundColor: "#0097f2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalItem: {
    padding: 10,
  },
  modalItemText: {
    fontSize: 18,
  },
});

export default Checkout;
