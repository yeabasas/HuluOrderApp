import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
  Button,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Harry = ({navigation}) => {
  const { onLogout } = useAuth();

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Fetch your data from the API
    // For this example, I'm using a simple array
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCell = ({ item }) => (
    <View style={styles.cell}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView alwaysBounceVertical={true}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/hero@2x.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>HULU ORDER</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
            ></TextInput>
          </View>
        </ImageBackground>
        <View style={styles.category}>
          <ScrollView horizontal>
            <Pressable onPress={()=>navigation.navigate('Fight')} style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>hello</Text>
            </Pressable>
            <Pressable style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>hello</Text>
            </Pressable>
            <Pressable style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>hello</Text>
            </Pressable>
            <Pressable style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>hello</Text>
            </Pressable>
            <Pressable style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>hello</Text>
            </Pressable>
            <Pressable style={styles.categoryItems}>
              <Text style={styles.categoryItemsText}>hello</Text>
            </Pressable>
          </ScrollView>
        </View>
        <View style={styles.itemsContainer}>
          {/* <View style={styles.items}>
            <Image
              style={styles.itemsImage}
              resizeMode="cover"
              source={require("../assets/hero.png")}
            />
          </View> */}
          <FlatList
            data={rowData}
            renderItem={renderCell}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Number of columns in your grid
          />
        </View>
      </View>
      <Button color="#243b2e" onPress={() => onLogout()} title="Sign Out" />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: hp(100),
    marginTop: 20,
    backgroundColor: "#fff",
  },
  cell: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
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
    height: hp(20),
    width: wp(100),
  },
  searchIcon: {
    padding: 10,
  },
  category: {
    backgroundColor: "#f4fdf4",
    height: hp(12),
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
  cards: {
    width: wp(50),
    backgroundColor: "#243b2e",
  },
  cardsText: {
    textAlign: "center",
  },
  itemsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  items: {
    width: wp(50),
    height: hp(30),
    backgroundColor: "red",
  },
  itemsImage: {
    height: hp(20),
    width: wp(40),
  },
});
export default Harry;
