import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../UserContext";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const navigation: any = useNavigation();
  const { onLogin, onRegister } = useAuth();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const login = async () => {
    const result = await onLogin!(phone, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const { userId, setUserId } = useContext(UserType);

  const handleLogin = async () => {
    try {
      const user = { phone: phone, password: password };

      const response = await axios.post(`${apiUrl}/login`, user);
      const token = response.data.token;
      setUserId(token);
      console.log(userId);
      AsyncStorage.setItem("authToken", token);
      console.log("Token from login:", token);
      navigation.navigate("Harry");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Error", "Invalid Phone or Password");
    }
  };

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>WELCOME TO</Text>
            <Text style={styles.title1}>HULU ORDER</Text>
            <Text style={styles.title2}>
              Where your desires meet convenience
            </Text>
          </View>
          <View style={styles.main}>
            <Text style={styles.login}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="phone"
              onChangeText={(text: string) => setPhone(text)}
              value={phone}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text: string) => setPassword(text)}
              value={password}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.btn}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.lower}>
              <Text style={styles.register}>Don't have account?</Text>
              <Text
                style={styles.registerNow}
                onPress={() => navigation.navigate("Register")}
              >
                Create now
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
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
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#243b2e",
    color: "#fff",
    fontSize: 13,
  },
});
export default Login;
