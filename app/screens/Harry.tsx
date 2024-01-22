import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Button,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../components/Header";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../UserContext";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Harry = () => {
  const [rowData, setRowData] = useState([]);
  const navigation: any = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(rowData);

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
      .get(`http://192.168.8.6:8000/itemss`)
      .then((items) => {
        setRowData(items.data);
      })
      .catch((err) => console.log(err));
  }, [filteredData]);

  const category = [
    { text: "Phone", icon: "", path: "" },
    { text: "Tablet", icon: "", path: "" },
    { text: "Electronics", icon: "", path: "" },
    { text: "", icon: "", path: "" },
    { text: "", icon: "", path: "" },
    { text: "", icon: "", path: "" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userId, setUserId } = useContext(UserType);

  // Save authentication status when the user logs in
  const loginUser = async () => {
    await AsyncStorage.setItem("authToken", "true");
  };

  // Clear authentication status when the user logs out
  const logoutUser = () => {
    setUserId(null);
    setIsLoggedIn(false);
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
    logoutUser();
    checkLoggedInStatus();
  };

  const [userEmail, setUserEmail] = useState();

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');
  //   if(userId){
  //           const response = await axios.get(
  //             `http://192.168.0.4:8000/users/${userId}`,
  //             { headers: { Authorization: `Bearer ${userId}` } }
  //           );
  //           const user = response.data.user;
  //           console.log('responseeee',response.data.user)
  //           setUserEmail(user.email);}
  //         } catch (error) {
  //           // Log or handle any errors that occur during the API request
  //           console.error("Error fetching user details:", error.response);
  //         }
  //   };

  //   fetchUserDetails();
  // }, [userId]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = rowData.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };
  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/hero.png")}
        resizeMode="cover"
      >
        <StatusBar style="light" />
        <View style={styles.header}>
          <View style={{ display: "flex", flexDirection: "row",marginBottom:10 }}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("../assets/lo.png")}
            />
            <Text style={styles.headerText}>HULU ORDER</Text>
          </View>
          <Pressable style={styles.searchInput}>
            <AntDesign
              style={{ paddingTop: 4, paddingRight: 5 }}
              name="search1"
              size={20}
              color="gray"
            />
            <TextInput
              placeholder="Search by name"
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={handleSearch}
            />
          </Pressable>
        </View>
      </ImageBackground>
      <View style={styles.container}>
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
            {searchQuery.length > 0
              ? filteredData.map((item) => (
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
                ))
              : rowData.map((item) => (
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
            <View style={{ width: wp(35), margin: 10 }} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
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
  searchInput: {
    width: wp(70),
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 10,
    display:'flex',
    flexDirection:'row',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  category: {
    backgroundColor: "#fff",
    height: 100,
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
    margin: 5,
    height: hp(10),
    width: wp(20),
    backgroundColor: "#C5DEA4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#243B2E",
    shadowColor: "#243B2E", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android-specific: controls the appearance of the shadow
    // Adjust as needed
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
    justifyContent: "center",
  },

  item: {
    flex: 1,
    width: wp(35),
    height: hp(25),
    // backgroundColor: "#fff",
    margin: 10,
    borderColor: "#243B2E",
    shadowColor: "#243B2E", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 4, // Shadow radius
    elevation: 2, // Android-specific: controls the appearance of the shadow
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#243b2e",
    marginLeft: 15,
  },
  itemBottom: {
    height: hp(8),
    backgroundColor: "#fff",
    borderCurve: "circular",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    zIndex: 7,
    paddingLeft: 10,
  },
  itemsImage: {
    flex:1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  header: {
    paddingTop:25,
    height: hp(20),
    alignItems: "center",
    shadowColor: "black",
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft:5,
  },
  Image: {
    resizeMode:'contain',
    height: 40,
    width: 40,
  },
});
export default Harry;
