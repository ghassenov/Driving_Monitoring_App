import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  center:{flex:1,justifyContent:'center',alignItems:'center'}
});
