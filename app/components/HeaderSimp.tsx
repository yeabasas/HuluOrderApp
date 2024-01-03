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
  
  const HeaderSimp = () => {
    return (
      <ImageBackground
        source={require("../assets/hero.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>HULU ORDER</Text>
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
    image: {
      paddingTop: 20,
      height: hp(15),
      width: wp(100),
    },
  });
  
  export default HeaderSimp;
  