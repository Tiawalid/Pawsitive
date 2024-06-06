import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const settingsOptions = [
  { icon: 'mic', label: 'Microphone', type: 'ionicon', toggle: true },
  { icon: 'camera', label: 'Camera', type: 'ionicon', toggle: true },
  { icon: 'notifications', label: 'Notifications', type: 'ionicon', navigate: true },
  { icon: 'refresh', label: 'Background App Refresh', type: 'material', toggle: true },
  { icon: 'cellular', label: 'Use Cellular Data', type: 'ionicon', toggle: true },
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [switchStates, setSwitchStates] = useState({
    Microphone: true,
    Camera: true,
    'Background App Refresh': true,
    'Use Cellular Data': true,
  });

  const handleToggle = (label) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" type="ionicon" size={24} />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionHeader}>ALLOW PAWSITIVE TO ACCESS</Text>
        {settingsOptions.map((option, index) => (
          <View key={index} style={styles.option}>
            <Icon
              name={option.icon}
              type={option.type}
              size={24}
              color="#000"
              style={styles.optionIcon}
            />
            <Text style={styles.optionLabel}>{option.label}</Text>
            {option.toggle ? (
              <Switch
                value={switchStates[option.label]}
                onValueChange={() => handleToggle(option.label)}
              />
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate(option.label)}
                style={styles.chevronContainer}
              >
                <Icon name="chevron-right" type="material" size={24} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#ADD8E6",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 16,
  },
  logo: {
    width: 110,
    height: 100,
    resizeMode: 'contain',
    flex: 1,
    marginTop: 20,

  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  sectionHeader: {
    padding: 16,
    fontSize: 14,
    color: '#666',
    backgroundColor:"#ADD8E6",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#ADD8E6",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionIcon: {
    marginRight: 16,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
  },
  chevronContainer: {
    padding: 8,
  },
});

export default SettingsScreen;
