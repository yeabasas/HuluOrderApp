import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserType } from "../../UserContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import HeaderSimp from "../components/HeaderSimp";
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";

const Profile = () => {
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const reloadScreen = async () => {
    // Add any additional logic needed for the reload
    console.log("Reloading Profile screen...");
    await fetchUserDetails();
  };

  useEffect(() => {
    if (isFocused) {
      // Perform actions you want when the screen is focused.
      // This could be fetching data, re-rendering components, or any other refresh logic.
      reloadScreen();
    }
  }, [isFocused]);
  const logoutUser = () => {
    setUserId(null);
    setUser(null);
    setIsLoggedIn(false);
    reloadScreen();
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, [isLoggedIn]);

  const checkLoggedInStatus = async () => {
    if (userId != null) {
      console.log("loggedin", isLoggedIn);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    console.log("logout");
    setUserId(null);
    setUser(null);
    AsyncStorage.removeItem("authToken");
    setIsLoggedIn(false);
    reloadScreen();
  };

  const fetchUserDetails = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
  
      const response = await axios.get(`http://192.168.8.6:8000/users/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.error) {
        throw new Error(response.data.error);
      }
  
      setUser([response.data.user]);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      // handle error more gracefully, such as by displaying an error message to the user
    }
  }, []);
  
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeaderSimp />
      <Text
        style={{
          backgroundColor: "#243B2E",
          textAlign: "center",
          paddingBottom: 10,
          color: "white",
          fontSize: 20,
          fontWeight: "700",
        }}
      >
        Profile
      </Text>
      <View
        style={{
          marginTop: 20,
          height: 100,
          shadowColor: "#243B2E", // Shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
          shadowOpacity: 0.2, // Shadow opacity (0 to 1)
          shadowRadius: 4, // Shadow radius
          elevation: 5,
          borderWidth: 0.2,
          marginHorizontal: 10,
          width: wp(100),
          justifyContent:'center'
        }}
      >
        {user?.map((p, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              marginLeft: 20,
            }}
            key={index}
          >
            <Image
              source={require("../assets/blank-profile-picture.png")}
              style={{ height: hp(20), width: wp(20),marginRight:10 }}
              resizeMode="contain"
            />
            <View style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <Text style={{}}>{p.name}</Text>
              <Text>{p.email}</Text>
              {/* <Pressable onPress={() => console.log("touched")}>
                <Text
                  style={{
                    marginRight: 20,
                    padding: 5,
                    backgroundColor: "#243b2e",
                    alignSelf: "flex-end",
                    color: "#fff",
                    paddingHorizontal: 10,
                  }}
                >
                  Edit
                </Text>
              </Pressable> */}
            </View>
          </View>
        ))}
      </View>

      <View
        style={{
          marginTop: 20,
          height: 100,
          shadowColor: "#243B2E", // Shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
          shadowOpacity: 0.2, // Shadow opacity (0 to 1)
          shadowRadius: 4, // Shadow radius
          elevation: 5,
          borderWidth: 0.2,
          marginHorizontal: 10,
          width: "50%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 20,
            marginVertical: 10,
            // borderWidth:1,
          }}
          onPress={()=>navigation.navigate('PostsProfile')}
        >
          <MaterialCommunityIcons name="post-outline" size={24} color="black" />
          <Text style={{ alignSelf: "center", justifyContent: "center",marginLeft:2 }}>
            My Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 20,
            marginVertical: 10,
          }}
          onPress={()=>navigation.navigate('OrderProfile')}
        >
          <MaterialIcons name="bookmark-border" size={24} color="black" />
          <Text style={{ alignSelf: "center", justifyContent: "center",marginLeft:2 }}>
            My Orders
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 20,
          height: 100,
          shadowColor: "#243B2E", // Shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
          shadowOpacity: 0.2, // Shadow opacity (0 to 1)
          shadowRadius: 4, // Shadow radius
          elevation: 5,
          borderWidth: 0.2,
          marginHorizontal: 10,
          width: "50%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 20,
            marginVertical: 10,
            // borderWidth:1,
          }}
        >
          <AntDesign name="edit" size={24} color="black" />
          <Text style={{ alignSelf: "center", justifyContent: "center",marginLeft:2 }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 20,
            marginVertical: 10,
          }}
          onPress={()=>navigation.navigate('ChangePass')}
        >
          {/* <MaterialIcons name="password" size={24} color="black" /> */}
          <MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />
          <Text style={{ alignSelf: "center", justifyContent: "center",marginLeft:2 }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity></TouchableOpacity>
        {user ? (
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
        {/* <Button color="#243b2e" onPress={() => onLogout()} title="Sign Out" /> */}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "red",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#243B2E",
    borderRadius: 50,
    padding: 15,
    elevation: 5, // for Android shadow
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Profile;
