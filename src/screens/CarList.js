import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  StatusBar
} from 'react-native';
import { AuthContext } from '../navigation/AuthContext';
import carService from '../services/carService';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('window');

export default function CarList({ navigation }) {
  const { user } = useContext(AuthContext); 
  const token = user?.token;
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCars = async () => {
    try {
      const data = await carService.getCars(token);
      setCars(data);
    } catch (err) {
      console.error("Failed to load cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadCars);
    return unsubscribe;
  }, [navigation]);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1128" />
      
      {/* Background */}
      <View style={styles.background}>
        <View style={styles.gradientOverlay} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚗</Text>
          </View>
          <Text style={styles.title}>Your Cars</Text>
          <Text style={styles.subtitle}>
            {cars.length === 0 
              ? "Add your first car to get started" 
              : `You have ${cars.length} car${cars.length === 1 ? '' : 's'} registered`
            }
          </Text>
        </View>
      </View>

      {/* Cars List */}
      <View style={styles.listContainer}>
        {cars.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🚙</Text>
            <Text style={styles.emptyTitle}>No Cars Yet</Text>
            <Text style={styles.emptyText}>
              Add your first car to start tracking your eco-driving performance
            </Text>
          </View>
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.card,
                  { borderLeftColor: getCarColor(index) }
                ]}
                onPress={() => navigation.navigate("CarDetails", { carId: item.id })}
              >
                <View style={styles.cardContent}>
                  <View style={styles.carIconContainer}>
                    <Text style={styles.carIcon}>🚗</Text>
                  </View>
                  <View style={styles.carInfo}>
                    <Text style={styles.carName}>{item.brand} {item.model}</Text>
                    <Text style={styles.carDetails}>
                      {item.year} • {item.fuel_type} • {item.engine_size || 'N/A'}L
                    </Text>
                  </View>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Add Car Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CarForm")}
        >
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Add New Car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Helper function for consistent card colors
const getCarColor = (index) => {
  const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63'];
  return colors[index % colors.length];
};

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
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  icon: {
    fontSize: 28,
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
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  carIcon: {
    fontSize: 20,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  carDetails: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
  },
  arrow: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  addButtonIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});