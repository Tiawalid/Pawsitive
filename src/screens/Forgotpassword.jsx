import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Platform } from 'react-native';
import { Appbar } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native'; 


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (!email) {
      setError("Please enter your email address.");
    } else {
      sendVerificationEmail(email);
      setSuccessMessage("A password reset link has been sent to your email.");
    }
  };

  const sendVerificationEmail = (email) => {
    
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Appbar.BackAction />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>  
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Enter your email address</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#F5F5F5' }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

        <TouchableOpacity style={styles.submitButton} onPress={handleResetPassword}>
          <Text style={styles.submitButtonText}>Send Verification Email</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    backgroundColor: "#ADD8E6",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1, 
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 130,
    resizeMode: 'contain',
    marginRight: 50,
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
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
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
  successMessage: {
    color: "green",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#0097f2',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
