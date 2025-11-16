import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/navigation/AuthContext";
import MainNavigator from "./src/navigation/index";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
