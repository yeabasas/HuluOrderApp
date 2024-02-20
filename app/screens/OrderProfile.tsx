import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const OrderProfile = () => {
  const [order, setOrder] = useState([]);
  const navigation: any = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchPost = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(`${apiUrl}/orderedItems/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setOrder(response.data.data[0]);
      console.log("response", response.data.data[0]);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      // handle error more gracefully, such as by displaying an error message to the user
    }
  }, []);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]); // Add fetchUser as a dependency

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.container}>
          {order?.map((item, i) => (
            <TouchableOpacity
              style={styles.items}
              key={item.ID}
              onPress={() =>
                navigation.navigate("OrderDetail", {
                  id: item.ID,
                  price: item.Price,
                  name: item.ItemName,
                  condition: item.Condition,
                  storage: item.Storage,
                  sim: item.Sim,
                  ram: item.Ram,
                  description: item.Description,
                  color: item.Color,
                  suggestImage: item.SuggestImage,
                  suggestDes:item.SuggestDes,
                  size:item.Size,
                  min:item.Min,
                  type:item.Type,
                  capacity:item.Capacity,
                  usage:item.Usage,
                  processor:item.Processor,
                  date:item.DateModified,
                  status:item.status,
                  image:item.Image,
                  screenImage:item.ScreenImage,
                  item: item,
                })
              }
            >
              <View style={styles.itemsImg}>
                <Image
                  source={require("../assets/blank-profile-picture.png")}
                  style={{ height: hp(20), width: wp(20), marginRight: 10 }}
                  resizeMode="contain"
                />
                <View style={styles.itemsTxt}>
                  <Text>{item.ItemName}</Text>
                  <Text>{item.DateModified}</Text>
                  <Text>Pending</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    justifyContent: "center",
    alignSelf: "center",
  },
  items: {
    flexDirection: "row",
    marginTop: 10,
    height: 100,
    shadowColor: "#243B2E", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 2,
    borderWidth: 0.2, // Shadow radius
    elevation: 3,
    marginHorizontal: 10,
    width: wp(90),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  itemsImg: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 20,
  },
  itemsTxt: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#000",
  },
  itemsTxtBold: {
    fontWeight: "700",
    fontSize: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemsEdit: {
    textAlign: "center",
    padding: 5,
    backgroundColor: "green",
    borderRadius: 5,
    margin: 3,
    color: "#fff",
  },
  itemsDelete: {
    textAlign: "center",
    padding: 5,
    backgroundColor: "red",
    borderRadius: 5,
    margin: 3,
    color: "#fff",
  },
  itemsEditCon: {
    marginRight: 8,
  },
});

export default OrderProfile;
