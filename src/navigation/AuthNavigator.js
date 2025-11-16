import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "../screens/LandingPage";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up" }} />
    </Stack.Navigator>
  );
}
