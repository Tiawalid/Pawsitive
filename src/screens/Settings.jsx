import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const settingsOptions = [
  { icon: "lock-outline", label: "Access and permission", action: "Access" },
  { icon: "language", label: "Language settings", action: "language" },
  { icon: "shield-outline", label: "Data and privacy", action: "Privacy" },
  {
    icon: "assignment-turned-in",
    label: "Finished Orders",
    action: "finishedOrders",
  },
  { icon: "backup", label: "Backup and recovery options", action: "backup" },
  { icon: "headset-mic", label: "Customer Support", action: "Customersupport" },
  { icon: "logout", label: "Log out", action: "logout" },
];

const Settings = ({ logout }) => {
  const navigation = useNavigation();

  const handleOptionPress = async (action) => {
    if (action === "logout") {
      await SecureStore.deleteItemAsync("userToken");
      logout();
    } else {
      navigation.navigate(action);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" onPress={() => navigation.goBack()} />
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <View>
          <Icon name="notifications" color="red" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>10</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/images/Dogprofile.jpg")}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>My Profile</Text>
          <Text style={styles.profileEmail}>Pet@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => handleOptionPress(option.action)}
          >
            <Icon
              name={option.icon}
              size={24}
              color="#0097f2"
              style={styles.optionIcon}
            />
            <Text style={styles.optionLabel}>{option.label}</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ADD8E6",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    flex: 1,
    marginLeft: 16,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "red",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ADD8E6",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileDetails: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: "#0097f2",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  editProfileText: {
    color: "#0097f2",
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#ADD8E6",
    marginBottom: 1,
  },
  optionIcon: {
    marginRight: 20,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
  },
});

export default Settings;
