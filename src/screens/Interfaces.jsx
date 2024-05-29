import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'galio-framework';
import { Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const InterfacesPage = () => {
  const navigation = useNavigation();

  const navigateToSplashScreen = () => {
    navigation.navigate('Splash');

  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Title style={styles.title}>Who are you?</Title>
      <Button color='#0097f2' style={styles.button} onPress={navigateToSplashScreen}>PET OWNER</Button>
      <Button color='#0097f2' style={styles.button} onPress={navigateToSplashScreen}>PET SHOP</Button>
      <Button color='#0097f2' style={styles.button} onPress={navigateToSplashScreen}>PET VET</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  button: {
    width: 200,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 40,
  },
});

export default InterfacesPage;
