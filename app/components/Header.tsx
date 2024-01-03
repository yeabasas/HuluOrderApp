import {
  View,
  Text,
  ImageBackground,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Header = () => {
  return (
    <ImageBackground
      source={require("../assets/hero.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <StatusBar style="light"/>
      <View style={styles.header}>
        <Text style={styles.headerText}>HULU ORDER</Text>
        <Pressable style={styles.searchInput}>
          <AntDesign
            style={{ paddingTop:4,paddingRight:5 }}
            name="search1"
            size={20}
            color="gray"
          />
          <TextInput placeholder="Search" />
        </Pressable>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  header: {
    height: hp(20),
    paddingTop: 10,
    alignItems: "center",
    shadowColor: "black",
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
  searchInput: {
    width: wp(80),
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 20,
    display: 'flex',
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:"flex-start",

  },
  image: {
    paddingTop: 20,
    height: hp(20),
    width: wp(100),
  },
});

export default Header;
