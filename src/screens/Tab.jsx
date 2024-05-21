import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Mycart from '../screens/Mycart';
import MyChip from "../screens/MyChip";
import Settings from '../screens/Settings';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Mycart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'MyChip':
              iconName = focused ? 'chip' : 'chip';
              break;
            case 'Settings':
              iconName = focused ? 'cog' : 'cog-outline'; 
              break;
            default:
              iconName = 'circle-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} type="material-community" />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Mycart" component={Mycart} options={{ headerShown: false }} />
      <Tab.Screen name="MyChip" component={MyChip} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default MyTabs;
