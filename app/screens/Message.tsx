import { Alert, ToastAndroid } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderSimp from "../components/HeaderSimp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Message() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [currentUserId, setCurrentUser] = useState([]);
  const [messagess, setMessagess] = useState([]);

  const route = useRoute();
  const postId = route?.params["itemId"];
  const contactId = route?.params["contactId"];
  const receiverId = route?.params["receiverId"];
  console.log("Contact id ", contactId, " rece ", receiverId, "postif", postId);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchUser = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(`${apiUrl}/users/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setCurrentUser(response.data.user[0]);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      // handle error more gracefully, such as by displaying an error message to the user
    }
  }, []);

  const fetchPost = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `${apiUrl}/message/${token}/${postId}/${receiverId}/${contactId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setMessagess(response.data);
      console.log(response);
      console.log("messages", response.data);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      // handle error more gracefully, such as by displaying an error message to the user
    }
  }, []);

  useEffect(() => {
    fetchPost();
    fetchUser();
  }, [fetchPost, fetchUser]);

  // Inside your component or function
  const showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Sent",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  // Call the showToast function when needed, for example, on a button press

  const handleSend = async () => {
    try {
      const messages = {
        message: message,
      };

      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        `${apiUrl}/send-message/${token}/${postId}/${receiverId}`,
        messages,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(postId);
      if (response.data.message) {
        // Update local state with the new message
        const newMessage = {
          sender_id: currentUserId[0].ID, // Assuming currentUserId is an array with a single user object
          message: response.data.message,
          timestamp: response.data.timestamp,
        };

        setMessagess((prevMessages) => [...prevMessages, newMessage]);

        showToast();
        console.log("Sent", response.data);
      } else {
        Alert.alert("Post Error", "An error occurred while Posting");
        console.log("Posting failed", response.data);
      }
    } catch (error) {
      Alert.alert("Post Error", "An error occurred while Posting");
      console.error("Posting failed", error.message);
    }
  };

  const MessageTimestamp = ({ timestamp }) => {
    const formattedTimestamp = formatTimestamp(timestamp);

    return (
      <Text
        style={
          styles.sentMessageContainer ? styles.timestampR : styles.timestamp
        }
      >
        {formattedTimestamp}
      </Text>
    );
  };

  const formatTimestamp = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const options: any = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <>
      <HeaderSimp />

      <FlatList
        data={messagess}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const userIdArray = currentUserId.map((user) => user.ID);

          return (
            <View
              style={
                userIdArray.includes(item.sender_id)
                  ? styles.sentMessageContainer
                  : styles.receivedMessageContainer
              }
            >
              <Text style={styles.messageText}>
                {userIdArray.includes(item.sender_id)
                  ? "You: "
                  : item.sender_id + ": "}
                {item.message}
                <Text>{formatTimestamp(item.timestamp)}</Text>
                {item.isRead ? (
                  <MaterialCommunityIcons
                    name="check-all"
                    size={12}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="check"
                    size={12}
                    color="black"
                  />
                )}
              </Text>
            </View>
          );
        }}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          value={message}
          style={styles.messageInput}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type your message"
        />
        <TouchableOpacity style={styles.messageBtn} onPress={handleSend}>
          <Text style={styles.messageBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  messageText: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    margin: 5,
    display:'flex',
    flexDirection:'column'
  },
  timestamp: {
    fontSize: 10,
    textAlign: "right",
  },
  timestampR: {
    fontSize: 10,
    textAlign: "left",
  },
  messageInput: {
    borderWidth: 1,
    width: "70%",
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
  messageBtn: {
    width: "20%",
    backgroundColor: "#243B2E",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  messageBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  receivedMessageContainer: {
    flexDirection: "column", // Align received messages to the left
    margin: 5,
    width: "60%",
    alignSelf: "flex-start", // Align received messages to the left
  },
  sentMessageContainer: {
    flexDirection: "column", // Align sent messages to the right
    margin: 5,
    width: "60%",
    alignSelf: "flex-end", // Align sent messages to the right
  },
});
