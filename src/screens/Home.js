import React, { useContext } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  StatusBar,
  ScrollView
} from "react-native";
import { AuthContext } from "../navigation/AuthContext";

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  const { user, logout, getDisplayName } = useContext(AuthContext);

  const menuItems = [
    {
      id: 1,
      title: "Start Trip",
      subtitle: "Begin your eco-driving journey",
      icon: "🚗",
      color: "#4CAF50",
      onPress: () => navigation.navigate("Trip")
    },
    {
      id: 2,
      title: "Driver Monitoring",
      subtitle: "Real-time fatigue & distraction detection",
      icon: "👁️",
      color: "#FF9800",
      onPress: () => navigation.navigate("DriverMonitoring")
    },
    {
      id: 3,
      title: "Driving Analytics",
      subtitle: "Track your driving score improvement",
      icon: "📊",
      color: "#2196F3",
      onPress: () => navigation.navigate("Analytics")
    },
    {
      id: 4,
      title: "Manage Cars",
      subtitle: "View and edit your vehicles",
      icon: "🔧",
      color: "#9C27B0",
      onPress: () => navigation.navigate("CarList")
    }
  ];

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
        {/* Header with Profile Button */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.welcomeSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "🚗"}
                </Text>
              </View>
              <View style={styles.welcomeText}>
                <Text style={styles.greeting}>Welcome back</Text>
                <Text style={styles.userName}>
                  {getDisplayName()}
                </Text>
              </View>
            </View>
            
            {/* Profile Button */}
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Ready for your next eco-friendly drive?
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Safety Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42L</Text>
            <Text style={styles.statLabel}>Fuel Saved</Text>
          </View>
        </View>

        {/* Main Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Quick Actions</Text>
          
          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuCard, { borderLeftColor: item.color }]}
                onPress={item.onPress}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}20` }]}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuCardTitle}>{item.title}</Text>
                  <Text style={styles.menuCardSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.menuArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Quick Tip */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            Regular breaks every 2 hours can reduce driver fatigue by 60%
          </Text>
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
    marginBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  profileIcon: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  menuGrid: {
    gap: 16,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  menuCardSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 16,
  },
  menuArrow: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,107,107,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,107,107,0.3)',
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,193,7,0.1)',
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});