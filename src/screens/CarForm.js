import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthContext';
import carService from '../services/carService';

export default function CarForm({ navigation }) {
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const [year, setYear] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("petrol");

  const saveCar = async () => {
    try {
      await carService.createCar(
        { brand, model, year, fuel_type: fuelType, engine_size: engineSize },
        token
      );
      navigation.goBack();
    } catch (err) {
      console.error("Failed to save car:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Car</Text>

      <TextInput
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
        style={styles.input}
      />

      <TextInput
        placeholder="Model"
        value={model}
        onChangeText={setModel}
        style={styles.input}
      />
      <TextInput
        placeholder="Year"
        value={year}
        onChangeText={setYear}
        style={styles.input}
      />
      <TextInput
        placeholder="Engine Size"
        value={engineSize}
        onChangeText={setEngineSize}
        style={styles.input}
      />

      <Text style={styles.label}>Fuel Type</Text>
      <View style={styles.fuelRow}>
        {["petrol", "diesel", "hybrid", "electric"].map((ft) => (
          <TouchableOpacity
            key={ft}
            style={[
              styles.fuelOption,
              fuelType === ft && styles.fuelOptionSelected
            ]}
            onPress={() => setFuelType(ft)}
          >
            <Text style={styles.fuelText}>{ft}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveCar}>
        <Text style={styles.saveText}>Save Car</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: { fontWeight: "bold", marginBottom: 8 },
  fuelRow: { flexDirection: "row", justifyContent: "space-between" },
  fuelOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: "23%",
    alignItems: "center"
  },
  fuelOptionSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff"
  },
  fuelText: { color: "black" },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    marginTop: 25
  },
  saveText: { color: "white", textAlign: "center", fontSize: 18 }
});
