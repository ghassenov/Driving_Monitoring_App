import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  StatusBar
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1128" />
      
      {/* Background with gradient effect using multiple views */}
      <View style={styles.background}>
        <View style={styles.gradientTop} />
        <View style={styles.gradientMiddle} />
        <View style={styles.gradientBottom} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoIcon}>🚗</Text>
            </View>
          </View>
          <Text style={styles.title}>EcoDrive Assistant</Text>
          <Text style={styles.subtitle}>
            Monitor your driving habits, reduce emissions, and stay safe on the road
          </Text>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.featureEmoji}>📊</Text>
            </View>
            <Text style={styles.featureTitle}>Analytics</Text>
            <Text style={styles.featureDesc}>Track your driving patterns</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#2196F3' }]}>
              <Text style={styles.featureEmoji}>🌱</Text>
            </View>
            <Text style={styles.featureTitle}>Eco-Friendly</Text>
            <Text style={styles.featureDesc}>Reduce carbon footprint</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#FF9800' }]}>
              <Text style={styles.featureEmoji}>🛡️</Text>
            </View>
            <Text style={styles.featureTitle}>Safety</Text>
            <Text style={styles.featureDesc}>Monitor driving safety</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#9C27B0' }]}>
              <Text style={styles.featureEmoji}>⚡</Text>
            </View>
            <Text style={styles.featureTitle}>Efficiency</Text>
            <Text style={styles.featureDesc}>Optimize fuel usage</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Join thousands of eco-conscious drivers
          </Text>
        </View>
      </View>
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
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: '#1A237E',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  gradientMiddle: {
    position: 'absolute',
    top: height * 0.3,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: '#283593',
    borderRadius: 40,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: '#303F9F',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  logoContainer: {
    marginBottom: 25,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.3,
    maxWidth: 300,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 16,
  },
  actions: {
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonArrow: {
    marginLeft: 8,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
  },
});