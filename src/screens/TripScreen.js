import React, { useState, useContext } from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import useSensors from "../hooks/useSensors";
import { sendTripData } from "../services/tripService";
import { AuthContext } from "../navigation/AuthContext";


export default function TripScreen() {
  const [tripActive, setTripActive] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [score, setScore] = useState(null);
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);


  useSensors(
    (accel) => { if (tripActive) setSensorData(p => [...p, { ...accel, type: "accel" }]); },
    (gyro) =>  { if (tripActive) setSensorData(p => [...p, { ...gyro, type: "gyro" }]); },
    (mag) =>   { if (tripActive) setSensorData(p => [...p, { ...mag, type: "mag" }]); },
    tripActive
  );

  const buildTripData = (sensorData) => ({
    sensors: sensorData.map(s => ({
      acc_x: s.type === "accel" ? s.x : 0,
      acc_y: s.type === "accel" ? s.y : 0,
      acc_z: s.type === "accel" ? s.z : 0,
      gyro_x: s.type === "gyro" ? s.x : 0,
      gyro_y: s.type === "gyro" ? s.y : 0,
      gyro_z: s.type === "gyro" ? s.z : 0,
      mag_x: s.type === "mag" ? s.x : 0,
      mag_y: s.type === "mag" ? s.y : 0,
      mag_z: s.type === "mag" ? s.z : 0,
    }))
  });

  const startTrip = () => {
    setSensorData([]);
    setScore(null);
    setEvents([]);
    setTripActive(true);
  };

  const stopTrip = async () => {
    setTripActive(false);
    const copy = [...sensorData];
    setSensorData([]);

    const tripData = buildTripData(copy);

    try {
      const token = user?.token;
      const res = await sendTripData(tripData, token);
      if (res?.data) {
        const payload = res.data;
        setScore(payload.score ?? 0);
        setEvents(payload.events ?? []);
      } else {
        alert("Server returned unexpected response");
      }
    } catch (err) {
      console.error("sendTripData error", err);
      alert("Failed to send trip to server");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Trip Monitor</Text>

      <View style={{width:'100%', marginVertical:10}}>
        <Button title={tripActive ? "Trip Running..." : "Start Trip"} onPress={startTrip} disabled={tripActive} />
      </View>

      <View style={{width:'100%', marginVertical:10}}>
        <Button title="Stop & Get Score" onPress={stopTrip} disabled={!tripActive} />
      </View>

      {score !== null && <Text style={styles.score}>Driver Score: {score}</Text>}

      {events.length > 0 && (
        <View style={styles.events}>
          <Text style={styles.eventsTitle}>Detected Events</Text>
          {events.map((e, i) => <Text key={i} style={styles.eventItem}>• {e}</Text>)}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flexGrow:1,justifyContent:'flex-start',alignItems:'center',padding:20},
  title:{fontSize:22,fontWeight:'700',marginVertical:10},
  score:{fontSize:20,fontWeight:'700',marginTop:20},
  events:{marginTop:20,width:'100%'},
  eventsTitle:{fontSize:18,fontWeight:'700',marginBottom:8},
  eventItem:{fontSize:16,color:'red',marginVertical:3}
});
