import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "./src/screens/Splash";
import Interfaces from './src/screens/Interfaces';
import LoginForm, { MyComponent } from "./src/screens/Login";
import SignUpForm from './src/screens/Signup';
import Forgotpassword from './src/screens/Forgotpassword';
import Home from './src/screens/Home';
import MyTabs from './src/screens/Tab';
import PetShops from './src/screens/PetShops';
import Vets from './src/screens/Vets';
import Chatbot from './src/screens/Chatbot';
import Vetsbooking from './src/screens/Vetsbooking.jsx';
import Productdetails from './src/screens/Productdetails';
import Mycart from './src/screens/Mycart';
import Checkout from './src/screens/Checkout';
import Debitcard from './src/screens/Debitcard';
import Orderplaced from './src/screens/Orderplaced';
import Settings from './src/screens/Settings';
import MyChip from './src/screens/MyChip'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }} >
        <Stack.Screen name="Interfaces" component={Interfaces} options={{ headerShown: false }} />
        <Stack.Screen name="Splash" component={Splash} options={{ header: ({ navigation, route }) => <MyComponent /> }} />
        <Stack.Screen name="Login" component={LoginForm} options={{ header: ({ navigation, route }) => <MyComponent /> }} />
        <Stack.Screen name="Signup" component={SignUpForm} options={{ headerShown: false }} />
        <Stack.Screen name="Forgotpassword" component={Forgotpassword} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="PetShops" component={PetShops} options={{ headerShown: false }} />
        <Stack.Screen name="Vets" component={Vets} options={{ headerShown: false }} />
        <Stack.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
        <Stack.Screen name="Vetsbooking" component={Vetsbooking} options={{ headerShown: false }} />
        <Stack.Screen name="Productdetails" component={Productdetails} options={{ headerShown: false }} />
        <Stack.Screen name="Mycart" component={Mycart} options={{ headerShown: false }} />
        <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        <Stack.Screen name="Debitcard" component={Debitcard} options={{ headerShown: false }} />
        <Stack.Screen name="Orderplaced" component={Orderplaced} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="MyChip" component={MyChip} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
