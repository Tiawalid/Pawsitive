import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const MyStatistics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Statistics</Text>
      <Text style={styles.incomeText}>Yearly Income</Text>
      <Text style={styles.incomeAmount}>181,447 EGP</Text>
      <Text style={styles.dateRange}>May 2022 - May 2023</Text>

      <View style={styles.timeFilter}>
        <Text style={styles.timeFilterText}>D</Text>
        <Text style={styles.timeFilterText}>W</Text>
        <Text style={styles.timeFilterText}>M</Text>
        <Text style={[styles.timeFilterText, styles.selectedTimeFilter]}>
          Y
        </Text>
      </View>

      <LineChart
        data={{
          labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          datasets: [
            {
              data: [65, 59, 80, 81, 56, 55, 40, 70, 65, 75, 68, 70],
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 32} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=" EGP"
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#007aff",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  incomeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  incomeAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dateRange: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  timeFilter: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
  },
  timeFilterText: {
    fontSize: 16,
    color: "#000",
  },
  selectedTimeFilter: {
    fontWeight: "bold",
    color: "#007aff",
  },
  continueButton: {
    backgroundColor: "#00bcd4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyStatistics;
