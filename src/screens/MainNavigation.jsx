import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import PetShops from '../screens/PetShops';
import Productdetails from './Productdetails';
import MyTabs from './Tab';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="PetShops" component={PetShops} />
        <Stack.Screen name="Productdetails" component={Productdetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
