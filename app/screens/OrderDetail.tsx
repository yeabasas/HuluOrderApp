import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import HeaderSimp from "../components/HeaderSimp";
import { useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";

const OrderDetail = () => {
  const route = useRoute();

  const formatTimestamp = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const options: any = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <ScrollView>
        <View style={styles.head}>
          <Image
            source={require("../assets/622166.jpg")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.params}>
          <View style={styles.paramsRight}>
            {route?.params["name"] != "" ? (
              <Text>Name: {route?.params["name"]}</Text>
            ) : (
              ""
            )}
            {route?.params["storage"] != "" ? (
              <Text>Storage: {route?.params["storage"]}</Text>
            ) : (
              ""
            )}
            {route?.params["ram"] != "" ? (
              <Text>Ram: {route?.params["ram"]}</Text>
            ) : (
              ""
            )}
            {route?.params["sim"] != "" ? (
              <Text>Sim: {route?.params["sim"]}</Text>
            ) : (
              ""
            )}
          </View>
          <View style={styles.paramsRight}>
            {route?.params["condition"] != "" ? (
              <Text style={styles.paramsRightTxt}>
                Condition: {route?.params["condition"]}
              </Text>
            ) : (
              ""
            )}
            {route?.params["color"] != "" ? (
              <Text style={styles.paramsRightTxt}>
                Color: {route?.params["color"]}
              </Text>
            ) : (
              ""
            )}
            {route?.params["processor"] != "" ? (
              <Text style={styles.paramsRightTxt}>
                Processor: {route?.params["processor"]}
              </Text>
            ) : (
              ""
            )}
            {route?.params["description"] != "" ? (
              <Text style={styles.paramsRightTxt}>
                Description: {route?.params["description"]}
              </Text>
            ) : (
              ""
            )}
          </View>
        </View>
        <View style={styles.suggestion}>
          {route?.params["size"] != "" ? (
            <Text>Size: {route?.params["size"]}</Text>
          ) : (
            ""
          )}
          {route?.params["min"] != "" ? (
            <Text>Minimum: {route?.params["min"]}</Text>
          ) : (
            ""
          )}
          {route?.params["type"] != "" ? (
            <Text>Type: {route?.params["type"]}</Text>
          ) : (
            ""
          )}
          {route?.params["capacity"] != "" ? (
            <Text>Capacity: {route?.params["capacity"]}</Text>
          ) : (
            ""
          )}
          {route?.params["usage"] != "" ? (
            <Text>Usage: {route?.params["usage"]}</Text>
          ) : (
            ""
          )}
          {route?.params["date"] != "" ? (
            <Text>Date: {route?.params["date"]}</Text>
          ) : (
            ""
          )}
          {route?.params["status"] != "" ? (
            <Text>Status: {route?.params["status"]}</Text>
          ) : (
            ""
          )}
          {route?.params["image"] != "" ? (
            <Text>Image: {route?.params["image"]}</Text>
          ) : (
            ""
          )}
          {route?.params["screenImage"] != "" ? (
            <Text>Screen Image: {route?.params["screenImage"]}</Text>
          ) : (
            ""
          )}
          {route?.params["suggestDes"] != "" ? (
            <Text>Suggested Description: {route?.params["suggestDes"]}</Text>
          ) : (
            ""
          )}
          {route?.params["price"] != "" ? (
            <Text>Price: ${route?.params["price"]}</Text>
          ) : (
            ""
          )}
          {route?.params["suggestImage"] != "" ? (
            <Text>Suggested Image: {route?.params["suggestImage"]}</Text>
          ) : (
            ""
          )}
        </View>
        <View style={styles.btnCon}>
          {route?.params["status"] != "" ? (
          <TouchableOpacity disabled style={styles.btnYesC}>
            <Text style={styles.btnTxtD}>Confirm</Text>
          </TouchableOpacity>
            ) : (
          <TouchableOpacity style={styles.btnYes}>
            <Text style={styles.btnTxt}>Confirm</Text>
          </TouchableOpacity>
              )}
          {route?.params["status"] != "Cancelled" ? (
            <TouchableOpacity  style={styles.btnNo}>
              <Text style={styles.btnTxt}>Cancel</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled style={styles.btnNoD}>
              <Text style={styles.btnTxtD}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "center",
    width: wp(90),
    shadowColor: "#243B2E", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 2,
    borderWidth: 0.2, // Shadow radius
    elevation: 3,
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  suggestion: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 10,
    marginBottom:10,
    justifyContent: "center",
    width: wp(90),
    shadowColor: "#243B2E", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 2,
    borderWidth: 0.2, // Shadow radius
    elevation: 3,
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  params: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "space-around",
    width: wp(90),
    shadowColor: "#243B2E", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 2,
    borderWidth: 0.2, // Shadow radius
    elevation: 3,
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  paramsRightTxt: {
    fontSize: 15,
  },
  paramsRight: {
    marginVertical: 20,
  },
  btnYes: {
    backgroundColor: "#5cb85c",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: hp("7%"),
    width: wp("40"),
    marginBottom:10,
  },
  btnNo: {
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: hp("7%"),
    width: wp("40"),
    fontSize: "30",
    marginBottom:10,

  },
  btnNoD: {
    backgroundColor: "#ffb1b1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: hp("7%"),
    width: wp("40"),
    fontSize: "30",
    marginBottom:10,

  },
  btnYesC: {
    backgroundColor: "#d1ffbd",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: hp("7%"),
    width: wp("40"),
    fontSize: "30",
    marginBottom:10,
  },
  btnCon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnTxt: {
    color: "#fff",
  },
  btnTxtD: {
    color: "gray",
  },
});
