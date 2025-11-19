import React, { useEffect, useState, useContext } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import { AuthContext } from "../navigation/AuthContext";
import carService from "../services/carService";

const { width, height } = Dimensions.get('window');

export default function CarDetails({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const { carId } = route.params;

  const [car, setCar] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [year, setYear] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");

  // All hooks called unconditionally at the top level
  useEffect(() => {
    loadCar();
  }, []);

  const loadCar = async () => {
    try {
      setLoading(true);
      const data = await carService.getCarById(carId, token);
      setCar(data);
      setYear(data.year ? data.year.toString() : "");
      setEngineSize(data.engine_size ? data.engine_size.toString() : "");
      setBrand(data.brand || "");
      setModel(data.model || "");
      setFuelType(data.fuel_type || "");
    } catch (error) {
      console.error("Error loading car:", error);
      Alert.alert("Error", "Failed to load car details");
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    if (!brand || !model) {
      Alert.alert("Error", "Brand and Model are required");
      return;
    }

    try {
      setSaving(true);
      await carService.updateCar(
        carId,
        { 
          brand, 
          model, 
          year: year ? parseInt(year) : null, 
          fuel_type: fuelType, 
          engine_size: engineSize ? parseFloat(engineSize) : null 
        },
        token
      );
      setEditing(false);
      await loadCar();
    } catch (error) {
      console.error("Error updating car:", error);
      Alert.alert("Error", "Failed to update car");
    } finally {
      setSaving(false);
    }
  };

  const deleteCar = async () => {
    Alert.alert(
      "Delete Car",
      "Are you sure you want to delete this car? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await carService.deleteCar(carId, token);
              navigation.goBack();
            } catch (error) {
              console.error("Error deleting car:", error);
              Alert.alert("Error", "Failed to delete car");
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  if (loading && !car) {
    return (
      <View style={[styles.container, styles.centered]}>
        <StatusBar barStyle="light-content" backgroundColor="#0A1128" />
        <View style={styles.background}>
          <View style={styles.gradientOverlay} />
        </View>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading car details...</Text>
      </View>
    );
  }

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
          <View style={styles.carIconContainer}>
            <Text style={styles.carIcon}>🚗</Text>
          </View>
          <Text style={styles.title}>
            {editing ? "Edit Car" : "Car Details"}
          </Text>
        </View>

        {!editing ? (
          /* View Mode */
          <View style={styles.detailsContainer}>
            <View style={styles.carInfoCard}>
              <Text style={styles.carName}>{car?.brand} {car?.model}</Text>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Year</Text>
                <Text style={styles.detailValue}>{car?.year || "Not specified"}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fuel Type</Text>
                <Text style={styles.detailValue}>{car?.fuel_type || "Not specified"}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Engine Size</Text>
                <Text style={styles.detailValue}>
                  {car?.engine_size ? `${car.engine_size}L` : "Not specified"}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setEditing(true)}
                disabled={loading}
              >
                <Text style={styles.editButtonText}>Edit Car</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={deleteCar}
                disabled={loading}
              >
                <Text style={styles.deleteButtonText}>Delete Car</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Edit Mode */
          <View style={styles.editContainer}>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Edit Car Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Brand</Text>
                <TextInput 
                  value={brand} 
                  onChangeText={setBrand} 
                  style={styles.input} 
                  placeholder="Enter brand"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Model</Text>
                <TextInput 
                  value={model} 
                  onChangeText={setModel} 
                  style={styles.input} 
                  placeholder="Enter model"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Year</Text>
                <TextInput 
                  value={year} 
                  onChangeText={setYear} 
                  style={styles.input} 
                  placeholder="Enter year"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Engine Size (L)</Text>
                <TextInput 
                  value={engineSize} 
                  onChangeText={setEngineSize} 
                  style={styles.input} 
                  placeholder="Enter engine size"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Fuel Type</Text>
                <View style={styles.fuelOptions}>
                  {["petrol", "diesel", "hybrid", "electric"].map((ft) => (
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
                        {ft}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Edit Action Buttons */}
              <View style={styles.editActions}>
                <TouchableOpacity 
                  style={[styles.saveButton, saving && styles.buttonDisabled]}
                  onPress={saveChanges}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.cancelButton, saving && styles.buttonDisabled]}
                  onPress={() => {
                    setEditing(false);
                    loadCar(); // Reset form
                  }}
                  disabled={saving}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 30,
  },
  carIconContainer: {
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
  carIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  carInfoCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  carName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  actionsContainer: {
    gap: 16,
  },
  editButton: {
    backgroundColor: '#2196F3',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  deleteButton: {
    backgroundColor: 'rgba(255,107,107,0.2)',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  editContainer: {
    flex: 1,
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
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
  },
  fuelOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
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
  editActions: {
    gap: 12,
    marginTop: 24,
  },
  saveButton: {
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
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
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
});