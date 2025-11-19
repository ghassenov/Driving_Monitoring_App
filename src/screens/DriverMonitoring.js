import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  ScrollView,
  Animated
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function DriverMonitoring({ navigation }) {
  const [monitoring, setMonitoring] = useState(false);
  const [fatigueLevel, setFatigueLevel] = useState('Normal');
  const [distractionLevel, setDistractionLevel] = useState('Focused');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startMonitoring = () => {
    setMonitoring(true);
    // Simulate pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopMonitoring = () => {
    setMonitoring(false);
    pulseAnim.stopAnimation();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1128" />
      
      <View style={styles.background}>
        <View style={styles.gradientOverlay} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>👁️</Text>
          </View>
          <Text style={styles.title}>Driver Monitoring</Text>
          <Text style={styles.subtitle}>
            Real-time fatigue and distraction detection using AI
          </Text>
        </View>

        {/* Camera Preview Area */}
        <View style={styles.cameraContainer}>
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraText}>
              {monitoring ? '🔴 LIVE CAMERA FEED' : '📷 CAMERA PREVIEW'}
            </Text>
            <Text style={styles.cameraSubtext}>
              {monitoring ? 'AI is analyzing your driving behavior' : 'Start monitoring to begin analysis'}
            </Text>
            
            {monitoring && (
              <Animated.View 
                style={[
                  styles.pulseIndicator,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              >
                <Text style={styles.pulseText}>●</Text>
              </Animated.View>
            )}
          </View>
        </View>

        {/* Control Button */}
        <TouchableOpacity
          style={[
            styles.controlButton,
            monitoring ? styles.stopButton : styles.startButton
          ]}
          onPress={monitoring ? stopMonitoring : startMonitoring}
        >
          <Text style={styles.controlButtonText}>
            {monitoring ? '🛑 Stop Monitoring' : '▶️ Start Monitoring'}
          </Text>
        </TouchableOpacity>

        {/* Real-time Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.metricsTitle}>Real-time Analysis</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Fatigue Level</Text>
              <Text style={[
                styles.metricValue,
                fatigueLevel === 'High' && styles.warningValue
              ]}>
                {fatigueLevel}
              </Text>
              <Text style={styles.metricDescription}>
                Eye closure frequency
              </Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Distraction</Text>
              <Text style={[
                styles.metricValue,
                distractionLevel === 'High' && styles.warningValue
              ]}>
                {distractionLevel}
              </Text>
              <Text style={styles.metricDescription}>
                Head position & gaze
              </Text>
            </View>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Safety Recommendations</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💤</Text>
            <Text style={styles.tipText}>Take a break if you feel drowsy</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>👀</Text>
            <Text style={styles.tipText}>Keep your eyes on the road</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🚗</Text>
            <Text style={styles.tipText}>Maintain proper sitting posture</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1128' },
  background: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#0A1128',
  },
  gradientOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#1A237E', opacity: 0.8,
  },
  scrollContent: {
    flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40,
  },
  header: { alignItems: 'center', marginBottom: 30 },
  iconContainer: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center',
    marginBottom: 16, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)',
  },
  icon: { fontSize: 32 },
  title: {
    fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginBottom: 8,
    textAlign: 'center', letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center',
    lineHeight: 22, letterSpacing: 0.3, maxWidth: 300,
  },
  cameraContainer: { marginBottom: 24 },
  cameraPlaceholder: {
    height: 200, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed',
  },
  cameraText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  cameraSubtext: { fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
  pulseIndicator: { marginTop: 16 },
  pulseText: { fontSize: 24, color: '#FF6B6B' },
  controlButton: {
    borderRadius: 16, paddingVertical: 18, alignItems: 'center', marginBottom: 24,
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
  },
  startButton: { backgroundColor: '#4CAF50', shadowColor: '#4CAF50' },
  stopButton: { backgroundColor: '#FF6B6B', shadowColor: '#FF6B6B' },
  controlButtonText: {
    color: '#FFFFFF', fontSize: 18, fontWeight: '700', letterSpacing: 0.5,
  },
  metricsContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 24,
  },
  metricsTitle: {
    fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 16,
    textAlign: 'center',
  },
  metricsGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  metricCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 16,
    alignItems: 'center',
  },
  metricLabel: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  metricValue: { fontSize: 20, fontWeight: '800', color: '#4CAF50', marginBottom: 4 },
  warningValue: { color: '#FF6B6B' },
  metricDescription: { fontSize: 12, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
  tipsContainer: {
    backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: 20,
  },
  tipsTitle: {
    fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 16,
    textAlign: 'center',
  },
  tipItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tipIcon: { fontSize: 16, marginRight: 12, width: 24 },
  tipText: { flex: 1, fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 18 },
});