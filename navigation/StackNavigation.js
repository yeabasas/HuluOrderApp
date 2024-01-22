import React from "react";
import Register from "../app/screens/Register";
import Harry from "../app/screens/Harry";
import Login from "../app/screens/Login";
import Fight from "../app/screens/Fight";
import Detail from "../app/screens/Detail";
import Cart from "../app/screens/Cart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserContext } from "../UserContext";
import MessageScreen from "../app/screens/MessageScreen";
const Stack = createNativeStackNavigator();

export function StackNavigationq() {
  return (
    <UserContext>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Harry"
        component={Harry}
        screenOptions={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={Detail}
        screenOptions={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Fight"
        component={Fight}
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
    </Stack.Navigator>
    </UserContext>
  );
}

const StackNavigation = () => {
  return (
      <GestureHandlerRootView>
          <StackNavigationq />
      </GestureHandlerRootView>
  );
};

export default StackNavigation;
