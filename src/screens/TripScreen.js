import React, { useState, useContext } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import useSensors from "../hooks/useSensors";
import { sendTripData } from "../services/tripService";
import { AuthContext } from "../navigation/AuthContext";

const { width, height } = Dimensions.get('window');

export default function TripScreen() {
  const [tripActive, setTripActive] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [score, setScore] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Move useSensors to the top level - remove the conditional inside
  const sensorCallbacks = {
    onAccel: (accel) => {
      if (tripActive) setSensorData(p => [...p, { ...accel, type: "accel" }]);
    },
    onGyro: (gyro) => {
      if (tripActive) setSensorData(p => [...p, { ...gyro, type: "gyro" }]);
    },
    onMag: (mag) => {
      if (tripActive) setSensorData(p => [...p, { ...mag, type: "mag" }]);
    }
  };

  // Call useSensors unconditionally at the top level
  useSensors(
    sensorCallbacks.onAccel,
    sensorCallbacks.onGyro,
    sensorCallbacks.onMag,
    tripActive // This can be passed as a parameter, but the hook call itself must be unconditional
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1128" />
      
      {/* Background */}
      <View style={styles.background}>
        <View style={styles.gradientOverlay} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📊</Text>
          </View>
          <Text style={styles.title}>Trip Monitor</Text>
          <Text style={styles.subtitle}>
            Track your driving behavior and get instant feedback
          </Text>
        </View>

        {/* Trip Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[
              styles.startButton,
              tripActive && styles.activeButton,
              tripActive && styles.disabledButton
            ]}
            onPress={startTrip}
            disabled={tripActive}
          >
            {tripActive ? (
              <View style={styles.buttonContent}>
                <Text style={styles.pulseDot}>●</Text>
                <Text style={styles.startButtonText}>Trip Running...</Text>
              </View>
            ) : (
              <Text style={styles.startButtonText}>Start Trip</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.stopButton,
              !tripActive && styles.disabledButton
            ]}
            onPress={stopTrip}
            disabled={!tripActive || loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.stopButtonText}>Stop & Analyze</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Results Section */}
        {score !== null && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Your Driving Score</Text>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreValue}>{score}</Text>
              <Text style={styles.scoreUnit}>/100</Text>
            </View>
            <Text style={styles.scoreFeedback}>
              {score >= 80 ? "Excellent driving! 🎉" : 
               score >= 60 ? "Good job! 👍" : 
               "Room for improvement 💪"}
            </Text>
          </View>
        )}

        {/* Events Section */}
        {events.length > 0 && (
          <View style={styles.eventsContainer}>
            <Text style={styles.eventsTitle}>Detected Events</Text>
            <View style={styles.eventsList}>
              {events.map((e, i) => (
                <View key={i} style={styles.eventItem}>
                  <Text style={styles.eventIcon}>⚠️</Text>
                  <Text style={styles.eventText}>{e}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Driving Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🚗</Text>
            <Text style={styles.tipText}>Maintain steady speed and avoid sudden acceleration</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🛑</Text>
            <Text style={styles.tipText}>Brake smoothly and anticipate stops</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⛽</Text>
            <Text style={styles.tipText}>Smooth driving can improve fuel efficiency by 30%</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A1128',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1A237E',
    opacity: 0.8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.3,
    maxWidth: 300,
  },
  controlsContainer: {
    gap: 16,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  activeButton: {
    backgroundColor: '#FF9800',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseDot: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  stopButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  scoreCircle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#4CAF50',
  },
  scoreUnit: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 4,
  },
  scoreFeedback: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  eventsContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  eventsList: {
    gap: 12,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,107,107,0.1)',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  eventIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  eventText: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },
  tipsContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
});