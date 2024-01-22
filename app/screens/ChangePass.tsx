import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    general?: string;
    oldPassword?: string;
    password?: string;
    confirmPassword?: string;
    fetch?: string;
  }>({});

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `http://192.168.8.6:8000/users/${token}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.data.user) {
        throw new Error(
          response.data.message || "Failed to fetch user details"
        );
      }

      const data = response.data.user;
      setUserDetails(data.password);
    } catch (error) {
      console.error(error);
      setErrors({
        ...errors,
        fetch:
          error.message ||
          "Failed to fetch user details. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSubmit = () => {
    setErrors({})
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrors({
        ...errors,
        general: "Please make sure you filled all fields",
      });
    } else if (newPassword !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Please make sure your passwords match!",
      });
    } else if (newPassword === oldPassword) {
      setErrors({
        ...errors,
        password: "Please choose a different password than your old one",
      });
    } else {
      updateProfile();
    }
  };

  const updateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.put(
        `http://192.168.8.6:8000/updatePassword/${token}`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Password updated successfully
        Alert.alert("Success", "Password updated successfully!");
      } else {
        // Handle API response indicating failure to update password
        setErrors({
          ...errors,
          general: "Failed to update password. Please check your old password.",
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      setErrors({
        ...errors,
        general: "Failed to update password. Please try again later.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      {errors.fetch && <Text style={styles.error}>{errors.fetch}</Text>}
      {errors.general && <Text style={styles.error}>{errors.general}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        secureTextEntry={true}
        onChangeText={(text) => setOldPassword(text)}
      />
      {errors.oldPassword && (
        <Text style={styles.error}>{errors.oldPassword}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        onChangeText={(text) => setNewPassword(text)}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}
      <Button title="Update Profile" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
