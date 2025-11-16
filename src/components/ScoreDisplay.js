import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ScoreDisplay({ score }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Driver Score: {score.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 50, alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold" },
});
