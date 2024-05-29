import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

export const MyComponent = () => {
  const navigation = useNavigation();

  const _goBack = () => {
    
    navigation.goBack();
  };

  return (
    <Appbar.Header style={{ backgroundColor: "#ADD8E6" }}>
      <Appbar.BackAction onPress={_goBack} />
      
    </Appbar.Header>
  );
};

const SplashScreen = ({ navigation }) => {
  
  return (
    
    <View style={styles.container}>
      <View style={{
         justifyContent: 'center',
         alignItems: 'center',
      }}>

       <Text style={styles.text}>Unleash Your</Text>
      <Text style={styles.text}>Pet's Full</Text>
      <Text style={[styles.text, { marginBottom: 20 }]}>Potential</Text>
        
      </View>
      <View style={styles.imageContainer}>
     
        <Image source={require("../../assets/images/dog1.png")} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up"  onPress={() => navigation.navigate('Signup')} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
    gap:30
  },
  imageContainer: {
    // marginBottom: 20,
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: 'center',
  },
  text: {
    fontSize: 35,
    color: "#fff",
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    alignSelf:"center",
    width: '70%',
  },
});

export default SplashScreen;
