import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

const Health = () => {
  const navigation = useNavigation();

  const data = [50, 10, 40, 95, 4, 24, 0, 85, 100, 80];
  const heartRate = 120;
  const temperature = 38;
  const activityLevel = "High";
  const hydrationLevel = "Good";

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Pet Health Monitoring" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Heart Rate</Text>
          <Text style={styles.value}>{heartRate} bpm</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Temperature</Text>
          <Text style={styles.value}>{temperature}°C</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Activity Level</Text>
          <Text style={styles.value}>{activityLevel}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Hydration Level</Text>
          <Text style={styles.value}>{hydrationLevel}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Heart Rate Over Time</Text>
          <LineChart
            style={{ height: 200 }}
            data={data}
            svg={{ stroke: "rgb(134, 65, 244)" }}
            contentInset={{ top: 20, bottom: 20 }}
            curve={shape.curveNatural}
          >
            <Grid />
          </LineChart>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#ADD8E6",
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
});

export default Health;
