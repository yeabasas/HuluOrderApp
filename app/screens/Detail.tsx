import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const Detail = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item: any) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <ScrollView alwaysBounceVertical={true}>
      <Header />
      <>
        <View style={styles.itemNameCon}>
          <Text style={styles.itemName}>{route?.params["name"]}</Text>
          <Pressable
            style={styles.cart}
            onPress={() => {
              navigation.navigate("CartScreen", {
                id: route?.params["_id"],
                price: route?.params["price"],
                name: route?.params["name"],
                condition: route?.params["condition"],
                storage: route?.params["storage"],
                sim: route?.params["sim"],
                ram: route?.params["ram"],
                description: route?.params["description"],
                color: route?.params["color"],
                item: route?.params["item"],
              });
            }}
          >
            <AntDesign name="shoppingcart" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.ImageCon}></View>
        <View style={styles.detail}>
          <View style={styles.detailHead}>
            <Text style={{ ...styles.price, marginTop: hp("5%") }}>
              ETB {route?.params["price"]}
            </Text>
            <View style={{ ...styles.price2, marginTop: hp("5%") }}>
              <Text>In Stoke</Text>
            </View>
          </View>
          <View style={styles.descriptionCon}>
            <>
              <View style={styles.descriptionDet}>
                <View>
                  <Text style={styles.description}>
                    Storage: {route?.params["storage"]}
                  </Text>
                  <Text style={styles.description}>
                    Condition: {route?.params["condition"]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.description}>
                    Sim: {route?.params["sim"]}
                  </Text>
                  <Text style={styles.description}>
                    Ram: {route?.params["ram"]}
                  </Text>
                </View>
              </View>
              <Text style={styles.description}>
                Description: {route?.params["description"]}
              </Text>
            </>
            <Pressable
              style={styles.Button}
              onPress={() => addItemToCart(route?.params["item"])}
            >
              {addedToCart ? (
                <Text style={styles.BtnTxt}>Added To Cart</Text>
              ) : (
                <Text style={styles.BtnTxt}>Add To Cart</Text>
              )}
            </Pressable>
          </View>
        </View>
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemNameCon: {
    alignItems: "center",
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end",
  },
  cart: {
    // backgroundColor: "black",
  },
  itemName: {
    fontSize: wp("5%"),
    color: "#37405a",
    fontWeight: "700",
  },
  ImageCon: {
    alignItems: "center",
    marginTop: hp("5%"),
  },
  Image: {
    height: hp(30),
    width: wp(70),
  },
  detail: {
    height: hp(34),
    width: wp(100),
    marginTop: 30,
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
});

export default Detail;
