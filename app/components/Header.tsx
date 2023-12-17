import { View, Text, ImageBackground, TextInput, StyleSheet } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";


const Header = () => {
  return (
    <ImageBackground
      source={require("../assets/hero.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>HULU ORDER</Text>
        <TextInput style={styles.searchInput} placeholder="Search"></TextInput>
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
      },
      image: {
        marginTop:20,
        height: hp(20),
        width: wp(100),
      },
});

export default Header;
