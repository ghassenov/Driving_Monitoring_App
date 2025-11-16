import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function EventPopup({ message, visible }) {
  if (!visible) return null;
  return (
    <Animated.View style={styles.popup}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    zIndex: 100,
  },
  text: { color: "white", fontWeight: "bold" },
});
