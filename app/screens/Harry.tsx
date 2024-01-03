import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../components/Header";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetails } from "../utils/getUserDetails";
import { UserType } from "../../UserContext";
import { useContext } from "react";

const Harry = () => {
  const [rowData, setRowData] = useState([]);
  const navigation: any = useNavigation();
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  useEffect(() => {
    axios
      .get("http://192.168.8.2:8000/itemss")
      .then((items) => setRowData(items.data))
      .catch((err) => console.log(err));
  }, []);

  const category = [
    { text: "Phone", icon: "", path: "" },
    { text: "Tablet", icon: "", path: "" },
    { text: "Electronics", icon: "", path: "" },
    { text: "", icon: "", path: "" },
    { text: "", icon: "", path: "" },
    { text: "", icon: "", path: "" },
  ];
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Save authentication status when the user logs in
  const loginUser = async () => {
    await AsyncStorage.setItem("authToken", "true");
  };

  // Clear authentication status when the user logs out
  const logoutUser = async () => {
    await AsyncStorage.removeItem("authToken");
  };

  // Check if the user is logged in
  const checkLoggedIn = async () => {
    const store = await AsyncStorage.getItem("authToken");
    if (store) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    // Check authentication status when the component mounts
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    const token = await AsyncStorage.getItem("authToken");

    console.log("Token", token);
    const loggedIn = await checkLoggedIn();
    console.log("loggedin", isLoggedIn);
  };

  const handleLogout = async () => {
    console.log("logout");
    await logoutUser();
    checkLoggedInStatus();
  };
  // const filterItems = async () => {
  //   if () {
  //     return (
  //       <TouchableOpacity
  //         style={styles.floatingButton}
  //         onPress={() => logout()}
  //       >
  //         <Text style={styles.buttonText}>Logout</Text>
  //       </TouchableOpacity>
  //     );
  //   } else {
  //     return (
  //       <TouchableOpacity
  //         style={styles.floatingButton}
  //         onPress={() => navigation.navigate("Login")}
  //       >
  //         <Text style={styles.buttonText}>Login</Text>
  //       </TouchableOpacity>
  //     );
  //   }
  // };
  const checkLogin = async () => {
    const res = await AsyncStorage.getItem("authToken");
    return res;
  };

  const [userEmail, setUserEmail] = useState();

  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
    const token = await AsyncStorage.getItem('authToken');

        const response = await axios.get(
          `http://192.168.8.2:8000/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the authentication token if needed
            },
          }
        );

        const { user } = response.data;
        setUserEmail(user);
      } catch (error) {
        // Log or handle any errors that occur during the API request
        console.error("Error fetching user details:", error.response);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <View style={styles.category}>
          <ScrollView horizontal>
            {category.map((cat, i) => (
              <Pressable key={i} style={styles.categoryCon}>
                <View style={styles.categoryIcons}>
                  <Image source={require("../../assets/icon.svg")} />
                </View>
                <Text style={styles.categoryItemsText}>{cat.text}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <ScrollView>
          <View style={styles.container1}>
            <Text>adf{userEmail}</Text>
            {rowData?.map((item) => (
              <Pressable
                key={item._id}
                onPress={() =>
                  navigation.navigate(
                    "Detail",
                    {
                      id: item._id,
                      price: item.price,
                      name: item.name,
                      condition: item.condition,
                      storage: item.storage,
                      sim: item.sim,
                      ram: item.ram,
                      description: item.description,
                      color: item.color,
                      item: item,
                    },
                    {}
                  )
                }
              >
                <View style={styles.item}>
                  <Image
                    style={styles.itemsImage}
                    resizeMode="contain"
                    source={require("../assets/622166.jpg")}
                  />
                  <View style={styles.itemBottom}>
                    <Text style={{ ...styles.itemText, fontWeight: "900" }}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemText}>ETB {item.price}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      {isLoggedIn ? (
        <TouchableOpacity style={styles.floatingButton} onPress={handleLogout}>
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
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  category: {
    backgroundColor: "#f4fdf4",
    height: 120,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryCon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryIcons: {
    margin: 10,
    height: hp(10),
    width: wp(20),
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#243B2E",
    shadowColor: "#243B2E", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android-specific: controls the appearance of the shadow
    padding: 20, // Adjust as needed
  },
  categoryItemsText: {
    color: "#000",
    // fontSize: 16,
  },
  cards: {
    width: wp(50),
    backgroundColor: "#243b2e",
  },
  cardsText: {
    textAlign: "center",
  },
  container1: {
    marginHorizontal: "auto",
    width: wp(100),
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",
  },
  item: {
    flex: 1,
    width: wp(40),
    height: hp(30),
    // backgroundColor: "#fff",
    margin: 10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
    marginLeft: 15,
  },
  itemBottom: {
    height: hp(10),
    backgroundColor: "#243b2e",
    borderCurve: "circular",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    zIndex: 7,
  },
  itemsImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
});
export default Harry;
