import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { AuthContext } from "./AuthContext";

const RootStack = createStackNavigator();

export default function MainNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <RootStack.Screen name="App" component={AppNavigator} />
      )}
    </RootStack.Navigator>
  );
}
