import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>EcoDrive Assistant</Text>
      <Text style={styles.subtitle}>Monitor driving. Reduce emissions. Stay safe.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  logo:{width:120,height:120,marginBottom:20, resizeMode:'contain'},
  title:{fontSize:28,fontWeight:'700'},
  subtitle:{color:'#666',textAlign:'center',marginVertical:12},
  button:{width:'80%',padding:14,borderRadius:10,backgroundColor:'#3E8EDE',marginTop:10},
  secondary:{width:'80%',padding:14,borderRadius:10,backgroundColor:'#222',marginTop:10},
  buttonText:{color:'#fff',textAlign:'center',fontWeight:'700'}
});
