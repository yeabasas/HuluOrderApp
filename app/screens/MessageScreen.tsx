import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderSimp from "../components/HeaderSimp";

const MessageScreen = () => {
  const navigation: any = useNavigation();
  const uri = "../assets/img.jpg";
  
  return (
    <View style={{ flex: 1 }}>
      <HeaderSimp />
        <Text style={styles.container}>Messages</Text>
     
        <Pressable style={styles.text}onPress={() => navigation.navigate("Message")}>
        <Image
          style={styles.itemsImage}
          source={require("../assets/img.jpg")}
        />
        <View style={styles.detail}>
          <Text style={{marginBottom:5}}>Sender Name</Text>
          <Text>last message</Text>
        </View>
        </Pressable>
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#243B2E",
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  text: {
    display:'flex',
    flexDirection:'row',
    padding: 10,
    width: "95%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    margin: 5,
  },
  itemsImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight:10,
  },
  detail:{
    display:'flex',
    flexDirection:'column',
  }
});
export default MessageScreen;
