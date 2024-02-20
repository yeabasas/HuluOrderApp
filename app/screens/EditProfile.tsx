//import liraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

// create a component
const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const updateProfile = async () => {
    try{
    const token = await AsyncStorage.getItem("authToken");

    const response = await axios.put(
      `${apiUrl}/updateUser/${token}`,
      {
        firstName,
        lastName,
        phone
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.data.success) {
        // Password updated successfully
        setFirstName('');
        setLastName('');
        setPhone('');
        Alert.alert("Success", "User updated successfully!");
      } else {
        // Handle API response indicating failure to update password
        console.error('error');
        Alert.alert("Error", "something went error!");
       
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      
    }
  };
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile Screen</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
          onChangeText={(t) => setFirstName(t)}
          value={firstName}
          placeholder="First Name"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
          onChangeText={(t) => setLastName(t)}
          placeholder="Last Name"
          value={lastName}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
          onChangeText={(t) => setPhone(t)}
          placeholder="Phone"
          value={phone}
        />
        <Button title="Update Profile" onPress={() => updateProfile()} />
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

//make this component available to the app
export default EditProfile;
