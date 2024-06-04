import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MyChip = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Chip</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MyChip;
