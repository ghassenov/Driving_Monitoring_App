// src/screens/CarList.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthContext';
import carService from '../services/carService';
import Loading from '../components/Loading';

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
      <Text style={styles.title}>Your Cars</Text>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("CarDetails", { carId: item.id })}
          >
            <Text style={styles.carName}>{item.brand} {item.model}</Text>
            <Text style={styles.secondary}>{item.fuel_type}</Text>
            <Text style={styles.secondary}>{item.year}</Text>
            <Text style={styles.secondary}>{item.engine_size}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CarForm")}
      >
        <Text style={styles.addButtonText}>+ Add Car</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  carName: { fontSize: 18, fontWeight: "600" },
  secondary: { color: "gray" },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },
  addButtonText: { color: "white", fontSize: 18 }
});
