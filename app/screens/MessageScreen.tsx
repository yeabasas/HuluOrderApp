import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderSimp from "../components/HeaderSimp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const MessageScreen = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const navigation: any = useNavigation();
  const route = useRoute();

  const [contact, setContact] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(`${apiUrl}/contact/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setContact(response.data);
      setLoading(false);
      setRefreshing(false);
      console.log("contacts of all", contact);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      setLoading(false);
      setRefreshing(false);
    }
  }, [setContact, setLoading, setRefreshing]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData, loading]) // Include dependencies
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <GestureHandlerRootView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderSimp />
        <Text style={styles.container}>Messages</Text>
        {loading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#243b2e"
          />
        ) : (
          <>
            {contact.map((p) => (
              <Pressable
                style={styles.text}
                onPress={() =>
                  navigation.navigate("Message", {
                    contactId: p.contactId,
                    userId: p.userId,
                    itemId: p.itemId,
                    receiverId: p.receiverId,
                  })
                }
                key={p.ID}
              >
                <Image
                  style={styles.itemsImage}
                  source={require("../assets/img.jpg")}
                />
                <View style={styles.detail}>
                  <Text style={{ marginBottom: 5 }}>{p.FirstName}</Text>
                  <Text>{p.lastMessage}</Text>
                </View>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>
    </GestureHandlerRootView>
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
    display: "flex",
    flexDirection: "row",
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
    marginRight: 10,
  },
  detail: {
    display: "flex",
    flexDirection: "column",
  },
  loadingIndicator: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    margin: "auto",
  },
});
export default MessageScreen;
