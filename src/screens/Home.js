import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../navigation/AuthContext";

export default function Home({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome{user?.email ? `, ${user.email}` : ""}!</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Trip")}>
        <Text style={styles.btnText}>Start Trip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.btnText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={logout}>
        <Text style={{color:'#fff'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:24,fontWeight:'700',marginBottom:20},
  btn:{backgroundColor:'#3E8EDE',padding:14,borderRadius:8,width:'80%',alignItems:'center',marginVertical:8},
  btnText:{color:'#fff',fontWeight:'700'},
  btnSecondary:{backgroundColor:'#333',padding:14,borderRadius:8,width:'80%',alignItems:'center',marginTop:20}
});
