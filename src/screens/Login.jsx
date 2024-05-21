import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { useState } from "react";
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export const MyComponent = () => {
  const navigation = useNavigation();

  const _goBack = () => {
    
    navigation.goBack();
  };

  return (
    <Appbar.Header style={{ backgroundColor: "#ADD8E6" }}>
      <Appbar.BackAction onPress={_goBack} />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
    </Appbar.Header>
  );
};

const LoginForm = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submitted", username, password);
      navigation.navigate('Home');
      setUsername("");
      setPassword("");
      setErrors({});
    }
  };
  
  const goToForgotPassword = () => {
    navigation.push("Forgotpassword")
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
          value={username}
          onChangeText={setUsername}
        />
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <TouchableOpacity onPress={goToForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/images/doglogin.png")} style={{width: 300,height: 250,marginLeft: 10, marginTop: 50}} />
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
    alignItems: 'center',
    
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
    color: 'grey',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#0097f2',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginForm;
