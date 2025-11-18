import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../navigation/AuthContext";
import carService from "../services/carService";

export default function CarDetails({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const { carId } = route.params;

  const [car, setCar] = useState(null);
  const [editing, setEditing] = useState(false);

  const [year, setYear] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");

  const loadCar = async () => {
    const data = await carService.getCarById(carId, token);
    setCar(data);
    setYear(data.year);
    setEngineSize(data.engine_size);
    setBrand(data.brand);
    setModel(data.model);
    setFuelType(data.fuel_type);
  };

  const saveChanges = async () => {
    await carService.updateCar(
      carId,
      { brand, model,year, fuel_type: fuelType, engine_size:engineSize },
      token
    );
    setEditing(false);
    loadCar();
  };

  const deleteCar = async () => {
    await carService.deleteCar(carId, token);
    navigation.goBack();
  };

  useEffect(() => {
    loadCar();
  }, []);

  if (!car) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {!editing ? (
        <>
          <Text style={styles.title}>{car.brand} {car.model}</Text>
          <Text style={styles.subtitle}>Year: {car.year}</Text> 
          <Text style={styles.subtitle}>Fuel Type: {car.fuel_type}</Text>
          <Text style={styles.subtitle}>Engine Size: {car.engine_size}</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={deleteCar}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput value={brand} onChangeText={setBrand} style={styles.input}  />
          <TextInput value={model} onChangeText={setModel} style={styles.input} />
          <TextInput value={year} onChangeText={setYear} style={styles.input}placeholder="Year" />
          <TextInput value={engineSize} onChangeText={setEngineSize} style={styles.input}placeholder="Engine Size" />


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

          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setEditing(false)}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },
  fuelRow: { flexDirection: "row", justifyContent: "space-between" },
  fuelOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: "23%",
    alignItems: "center"
  },
  fuelOptionSelected: { backgroundColor: "#007bff", borderColor: "#007bff" },
  fuelText: { color: "black" },
  editButton: { backgroundColor: "#007bff", padding: 15, borderRadius: 10 },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    marginTop: 15
  },
  saveButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 10 },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  btnText: { color: "white", textAlign: "center", fontSize: 18 }
});
