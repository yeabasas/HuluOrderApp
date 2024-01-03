import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { KeyboardAvoidingView } from "react-native";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onRegister } = useAuth();

  const register = async () => {
    const result = await onRegister(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      navigation.navigate("Login");
    }
  };
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://192.168.1.11:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error.response.data);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WELCOME TO</Text>
        <Text style={styles.title1}>HULU ORDER</Text>
        <Text style={styles.title2}>Where your desires meet convenience</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.main}>
          <Text style={styles.login}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text: string) => setName(text)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
          <Button color="#243b2e" onPress={handleRegister} title="Sign Up" />
          <View style={styles.lower}>
            <Text style={styles.register}>Already have account?</Text>
            <Text
              style={styles.registerNow}
              onPress={() => navigation.navigate("Login")}
            >
              Log In
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: hp(90),
    paddingTop: 20,
    backgroundColor: "#243b2e",
  },
  header: {
    height: hp(30),
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#243b2e",
  },
  main: {
    height: hp(70),
    alignItems: "center",
    borderCurve: "circular",
    borderTopStartRadius: 90,
    borderTopEndRadius: 90,
    paddingTop: 30,
    gap: 10,
    backgroundColor: "#fff",
  },
  input: {
    height: 44,
    width: wp(70),
    borderBottomWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  lower: {
    display: "flex",
    flexDirection: "row",
  },
  register: {
    fontSize: 12,
    color: "#96a58c",
  },
  registerNow: {
    fontSize: 14,
  },
  login: {
    fontSize: 25,
    fontWeight: "900",
  },
  title: {
    color: "#fff",
    marginTop: 20,
    fontSize: 30,
    fontWeight: "700",
  },
  title1: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
  title2: {
    color: "#fff",
    marginTop: 10,
  },
});
export default Register;
