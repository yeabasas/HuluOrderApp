import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
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
import HeaderSimp from "../components/HeaderSimp";

const Detail = () => {
  const route = useRoute();
  const navigation: any = useNavigation();

  return (
    <ScrollView alwaysBounceVertical={true}>
      <HeaderSimp />
      <>
        <View style={styles.itemNameCon}>
          <Text style={styles.itemName}>{route?.params["name"]}</Text>
        </View>
        <View style={styles.ImageCon}>
          <Image
            source={require("../assets/622166.jpg")}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
          />
        </View>
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
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.cell}>
                    Storage: {route?.params["storage"]}
                  </Text>
                  <Text style={styles.cell}>
                    Condition: {route?.params["condition"]}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.cell}>Sim: {route?.params["sim"]}</Text>
                  <Text style={styles.cell}>Ram: {route?.params["ram"]}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.cellDes}>
                    Description: {route?.params["description"]}
                  </Text>
                </View>
              </View>
            </>
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
    flex: 1,
    width: wp(90),
    height: hp(30),
    // backgroundColor: "#fff",
    margin: 10,
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
  table: {
    margin: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    color:'#fff',
    padding: 10,
    textAlign: "left",
    paddingLeft:20,
  },
  cellDes: {
    flex: 1,
    color:'#fff',
    padding: 10,
    textAlign: "left",
    paddingLeft:20,
  },
});

export default Detail;
