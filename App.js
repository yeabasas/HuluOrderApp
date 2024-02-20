import { useAuth } from "./app/context/AuthContext";
import { AuthProvider } from './AuthProvider'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import Harry from "./app/screens/Harry";
import Fight from "./app/screens/Fight";
import React, { useState } from "react";
import Order from "./app/screens/Order";
import Detail from "./app/screens/Detail";
import Cart from "./app/screens/Cart";
import { UserContext } from "./UserContext";
import { Provider } from "react-redux";
import store from "./store";
import StackNavigator from "./navigation/StackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
          <StackNavigator/>
    </AuthProvider>
  );
}

export function StackNavigation() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Fight"
            component={Fight}
            screenOptions={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Home"
            component={Home}
            screenOptions={{ headerShown: false }}
          ></Stack.Screen>
          {/* <Stack.Screen
          name="Harry"
          component={Harry}
          screenOptions={{ headerShown: false }}
        ></Stack.Screen> */}
          {/* <Stack.Screen
          name="Login"
          component={Login}
          screenOptions={{ headerShown: false }}
        ></Stack.Screen> */}
          <Stack.Screen
            name="Register"
            component={Register}
            screenOptions={{ headerShown: false }}
          ></Stack.Screen>
          {/* <Stack.Screen
          name="Order"
          component={Order}
          screenOptions={{ headerShown: false }}
        ></Stack.Screen> */}
          <Stack.Screen
            name="Detail"
            component={Detail}
            screenOptions={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Cart"
            component={Cart}
            screenOptions={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export const Layout = () => {
  const { authState } = useAuth();
  const [activeForm, setActiveForm] = useState("login");

  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            screenOptions={{ headerShown: false }}
          ></Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Fight"
              component={Fight}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Harry"
              component={Harry}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={Login}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Order"
              component={Order}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Detail"
              component={Detail}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Cart"
              component={Cart}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
