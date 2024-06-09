import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const options = [
  { icon: "paw", label: "Pet Medical Records", detail: "200 KB" },
  {
    icon: "image",
    label: "Pet Photos & Videos",
    detail: "Synced with Pet Photos",
  },
  { icon: "chatbubbles", label: "Vet Appointments", detail: "5.4 KB" },
  { icon: "call", label: "Pet Care Calls", detail: "1.8 KB" },
  { icon: "settings", label: "Pet Device Settings", detail: "50 KB" },
  {
    icon: "cloud",
    label: "Pet Shop Orders",
    detail: "Synced with Pet Shop Account",
  },
];

const BackupScreen = () => {
  const navigation = useNavigation();
  const [isBackupEnabled, setIsBackupEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Backup</Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Backup by Pet Care One</Text>
        <Switch
          value={isBackupEnabled}
          onValueChange={() =>
            setIsBackupEnabled((previousState) => !previousState)
          }
        />
      </View>

      <Text style={styles.infoText}>
        Pawsitive backs up automatically over Wi-Fi after it's been idle and
        charging for 2 hours
      </Text>

      <Text style={styles.subTitle}>Backup details</Text>

      <FlatList
        data={options}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={styles.option}>
            <Ionicons
              name={item.icon}
              size={24}
              color="#000"
              style={styles.optionIcon}
            />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Text style={styles.optionDetail}>{item.detail}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.optionsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    padding: 16,
    paddingTop: 70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 140,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  switchText: {
    fontSize: 16,
  },
  backupButton: {
    backgroundColor: "#007BFF",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  backupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  optionsList: {
    paddingBottom: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionIcon: {
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionDetail: {
    fontSize: 14,
    color: "#666",
  },
});

export default BackupScreen;
