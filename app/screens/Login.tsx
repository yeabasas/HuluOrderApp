import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login =  () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const navigation: any = useNavigation();
  const {onLogin,onRegister} = useAuth();

  const login = async () =>{
    const result = await onLogin!(email,password);
    if(result&&result.error){
      alert(result.msg)
    }
  }
  useEffect(() => {
    // const checkLoginStatus = async () => {
    //   try {
    //     const token = await AsyncStorage.getItem("authToken");
  
    //     if (token !== null && token !== "") {
    //       // User is already authenticated, replace the entire navigation stack with the home screen
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'Harry' }],
    //       });
    //     } else {
    //       console.log('Token is null or empty');
    //     }
    //   } catch (err) {
    //     console.log("Error checking login status:", err);
    //   }
    // };
  
    // checkLoginStatus();
    const testCall = async ()=>{
      const result = await axios.get('http://192.168.8.2:8000/users');
      console.log('testlogin',result)
    }
    testCall();
  }, []);

  const handleLogin = async () => {
    try {
      const user = { email:email, password:password };
      axios.post("http://192.168.8.2:8000/login", user)
.then((response)=>{
  const token = response.data.token;
  AsyncStorage.setItem("authToken",token);
  console.log("Token from login:", token);
  navigation.navigate("Harry");

})

    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Error", "Invalid Email or Password");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>WELCOME TO</Text>
          <Text style={styles.title1}>HULU ORDER</Text>
          <Text style={styles.title2}>Where your desires meet convenience</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.login}>Login</Text>
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
          <Button color="#243b2e" onPress={handleLogin} title="Sign in" />
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
export default Login;
