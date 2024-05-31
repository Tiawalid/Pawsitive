import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const MyComponent = () => {
  const navigation = useNavigation();

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header style={{ backgroundColor: "#ADD8E6" }}>
      <Appbar.BackAction onPress={_goBack} />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
    </Appbar.Header>
  );
};

const SignUpForm = ({ navigation, loggedIn }) => {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [TaxRegister, setTaxRegister] = useState("");
  const [Syndicatecard, setSyndicatecard] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState("");

  const validateForm = () => {
    let errors = {};
    if (!Name) errors.Name = "Name is required";
    if (!PhoneNumber) errors.PhoneNumber = "Phone Number is required";
    if (!Address) errors.Address = "Address is required";
    if (!Email) errors.Email = "Email is required";
    if (!Password) errors.Password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    // if (!validateForm()) return;

    console.log({
      Name,
      Age,
      PhoneNumber,
      Address,
      Email,
      TaxRegister,
      Syndicatecard,
      Password,
      gender: "male",
      role: "admin",
    });
    await axios
      .post("https://pawsitive-c80s.onrender.com/api/signup", {
        name: Name,
        age: Age,
        phone: PhoneNumber,
        address: Address,
        email: Email,
        TaxRegister,
        Syndicatecard,
        password: Password,
        gender: "male",
        role:
          type == "pet owner" ? "petOwner" : type == "pet vet" ? "vet" : "shop",
      })
      .then(async (response) => {
        console.log(response.data);
        if (response.data.error) {
          setErrorMessage(response.data.error);
          return;
        }

        if (response.data.accessToken) {
          await SecureStore.setItemAsync(
            "userToken",
            response.data.accessToken
          );
          console.log(response.data.accessToken);
          loggedIn();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        // setName("");
        // setAge("");
        // setPhoneNumber("");
        // setAddress("");
        // setEmail("");
        // setTaxRegister("");
        // setSyndicatecard("");
        // setPassword("");
        // setErrors({});
      });
  };

  const getUserType = async () => {
    const userType = await SecureStore.getItemAsync("user_type");
    setType(userType);
  };

  useEffect(() => {
    getUserType();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.container}
      >
        <MyComponent />
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#F5F5F5" }]}
            placeholder=""
            value={Name}
            onChangeText={setName}
          />
          {errors.Name && <Text style={styles.errorText}>{errors.Name}</Text>}

          {type == "pet owner" ? (
            <>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={[styles.input, { backgroundColor: "#F5F5F5" }]}
                placeholder=""
                value={Age}
                onChangeText={setAge}
              />
              {errors.Age && <Text style={styles.errorText}>{errors.Age}</Text>}
            </>
          ) : (
            ""
          )}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#F5F5F5" }]}
            placeholder=""
            value={PhoneNumber}
            onChangeText={setPhoneNumber}
          />
          {errors.PhoneNumber && (
            <Text style={styles.errorText}>{errors.PhoneNumber}</Text>
          )}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#F5F5F5" }]}
            placeholder=""
            value={Address}
            onChangeText={setAddress}
          />
          {errors.Address && (
            <Text style={styles.errorText}>{errors.Address}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#F5F5F5" }]}
            placeholder=""
            value={Email}
            onChangeText={setEmail}
          />
          {errors.Email && <Text style={styles.errorText}>{errors.Email}</Text>}

          {type == "pet shop" ? (
            <>
              <Text style={styles.label}>Tax Register</Text>
              <TextInput
                style={[styles.input, { backgroundColor: "#F5F5F5" }]}
                placeholder=""
                value={TaxRegister}
                onChangeText={setTaxRegister}
              />
              {errors.TaxRegister && (
                <Text style={styles.errorText}>{errors.TaxRegister}</Text>
              )}
            </>
          ) : (
            ""
          )}

          {type == "pet vet" ? (
            <>
              <Text style={styles.label}>Syndicate card</Text>
              <TextInput
                style={[styles.input, { backgroundColor: "#F5F5F5" }]}
                placeholder=""
                value={Syndicatecard}
                onChangeText={setSyndicatecard}
              />
              {errors.Syndicatecard && (
                <Text style={styles.errorText}>{errors.Syndicatecard}</Text>
              )}
            </>
          ) : (
            ""
          )}

          <Text style={styles.label}>Set Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#F5F5F5" }]}
            placeholder=""
            value={Password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.Password && (
            <Text style={styles.errorText}>{errors.Password}</Text>
          )}

          <TouchableOpacity style={styles.SignUpButton} onPress={handleSubmit}>
            <Text style={styles.SignUpButtonText}>Sign up</Text>
          </TouchableOpacity>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
        <View style={styles.bottomRightImageContainer}>
          <Image
            source={require("../../assets/images/dogsignup.png")}
            style={styles.bottomRightImage}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ADD8E6",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 15,
  },
  form: {
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 50, // Added margin bottom to push up the fields
  },
  label: {
    fontSize: 15,
    marginBottom: 3,
    fontWeight: "bold",
    color: "#0097f2",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  SignUpButton: {
    backgroundColor: "#0097f2",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  SignUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomRightImageContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  bottomRightImage: {
    width: 150,
    height: 300,
    resizeMode: "contain",
  },
});

export default SignUpForm;
