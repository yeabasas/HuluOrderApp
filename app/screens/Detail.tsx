import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import HeaderSimp from "../components/HeaderSimp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import { ToastAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";
const { width } = Dimensions.get("window");
import Swiper from "react-native-swiper";

const Detail = () => {
  const [user, setUser] = useState([]);
  const [userPhone, setUserPhone] = useState(false);
  const route = useRoute();
  const navigation: any = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [contact, setContact] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const PhoneNumber = user.map((item) => item.Phone).join(", ");
  const postId = route?.params["itemId"];
  const [rowData, setRowData] = useState([]);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`${apiUrl}/itemsPostDetail/${postId}`);
      setRowData(response.data);
      console.log(rowData);
    } catch (error) {
      console.log(error); // Stop refreshing even if there's an error
    }
  };
  const copyText = (text: string) => {
    Clipboard.setStringAsync(text);
    ToastAndroid.show(`Phone number Copied ${PhoneNumber}`, ToastAndroid.LONG);
  };
  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `${apiUrl}/contactDetail/${token}/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setContact(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      setLoading(false);
      setRefreshing(false);
    }
  }, [setContact, setLoading, setRefreshing]);

  useFocusEffect(
    useCallback(() => {
      fetchImage();
      fetchData();
    }, [fetchData, loading]) // Include dependencies
  );

  const fetchUserDetails = useCallback(async () => {
    try {
      const token = route?.params["userId"];
      const response = await axios.get(`${apiUrl}/usersPhone/${token}`);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setUser(response.data.user[0]);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      // handle error more gracefully, such as by displaying an error message to the user
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const showPhone = () => {
    if (userPhone == true) setUserPhone(false);
    else setUserPhone(true);
  };
  const itemId = route?.params["itemId"];
  const userId = route?.params["userId"];
  const contactId = contact.map((text) => text.contactId).toString();

  return (
    <GestureHandlerRootView>
      <StatusBar style="inverted" />
      <ScrollView>
        <HeaderSimp />
        <View style={styles.itemNameCon}>
          <Text style={styles.itemName}>{route?.params["name"]}</Text>
        </View>
        <View style={styles.ImageCon}>
          {/* {rowData.map((item) => (
            <FlatList
            data={rowData}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            renderItem={({ item }) => (
              <>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: `${apiUrl}/images/${item.image_filename}` }}
                  onError={(error) =>
                    console.error("Image loading error:", error)
                  }
                />
                <Text>{"No Image"}</Text>
              </>
              )}
            /> */}
            <Swiper style={styles.wrapper} showsButtons={true} loop={false}>
              {rowData.map((item, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={{ uri: `${apiUrl}/images/${item.image_filename}` }} style={styles.image} />
                </View>
              ))}
            </Swiper>
          
          
        </View>
        <View style={styles.detail}>
          <View style={styles.detailHead}>
            <View>
              <Text style={{ ...styles.price, marginTop: hp("5%") }}>
                ETB {route?.params["price"]}
              </Text>
              <Text style={styles.view}>{route?.params["view"]} views</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MessageScreen", {
                    screen: "Message",
                    params: {
                      itemId: itemId,
                      receiverId: userId,
                      contactId: contactId,
                    },
                  })
                }
              >
                <View
                  style={{
                    ...styles.price2,
                    marginTop: hp("5%"),
                    marginRight: 10,
                  }}
                >
                  <Entypo name="new-message" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  showPhone();
                }}
              >
                <View style={{ ...styles.price2, marginTop: hp("5%") }}>
                  <Feather name="phone-call" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {userPhone ? (
            <View
              style={{
                width: wp(80),
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#fff",
                justifyContent: "space-between",
                alignSelf: "center",
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
              }}
            >
              <Text
                style={{ color: "#000", fontSize: 15, alignSelf: "center" }}
              >
                {PhoneNumber}
              </Text>
              <TouchableOpacity
                onPress={() => copyText(PhoneNumber)}
                style={styles.price2}
              >
                <FontAwesome name="copy" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            ""
          )}
          <View style={styles.descriptionCon}>
            <>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.cell}>
                    <Text style={styles.cellSpan}>Storage:</Text> {route?.params["storage"]}
                  </Text>
                  <Text style={styles.cell}>
                  <Text style={styles.cellSpan}>Condition:</Text> {route?.params["condition"]}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.cell}>
                  <Text style={styles.cellSpan}>Processor:</Text> {route?.params["processor"]}
                  </Text>
                  <Text style={styles.cell}>
                  <Text style={styles.cellSpan}>Color:</Text> {route?.params["color"]}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.cell}><Text style={styles.cellSpan}>Sim:</Text> {route?.params["sim"]}</Text>
                  <Text style={styles.cell}><Text style={styles.cellSpan}>Ram:</Text> {route?.params["ram"]}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.cellDes}>
                  <Text style={styles.cellSpan}>Description:</Text> {route?.params["description"]}
                  </Text>
                </View>
              </View>
            </>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  itemNameCon: {
    alignItems: "center",
    paddingTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  cart: {
    // backgroundColor: "black",
  },
  itemName: {
    fontSize: wp("5%"),
    color: "#37405a",
    fontWeight: "700",
    alignSelf:'center',
  },
  ImageCon: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    width: wp(90),
    height: hp(40),
    marginHorizontal: 10,
    justifyContent:'center',
    alignSelf:'center'
  },
  Image: {
    height: hp(30),
    width: wp(70),
  },
  detail: {
    width: wp(100),
    backgroundColor: "#243b2e",
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
  },
  detailHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  price: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: "#fff",
  },
  price2: {
    height: 35,
    fontSize: wp("4%"),
    fontWeight: "700",
    backgroundColor: "#c4fd7b",
    paddingHorizontal: 9,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    textAlign: "center",
    lineHeight: 26,
    fontSize: wp("4%"),
    color: "#8f9bb3",
    // marginVertical: 10,
    width: wp(70),
  },
  descriptionCon: {
    justifyContent: "space-between",
    margin: 0,
  },
  descriptionDet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  Button: {
    width: wp(60),
    paddingVertical: 10,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 10,
  },
  BtnTxt: {
    color: "#fff",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  table: {
    margin: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    color: "#fff",
    padding: 8,
    textAlign: "left",
    paddingLeft: 20,
  },
  cellSpan: {
    color: "gray",
  },
  cellDes: {
    flex: 1,
    color: "#fff",
    padding: 10,
    textAlign: "left",
    paddingLeft: 20,
  },
  view: {
    margin: 0,
    fontSize: 10,
    color: "#fff",
  },
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: wp(100), // Adjust the height as needed
    resizeMode: "contain",
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
  itemL: {
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
  wrapper: {
    height: hp(40),
margin:0
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Detail;
