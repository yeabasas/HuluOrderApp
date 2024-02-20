import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../app/screens/Home";
import Login from "../app/screens/Login";
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
import { UserContext, UserType } from "../UserContext";
import MessageScreen from "../app/screens/MessageScreen";
import PostsProfile from "../app/screens/PostsProfile";
import OrderProfile from "../app/screens/OrderProfile";
import ChangePass from "../app/screens/ChangePass";
import EditProfile from "../app/screens/EditProfile";
import OrderDetail from "../app/screens/OrderDetail";
import Categories from "../app/components/Categories";
import Brand from "../app/components/Brand";
import PostEdit from "../app/screens/PostEdit";
import DeletedPost from "../app/screens/DeletedPost";

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
    <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
      <Tab.Screen
        name="Home"
        component={StackNavigationq}
        unmountOnBlur={true}
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
        component={StackNavigationPost}
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
        name="MessageScreenF"
        component={StackNavigationMessage}
        unmountOnBlur={true}
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
        name="UserProfile"
        component={StackNavigationProfile}
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
    </Tab.Navigator>
  );
}

function StackNavigationMessage() {
  return (
    <UserContext>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          unmountOnBlur
          screenOptions={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Message"
          component={Message}
          unmountOnBlur
          screenOptions={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </UserContext>
  );
}

function StackNavigationProfile() {
  return (
    <UserContext>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Profile"
          component={Profile}
          unmountOnBlur
          screenOptions={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Posts"
          component={PostsProfile}
          unmountOnBlur
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="Orders"
          component={OrderProfile}
          unmountOnBlur
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="ChangePass"
          component={ChangePass}
          unmountOnBlur
          screenOptions={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          unmountOnBlur
          screenOptions={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          unmountOnBlur
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="PostEdit"
          component={PostEdit}
          unmountOnBlur
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="DeletedPost"
          component={DeletedPost}
          unmountOnBlur
          options={{ headerShown: true }}
        ></Stack.Screen>
      </Stack.Navigator>
    </UserContext>
  );
}

function StackNavigationPost(){
  return (
    <UserContext>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="AddItem"
          component={AddItems}
          unmountOnBlur
          screenOptions={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Categories"
          component={Categories}
          unmountOnBlur
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="Brand"
          component={Brand}
          unmountOnBlur
          options={{ headerShown: true }}
        ></Stack.Screen>
      </Stack.Navigator>
    </UserContext>
  );
}