import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import TripScreen from "../screens/TripScreen";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import CarList from "../screens/CarList";
import CarForm from "../screens/CarForm";
import CarDetails from "../screens/CarDetails";


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Trip" component={TripScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CarList" component={CarList} />
      <Stack.Screen name="CarForm" component={CarForm} />
      <Stack.Screen name="CarDetails" component={CarDetails} />
    </Stack.Navigator>
  );
}
