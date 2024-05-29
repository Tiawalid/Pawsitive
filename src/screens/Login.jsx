import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
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

const LoginForm = ({ navigation, loggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    console.log("HandleSubmit called");
    try {
      const response = await axios.post(
        "https://pawsitive-c80s.onrender.com/api/signin",
        {
          email: email,
          password: password,
        }
      );
      console.log("Response received:", response.data);
      if (response.data.error) {
        setErrorMessage(response.data.error);
      }
      if (response.data.accessToken) {
        await SecureStore.setItemAsync("userToken", response.data.accessToken);
        console.log("User token saved:", response.data.accessToken);
        loggedIn();
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
        setErrorMessage("An error occurred. Please try again.");
      } else if (error.request) {
        console.log("Error request:", error.request);
        setErrorMessage(
          "No response from server. Please check your network connection."
        );
      } else {
        console.log("Error message:", error.message);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const goToForgotPassword = () => {
    navigation.push("Forgotpassword");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
          }}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
          }}
          secureTextEntry
        />

        {errorMessage ? (
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity onPress={goToForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/doglogin.png")}
          style={{ width: 300, height: 250, marginLeft: 10, marginTop: 50 }}
        />
      </View>
    </ScrollView>
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
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  form: {
    padding: 20,
    marginTop: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#0097f2",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
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
  forgotPassword: {
    color: "grey",
    marginTop: 20,
    textDecorationLine: "underline",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#0097f2",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginForm;
