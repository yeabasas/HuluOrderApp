import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import Header from "../components/Header";
import Phone from "../components/forms/phone";
import Tablet from "../components/forms/tablet";
import MainNavigator from "../components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Order = () => {
  const [phone,setPhone]=useState({phone:'phone',tablet:'tablet'});

  return (
    <ScrollView alwaysBounceVertical={true}>
      <Header />
      <View style={styles.category}>
        <ScrollView horizontal>
          <Pressable style={styles.categoryItems} onPress={()=> setPhone({phone:'phone',tablet:''})}>
            <Text style={styles.categoryItemsText}>phones</Text>
          </Pressable>
          <Pressable style={styles.categoryItems} onPress={()=>setPhone({phone:'',tablet:'tablet'})}>
            <Text style={styles.categoryItemsText}>tablets</Text>
          </Pressable>
        </ScrollView>
      </View>
      {phone.phone === 'phone'?
          <Phone />
      :
          <Tablet/>
      
      }
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  category: {
    height: hp(12),
    backgroundColor: "#f4fdf4",
  },
  categoryItems: {
    flex: 1,
    backgroundColor: "#243b2e",
    marginBottom: 20,
    justifyContent: "center",
    margin: 10,
    height: 50,
    width: 100,
    alignItems: "center",
  },
  categoryItemsText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Order;
