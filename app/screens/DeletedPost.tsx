import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const DeletedPost = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(`${apiUrl}/deletedItems/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setPosts(response.data.data[0]);
      setLoading(false)
      setRefreshing(false)
      console.log("response", response.data.data[0]);
    } catch (error) {
        setLoading(false)
        setRefreshing(false)
      console.error("Error fetching user details:", error.message);
      // handle error more gracefully, such as by displaying an error message to the user
    }
  }, []);
  
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 5000);
  }, [loading]);

  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 5000);
    fetchData();
  };

  const handleRenewPost = async (postId:any)=>{
    const posted = String(postId);
    try {
      const status = "new";
      const token = await AsyncStorage.getItem("authToken");
      axios.put(`${apiUrl}/RenewPost/${token}/${posted}`, null, {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: status },
      });

      Alert.alert("Success!", "Your post has been Renewed.", [{ text: "OK" }], {
        cancelable: false,
      });
    } catch (error) {
      console.log("handle Delete clicked");
    }
  }
  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#243b2e"
          />
        ) : (
          <View style={styles.container}>
            {posts.map((p) => (
              <View style={styles.items} key={p._id}>
                <View style={styles.itemsImg}>
                  <Image
                    source={require("../assets/blank-profile-picture.png")}
                    style={{ height: hp(20), width: wp(20), marginRight: 10 }}
                    resizeMode="contain"
                  />
                  <View style={styles.itemsTxt}>
                    <Text style={styles.itemsTxtBold}>{p.ItemName}</Text>
                    <Text>ETB {p.Price}</Text>
                    <Text>{p.View} Visitors</Text>
                  </View>
                </View>
                <View style={styles.itemsEditCon}>
                  <TouchableOpacity onPress={() => handleRenewPost(p.ID)}>
                    <Text style={styles.itemsEdit}>Renew</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    justifyContent: "center",
    alignSelf: "center",
  },
  items: {
    flexDirection: "row",
    marginTop: 10,
    height: 100,
    shadowColor: "#243B2E", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 2,
    borderWidth: 0.2, // Shadow radius
    elevation: 3,
    marginHorizontal: 10,
    width: wp(90),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  itemsImg: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 20,
  },
  itemsTxt: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#000",
  },
  itemsTxtBold: {
    fontWeight: "700",
    fontSize: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemsEdit: {
    textAlign: "center",
    padding: 8,
    paddingHorizontal:11,
    backgroundColor: "green",
    borderRadius: 5,
    margin: 3,
    color: "#fff",
  },
  itemsDelete: {
    textAlign: "center",
    padding: 5,
    backgroundColor: "red",
    borderRadius: 5,
    margin: 3,
    color: "#fff",
  },
  itemsEditCon: {
    marginRight: 8,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
});
export default DeletedPost;
