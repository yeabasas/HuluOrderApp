import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, Button } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { FontFamily, Color, FontSize } from "../../GlobalStyles";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useAuth } from "../context/AuthContext";

const Home = ({navigation}) => {
  const { onLogout } = useAuth();

  return (
    <View style={styles.cover}>
      <Image
        style={[styles.heroIcon, styles.heroIconPosition]}
        resizeMode="cover"
        source={require('../assets/hero.png')}
      />
      <Text style={styles.orderNowChina}>{`order NOW CHINA  `}</Text>
      <Text style={[styles.connectingChinaTo, styles.embarkOnYourTypo]}>
        "Connecting China to Ethiopia: Affordable Treasures at Your Fingertips!"
      </Text>
      <Image
        style={styles.coverChild}
        source={require('../assets/group-33678.svg')}
      />
      <Image
        style={[styles.coverItem, styles.heroIconPosition]}
        source={require('../assets/group-2.svg')}
      />
      <Image
        style={styles.vectorIcon}
        source={require("../assets/vector.svg")}
      />
      <Pressable
        style={[styles.rectangleParent, styles.groupChildPosition]}
        onPress={()=>navigation.navigate('Harry')}
      >
        <LinearGradient
          style={[styles.groupChild, styles.groupChildPosition]}
          locations={[0, 1]}
          colors={["#192f23", "#2c463a"]}
        //   useAngle={true}
        //   angle={-31.32}
        />
        <Text style={[styles.getStarted, styles.huluFlexBox]}>Get Started</Text>
      </Pressable>
      <Button color="#243b2e" onPress={() => onLogout()} title="Sign Out" />
      <Text
        style={[styles.embarkOnYour, styles.getStartedTypo]}
      >{`"Embark on Your Journey Now! Join Us and Let the Adventure Begin!"
`}</Text>
      <View style={[styles.groupParent, styles.parentLayout]}>
        <View style={[styles.vectorParent, styles.parentLayout]}>
          <Image
            style={styles.vectorIcon1}
            source={require("../assets/vector1.svg")}
          />
          <Image
            style={styles.vectorIcon2}
            source={require("../assets/vector2.svg")}
          />
          <Text style={[styles.hulu, styles.parentLayout]}>Hulu</Text>
          <Image
            style={[styles.vectorIcon3, styles.vectorIconLayout3]}
            source={require("../assets/vector3.svg")}
          />
          <Image
            style={[styles.vectorIcon4, styles.vectorIconLayout3]}
            source={require("../assets/vector4.svg")}
          />
          <Image
            style={[styles.vectorIcon5, styles.vectorIconLayout2]}
            source={require("../assets/vector5.svg")}
          />
          <Image
            style={[styles.vectorIcon6, styles.vectorIconLayout1]}
            source={require("../assets/vector6.svg")}
          />
          <Image
            style={[styles.vectorIcon7, styles.vectorIconLayout1]}
            source={require("../assets/vector7.svg")}
          />
          <Image
            style={[styles.vectorIcon8, styles.vectorIconLayout]}
            source={require("../assets/vector8.svg")}
          />
          <Image
            style={[styles.vectorIcon9, styles.vectorIconLayout]}
            source={require("../assets/vector9.svg")}
          />
          <Image
            style={[styles.vectorIcon10, styles.vectorIconPosition2]}
            source={require("../assets/vector11.svg")}
          />
          <Image
            style={[styles.vectorIcon11, styles.vectorIconPosition1]}
            source={require("../assets/vector11.svg")}
          />
          <Image
            style={[styles.vectorIcon12, styles.vectorIconPosition]}
            source={require("../assets/vector12.svg")}
          />
          <Image
            style={[styles.vectorIcon13, styles.vectorIconPosition2]}
            source={require("../assets/vector11.svg")}
          />
          <Image
            style={[styles.vectorIcon14, styles.vectorIconPosition]}
            source={require("../assets/vector13.svg")}
          />
          <Image
            style={[styles.vectorIcon15, styles.vectorIconLayout2]}
            source={require("../assets/vector14.svg")}
          />
          <Image
            style={[styles.vectorIcon16, styles.vectorIconPosition1]}
            source={require("../assets/vector15.svg")}
          />
        </View>
        <Text style={[styles.order, styles.huluFlexBox]}>ORDER</Text>
      </View>
      <Image
        style={styles.vectorIcon17}
        source={require("../assets/vector16.svg")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heroIconPosition: {
    maxWidth: "100%",
    left: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  embarkOnYourTypo: {
    fontFamily: FontFamily.rubikRegular,
    textAlign: "center",
  },
  groupChildPosition: {
    width: 243,
    left: "50%",
    position: "absolute",
  },
  huluFlexBox: {
    textAlign: "left",
    color: Color.colorWhite,
  },
  getStartedTypo: {
    letterSpacing: 0.4,
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  parentLayout: {
    height: 63,
    position: "absolute",
  },
  vectorIconLayout3: {
    width: 9,
    position: "absolute",
  },
  vectorIconLayout2: {
    width: 11,
    position: "absolute",
  },
  vectorIconLayout1: {
    height: 8,
    width: 8,
    position: "absolute",
  },
  vectorIconLayout: {
    height: 12,
    width: 11,
    position: "absolute",
  },
  vectorIconPosition2: {
    left: 60,
    width: 0,
    position: "absolute",
  },
  vectorIconPosition1: {
    top: 19,
    width: 11,
    position: "absolute",
  },
  vectorIconPosition: {
    width: 31,
    left: 10,
    position: "absolute",
  },
  heroIcon: {
    right: "0%",
    height: 302,
    top: 0,
    width: "100%",
    maxWidth: "100%",
    left: "0%",
  },
  orderNowChina: {
    width: "74.88%",
    top: 95,
    left: "11.8%",
    fontSize: 30,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    color: Color.colorWhite,
    position: "absolute",
  },
  connectingChinaTo: {
    marginLeft: -146.76,
    top: 173,
    fontSize: 15,
    width: 288,
    height: 69,
    opacity: 0.6,
    left: "50%",
    color: Color.colorWhite,
    fontFamily: FontFamily.rubikRegular,
    position: "absolute",
  },
  coverChild: {
    top: 13,
    right: 24,
    width: 38,
    height: 32,
    position: "absolute",
  },
  coverItem: {
    width: "111.4%",
    right: "-11.4%",
    bottom: 0,
    height: 100,
  },
  vectorIcon: {
    width: wp(40),
    height: hp(50),
  },
  groupChild: {
    height: "100%",
    marginLeft: -121.5,
    top: "0%",
    bottom: "0%",
    borderRadius: 192,
    backgroundColor: "transparent",
  },
  getStarted: {
    marginLeft: -59.5,
    top: "30%",
    fontWeight: "600",
    fontFamily: FontFamily.rubikSemiBold,
    letterSpacing: 0.4,
    fontSize: FontSize.size_xl,
    position: "absolute",
    left: "50%",
  },
  rectangleParent: {
    height: "8.37%",
    marginHorizontal: -120,
    marginVertical:'auto',
    top: "50%",
  },
  embarkOnYour: {
    width: "81.16%",
    top: 447,
    left: "9.77%",
    textTransform: "capitalize",
    color: "rgba(26, 48, 35, 0.78)",
    fontFamily: FontFamily.rubikRegular,
    textAlign: "center",
  },
  vectorIcon1: {
    top: 4,
    left: -3,
    width: 55,
    height: 55,
    position: "absolute",
  },
  vectorIcon2: {
    height: 1,
    width: 0,
    left: 10,
    top: 27,
    position: "absolute",
  },
  hulu: {
    left: 66,
    fontSize: 50,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    width: 133,
    textAlign: "left",
    color: Color.colorWhite,
    top: 0,
  },
  vectorIcon3: {
    top: 23,
    height: 14,
    left: 31,
  },
  vectorIcon4: {
    height: 13,
    left: 10,
    top: 27,
    width: 9,
  },
  vectorIcon5: {
    top: 31,
    height: 10,
    left: 10,
  },
  vectorIcon6: {
    top: 45,
    left: 31,
  },
  vectorIcon7: {
    top: 10,
    left: 11,
  },
  vectorIcon8: {
    top: 15,
    left: 30,
  },
  vectorIcon9: {
    top: 35,
    left: 10,
  },
  vectorIcon10: {
    top: 29,
    height: 5,
  },
  vectorIcon11: {
    left: 30,
    height: 10,
  },
  vectorIcon12: {
    top: 26,
    height: 21,
    opacity: 0.46,
  },
  vectorIcon13: {
    top: 42,
    height: 6,
  },
  vectorIcon14: {
    top: 21,
    height: 20,
  },
  vectorIcon15: {
    top: 39,
    height: 5,
    left: 30,
  },
  vectorIcon16: {
    height: 5,
    left: 10,
  },
  vectorParent: {
    left: 0,
    width: 199,
    top: 0,
  },
  order: {
    top: 32,
    left: 189,
    fontFamily: FontFamily.corbel,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    position: "absolute",
  },
  groupParent: {
    top: 9,
    left: 19,
    width: 252,
  },
  vectorIcon17: {
    height: "4.94%",
    top: "1.72%",
    bottom: "93.35%",
    left: 77,
    maxHeight: "100%",
    width: 1,
    position: "absolute",
  },
  cover: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default Home;
