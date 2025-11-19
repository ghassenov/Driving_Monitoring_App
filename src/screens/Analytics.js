import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  StatusBar,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Analytics({ navigation }) {
  // Mock data - in real app, this would come from your backend
  const drivingData = [
    { date: '2024-01-15', score: 82, trips: 3 },
    { date: '2024-01-14', score: 78, trips: 2 },
    { date: '2024-01-13', score: 85, trips: 4 },
    { date: '2024-01-12', score: 76, trips: 3 },
    { date: '2024-01-11', score: 88, trips: 5 },
  ];

  const overallStats = {
    averageScore: 82,
    totalTrips: 17,
    improvement: '+12%',
    fuelSaved: '42L',
    co2Reduced: '98kg'
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
            <Text style={styles.icon}>📊</Text>
          </View>
          <Text style={styles.title}>Driving Analytics</Text>
          <Text style={styles.subtitle}>
            Track your driving performance and improvement over time
          </Text>
        </View>

        {/* Overall Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Overall Performance</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{overallStats.averageScore}%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{overallStats.totalTrips}</Text>
              <Text style={styles.statLabel}>Total Trips</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, styles.positiveValue]}>{overallStats.improvement}</Text>
              <Text style={styles.statLabel}>Improvement</Text>
            </View>
          </View>
        </View>

        {/* Environmental Impact */}
        <View style={styles.environmentContainer}>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>
          <View style={styles.envStats}>
            <View style={styles.envStat}>
              <Text style={styles.envIcon}>⛽</Text>
              <View>
                <Text style={styles.envValue}>{overallStats.fuelSaved}</Text>
                <Text style={styles.envLabel}>Fuel Saved</Text>
              </View>
            </View>
            <View style={styles.envStat}>
              <Text style={styles.envIcon}>🌍</Text>
              <View>
                <Text style={styles.envValue}>{overallStats.co2Reduced}</Text>
                <Text style={styles.envLabel}>CO₂ Reduced</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.tripsContainer}>
          <Text style={styles.sectionTitle}>Recent Trips</Text>
          {drivingData.map((trip, index) => (
            <View key={index} style={styles.tripCard}>
              <View style={styles.tripInfo}>
                <Text style={styles.tripDate}>{trip.date}</Text>
                <Text style={styles.tripDetails}>{trip.trips} trips</Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[
                  styles.tripScore,
                  trip.score >= 80 ? styles.goodScore : 
                  trip.score >= 70 ? styles.averageScore : styles.poorScore
                ]}>
                  {trip.score}%
                </Text>
                <View style={[
                  styles.scoreBar,
                  { width: `${trip.score}%` },
                  trip.score >= 80 ? styles.goodBar : 
                  trip.score >= 70 ? styles.averageBar : styles.poorBar
                ]} />
              </View>
            </View>
          ))}
        </View>

        {/* Performance Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Improvement Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🚗</Text>
            <Text style={styles.tipText}>Smooth acceleration improves score by 15%</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🛑</Text>
            <Text style={styles.tipText}>Anticipate stops to reduce harsh braking</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⚡</Text>
            <Text style={styles.tipText}>Maintain consistent speed for better efficiency</Text>
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
  statsContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 16,
    alignItems: 'center',
  },
  statValue: { fontSize: 24, fontWeight: '800', color: '#4CAF50', marginBottom: 4 },
  positiveValue: { color: '#4CAF50' },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
  environmentContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 16,
  },
  envStats: { flexDirection: 'row', justifyContent: 'space-around' },
  envStat: { flexDirection: 'row', alignItems: 'center' },
  envIcon: { fontSize: 24, marginRight: 12 },
  envValue: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  envLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  tripsContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 20,
  },
  tripCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tripInfo: { flex: 1 },
  tripDate: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginBottom: 2 },
  tripDetails: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  scoreContainer: { alignItems: 'flex-end' },
  tripScore: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  goodScore: { color: '#4CAF50' },
  averageScore: { color: '#FF9800' },
  poorScore: { color: '#FF6B6B' },
  scoreBar: {
    height: 4, borderRadius: 2, maxWidth: 80,
  },
  goodBar: { backgroundColor: '#4CAF50' },
  averageBar: { backgroundColor: '#FF9800' },
  poorBar: { backgroundColor: '#FF6B6B' },
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