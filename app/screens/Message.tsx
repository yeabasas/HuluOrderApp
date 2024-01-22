import React, { useState, useEffect } from "react";
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
import { io } from "socket.io-client";
import HeaderSimp from "../components/HeaderSimp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const socket = io("http://192.168.8.9:8000");

export default function Message() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagess, setMessagess] = useState([]);

  useEffect(() => {
    socket.on("send_chat", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up on unmount
    return () => {
      socket.off("send_chat");
    };
  }, [socket]);

  useEffect(() => {
      axios
        .get("http://192.168.0.4:8000/messagee")
        .then((items) => setMessagess(items.data))
        .catch((err) => console.log(err));
   
  }, [messagess]);

  const sendMessage = () => {
    socket.emit("send_chat", message);
    setMessage("");
  };

  return (
    <>
      <HeaderSimp />
      <FlatList
        data={messagess}
        style={{ flex: 1 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Text style={styles.messageText}>{item.text}</Text>
          </>
        )}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          value={message}
          style={styles.messageInput}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type your message"
        />
        <TouchableOpacity style={styles.messageBtn} onPress={sendMessage}>
          <Text style={styles.messageBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  messageText: {
    paddingVertical: 10,
    backgroundColor: "#ff5",
    margin: 5,
    width: "60%",
  },
  messageInput: {
    borderWidth: 1,
    width: "90%",
    padding: 5,
    marginVertical: 5,
  },
  messageBtn: {
    width: "90%",
    padding: 10,
    backgroundColor: "#243B2E",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 10,
  },
  messageBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
