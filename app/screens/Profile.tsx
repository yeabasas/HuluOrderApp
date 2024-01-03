import React, { useCallback, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Profile = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "red" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "gray",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity>
          <Text>asdf</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "red",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Profile;
