import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input(props) {
  return <TextInput style={[styles.input, props.style]} {...props} />;
}

const styles = StyleSheet.create({
  input:{borderWidth:1,borderColor:'#ddd',padding:10,borderRadius:8}
});
