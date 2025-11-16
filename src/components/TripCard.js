import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TripCard({ trip }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Trip</Text>
      <Text>Score: {trip.score}</Text>
      <Text>Distance: {trip.distance ?? "n/a"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{padding:12,backgroundColor:'#fff',borderRadius:8,shadowColor:'#000',elevation:2, marginVertical:8},
  title:{fontWeight:'700'}
});
