import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { AuthContext } from '../navigation/AuthContext';
import carService from '../services/carService';

const { width, height } = Dimensions.get('window');

export default function CarForm({ navigation }) {
  // All hooks called unconditionally at the top level
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const [year, setYear] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("petrol");
  const [loading, setLoading] = useState(false);

  const saveCar = async () => {
    if (!brand.trim() || !model.trim()) {
      Alert.alert("Error", "Brand and Model are required fields");
      return;
    }

    if (year && isNaN(year)) {
      Alert.alert("Error", "Year must be a valid number");
      return;
    }

    if (engineSize && isNaN(engineSize)) {
      Alert.alert("Error", "Engine size must be a valid number");
      return;
    }

    try {
      setLoading(true);
      await carService.createCar(
        { 
          brand: brand.trim(), 
          model: model.trim(), 
          year: year ? parseInt(year) : null, 
          fuel_type: fuelType, 
          engine_size: engineSize ? parseFloat(engineSize) : null 
        },
        token
      );
      navigation.goBack();
    } catch (err) {
      console.error("Failed to save car:", err);
      Alert.alert("Error", "Failed to save car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fuel type options - defined outside of render to avoid recreation
  const fuelTypes = ["petrol", "diesel", "hybrid", "electric"];

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
            <Text style={styles.icon}>🚗</Text>
          </View>
          <Text style={styles.title}>Add New Car</Text>
          <Text style={styles.subtitle}>
            Register your vehicle to start tracking eco-driving performance
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Brand *</Text>
            <TextInput
              placeholder="e.g., Toyota, Honda, BMW"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={brand}
              onChangeText={setBrand}
              style={styles.input}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Model *</Text>
            <TextInput
              placeholder="e.g., Camry, Civic, X5"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={model}
              onChangeText={setModel}
              style={styles.input}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Year</Text>
            <TextInput
              placeholder="e.g., 2020"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={year}
              onChangeText={setYear}
              style={styles.input}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Engine Size (L)</Text>
            <TextInput
              placeholder="e.g., 2.0, 1.6, 3.5"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={engineSize}
              onChangeText={setEngineSize}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>

          {/* Fuel Type Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fuel Type</Text>
            <View style={styles.fuelOptions}>
              {fuelTypes.map((ft) => (
                <TouchableOpacity
                  key={ft}
                  style={[
                    styles.fuelOption,
                    fuelType === ft && styles.fuelOptionSelected
                  ]}
                  onPress={() => setFuelType(ft)}
                >
                  <Text style={[
                    styles.fuelText,
                    fuelType === ft && styles.fuelTextSelected
                  ]}>
                    {ft.charAt(0).toUpperCase() + ft.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Required Fields Note */}
          <View style={styles.requiredNote}>
            <Text style={styles.requiredText}>* Required fields</Text>
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={[styles.saveButton, loading && styles.buttonDisabled]}
            onPress={saveCar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.saveButtonText}>Save Car</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity 
            style={[styles.cancelButton, loading && styles.buttonDisabled]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Why add your car?</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📊</Text>
            <Text style={styles.tipText}>Track driving analytics specific to your vehicle</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🌱</Text>
            <Text style={styles.tipText}>Get personalized eco-driving recommendations</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💰</Text>
            <Text style={styles.tipText}>Monitor fuel efficiency and cost savings</Text>
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
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  fuelOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  fuelOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  fuelOptionSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  fuelText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  fuelTextSelected: {
    color: '#FFFFFF',
  },
  requiredNote: {
    marginTop: -10,
    marginBottom: 20,
  },
  requiredText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
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
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  tipsContainer: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    padding: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
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