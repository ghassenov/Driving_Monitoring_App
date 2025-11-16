import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style, disabled && styles.disabled]} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:{backgroundColor:'#3E8EDE',padding:12,borderRadius:8,alignItems:'center'},
  text:{color:'#fff',fontWeight:'700'},
  disabled:{opacity:0.6}
});
