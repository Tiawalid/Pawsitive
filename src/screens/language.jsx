import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const settingsOptions = [
  { label: 'Region', value: 'Egypt' },
  
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [liveTextEnabled, setLiveTextEnabled] = React.useState(true);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" type="ionicon" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language & Region</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionHeader}>PREFERRED LANGUAGES</Text>
        <View style={styles.languageOption}>
          <Text style={styles.languageText}>English</Text>
        </View>
        <View style={styles.languageOption}>
          <Text style={styles.languageText}>العربية</Text>
          <Text style={styles.languageSubText}>Arabic</Text>
        </View>
        <TouchableOpacity style={styles.addLanguageButton}>
          <Text style={styles.addLanguageText}>Add Language...</Text>
        </TouchableOpacity>
        <Text style={styles.sectionSubHeader}>Apps and websites will use the first language in this list that they support.</Text>
        {settingsOptions.map((option, index) => (
          <View key={index} style={styles.option}>
            <Text style={styles.optionLabel}>{option.label}</Text>
            <Text style={styles.optionValue}>{option.value}</Text>
          </View>
        ))}
        <View style={styles.liveTextOption}>
          <Text style={styles.optionLabel}>Live Text</Text>
          <Switch
            value={liveTextEnabled}
            onValueChange={(value) => setLiveTextEnabled(value)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  editButtonText: {
    color: '#1E90FF',
    fontSize: 16,
  },
  scrollViewContent: {
    paddingVertical: 20,
    backgroundColor: '#1C1C1E',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#2C2C2E',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  languageText: {
    fontSize: 16,
    color: '#fff',
  },
  languageSubText: {
    fontSize: 12,
    color: '#999',
  },
  addLanguageButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#2C2C2E',
  },
  addLanguageText: {
    fontSize: 16,
    color: '#1E90FF',
  },
  sectionSubHeader: {
    paddingHorizontal: 16,
    fontSize: 12,
    color: '#999',
    marginVertical: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#2C2C2E',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  optionLabel: {
    fontSize: 16,
    color: '#fff',
  },
  optionValue: {
    fontSize: 16,
    color: '#999',
  },
  liveTextOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#2C2C2E',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});

export default SettingsScreen;
