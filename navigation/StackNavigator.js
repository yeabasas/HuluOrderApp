import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../app/screens/Home";
import Login from "../app/screens/Login";
import Register from "../app/screens/Register";
import Harry from "../app/screens/Harry";
import Fight from "../app/screens/Fight";
import Order from "../app/screens/Order";
import Detail from "../app/screens/Detail";
import Cart from "../app/screens/Cart";
import CartScreen from "../app/screens/CartScreen";
import Profile from "../app/screens/Profile";
import Message from "../app/screens/Message";
import {
  Entypo,
  AntDesign,
  Foundation,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AddItems from "../app/screens/AddItems";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigation, { StackNavigationq } from "./StackNavigation";
import { UserContext } from "../UserContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  return (
    <UserContext>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </UserContext>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackNavigationq}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#243B2E" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={30} color="#243B2E" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: "Order",
          headerShown: false,
          tabBarLabelStyle: { color: "#243B2E" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Foundation name="upload" size={30} color="#243B2E" />
            ) : (
              <Feather name="upload" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="AddItems"
        component={AddItems}
        options={{
          tabBarLabel: "Post",
          tabBarLabelStyle: { color: "#243B2E" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="plussquare" size={30} color="#243B2E" />
            ) : (
              <AntDesign name="plussquareo" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarLabel: "Message",
          tabBarLabelStyle: { color: "#243B2E" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="message-text"
                size={30}
                color="#243B2E"
              />
            ) : (
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color="black"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#243B2E" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={30} color="#243B2E" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: "Login",
          tabBarLabelStyle: { color: "#243B2E" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={30} color="#243B2E" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigationz() {
  return (
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
        name="CartScreen"
        component={CartScreen}
        screenOptions={{ headerShown: false }}
      ></Stack.Screen>
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
  );
}
