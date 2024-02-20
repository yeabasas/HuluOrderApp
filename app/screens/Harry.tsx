import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

const Harry = () => {
  const [rowData, setRowData] = useState([]);
  const navigation: any = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState("");
  const [conLost, setConLost] = useState(false);
  const [filteredData, setFilteredData] = useState(rowData);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
    setTimeout(() => {
      setConLost(true);
      setLoading(false);
      setRefreshing(false);
    }, 10000);
  }, [filteredData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/items`);
      setRowData(response.data);
      setLoading(false);
      setRefreshing(false); // Stop refreshing
    } catch (error) {
      console.log(error);
      setLoading(false);
      setRefreshing(false); // Stop refreshing even if there's an error
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
      setTimeout(() => {
        setConLost(true);
        setLoading(false);
        setRefreshing(false);
      }, 10000);
    }, [filteredData, loading]) // Include dependencies
  );
  const category = [
    { text: "Phone", icon: require("../assets/phone.png"), path: "" },
    { text: "Tablet", icon: require("../assets/Asset.png"), path: "" },
    { text: "Electronics", icon: require("../assets/Asset.png"), path: "" },
  ];

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = rowData.filter((item) =>
      item.ItemName.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };
  const handleCategory = (text: string) => {
    const query = text.toLowerCase();
    const filtered = rowData.filter((item) =>
      item.Category.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };
  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
    fetchData();
  };
  const handleView = async (item: {
    ID: any;
    userId: any;
    View: any;
    Price: any;
    Name: any;
    Condition: any;
    Storage: any;
    Sim: any;
    Ram: any;
    Description: any;
    Color: any;
  }) => {
    const postId = item?.ID;
    try{
    const response = await axios.put(`${apiUrl}/updateView/${postId}`, {
      view: item?.View,
    })
    if (response.data.success){

    navigation.navigate(
      "Detail",
      {
        itemId: item.ID,
        userId: item.userId,
        price: item.Price,
        name: item.Name,
        condition: item.Condition,
        storage: item.Storage,
        sim: item.Sim,
        ram: item.Ram,
        description: item.Description,
        color: item.Color,
        view: item.View,
        item: item,
      },
      {}
      );
    }
  } catch (error) {
    // Handle error, log or show an alert
    console.error("Error updating view:", error);
  }
  };
  return (
    <GestureHandlerRootView>
      <ImageBackground
        source={require("../assets/hero.png")}
        resizeMode="cover"
      >
        <StatusBar style="light" />
        <View style={styles.header}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
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
              style={{ width: wp(70) }}
              placeholder="Search by name"
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={handleSearch}
            />
          </Pressable>
        </View>
      </ImageBackground>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.category}>
            <ScrollView horizontal>
              {category.map((cat, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.categoryCon}
                  onPress={() => {
                    handleCategory(cat.text);
                  }}
                >
                  <View style={styles.categoryIcons}>
                    <Image
                      source={cat.icon}
                      style={styles.Image}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.categoryItemsText}>{cat.text}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {loading ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#243b2e"
            />
          ) : (
            <View style={styles.container1}>
              {searchQuery.length > 0
                ? filteredData.map((item) => (
                    <Pressable key={item.ID} onPress={() => handleView(item)}>
                      <View style={styles.item}>
                        <Image
                          style={styles.itemsImage}
                          resizeMode="cover"
                          source={require("../assets/622166.jpg")}
                        />
                        <View style={styles.itemBottom}>
                          <Text
                            style={{ ...styles.itemText, fontWeight: "900" }}
                          >
                            {item.ItemName}
                          </Text>
                          <Text style={styles.itemText}>ETB {item.Price}</Text>
                        </View>
                      </View>
                    </Pressable>
                  ))
                : rowData.map((item) => (
                    <Pressable
                      key={item.ID}
                      onPress={() =>handleView(item)
                         
                      }
                    >
                      <View style={styles.item}>
                        <Image
                          style={styles.itemsImage}
                          resizeMode="cover"
                          source={require("../assets/622166.jpg")}
                        />
                        <View style={styles.itemBottom}>
                          <Text
                            style={{ ...styles.itemText, fontWeight: "900" }}
                          >
                            {item.ItemName}
                          </Text>
                          <Text style={styles.itemText}>ETB {item.Price}</Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                      <View style={styles.itemL}>
                      </View>
            </View>
          )}
          {conLost ? (
            <View style={styles.badCon}>
              <MaterialIcons
                name="signal-wifi-off"
                size={24}
                color="black"
                style={{ alignSelf: "center" }}
              />
              <Text>Please check your connection</Text>
            </View>
          ) : (
            ""
          )}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
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
    display: "flex",
    flexDirection: "row",
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
    marginBottom: 70,
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
  itemL:{
    width: wp(35),
    height: hp(25),
    // backgroundColor: "#fff",
    margin: 10,
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
    zIndex: 7,
    paddingLeft: 10,
  },
  itemsImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  header: {
    paddingTop: 25,
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
    marginLeft: 5,
  },
  Image: {
    resizeMode: "contain",
    height: 40,
    width: 40,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  badCon: {
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});
export default Harry;
