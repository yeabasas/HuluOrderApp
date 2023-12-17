import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../components/Header";

const data = [
  { key: "A" },
  { key: "B" },
  { key: "C" },
  { key: "D" },
  { key: "E" },
  { key: "F" },
  { key: "G" },
  { key: "H" },
  { key: "I" },
  { key: "J" },
  // { key: 'K' },
  // { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;

const Harry = ({ navigation,onSubmit }) => {
  const { onLogout } = useAuth();

  const [rowData, setRowData] = useState([]);

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Image
          style={styles.itemsImage}
          resizeMode="cover"
          source={require("../assets/622166.jpg")}
        />
        <View style={styles.itemBottom}>
          <Text style={styles.itemText}>{item.key}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView alwaysBounceVertical={true}>
      <View style={styles.container}>
        <Header/>
        <View style={styles.category}>
          <ScrollView horizontal>
            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={styles.categoryItems}
            >
              <Text style={styles.categoryItemsText}>Login</Text>
            </Pressable>
            <Pressable
            onPress={() => navigation.navigate("Register")}
            style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>Register</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Order")} style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>Order</Text>
            </Pressable>
            <Pressable  style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>Fight</Text>
            </Pressable>
            <Pressable style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>hello</Text>
            </Pressable>
          </ScrollView>
        </View>
        <View>
          <FlatList
            data={formatData(data, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
          />
        </View>
      </View>
      <Button color="#243b2e" onPress={() => onLogout()} title="Sign Out" />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  category: {
    backgroundColor: "#f4fdf4",
    height: 30,
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center'
  },
  categoryItems: {
    flex: 1,
    backgroundColor: "#243b2e",
    justifyContent: "center",
    marginHorizontal: 5,
    height: 30,
    width: 120,
    alignItems: "center",
  },
  categoryItemsText: {
    color: "#fff",
    fontSize: 16,
  },
  cards: {
    width: wp(50),
    backgroundColor: "#243b2e",
  },
  cardsText: {
    textAlign: "center",
  },
  item: {
    flex: 1,
    margin: 10,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
    marginLeft: 15,
    height: hp(10),
  },
  itemBottom: {
    backgroundColor: "#243b2e",
    borderCurve: "circular",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    zIndex: 7,
  },
  itemsImage: {
    height: hp(20),
    width: wp(44),
  },
});
export default Harry;
