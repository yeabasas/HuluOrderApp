import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as DocumentPicker from "expo-document-picker";
// import SelectDropdown from "react-native-select-dropdown";
// import Select2 from "react-native-select-two";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const countries = ["Egypt", "Canada", "Australia", "Ireland"];
const mockData = [
  { id: 1, name: "React Native Developer" }, // set default checked for render option item
  { id: 2, name: "Android Developer" },
  { id: 3, name: "iOS Developer" },
];
const Phone = () => {
  const [itemName, setItemName] = useState("");
  const [condition, setCondition] = useState("");
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");
  const [sim, setSim] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = () => {
    console.log(itemName, condition, storage, ram, sim, color, description);
  };

  const docPicker = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync();
      console.log(doc.assets.map((e) => (e.name, e.size)));
    } catch (err) {
      if ((await DocumentPicker.getDocumentAsync()).canceled) {
        console.log("error -----", err);
      } else {
        throw err;
      }
    }
  };
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
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: hp(30),
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#243b2e",
  },
  main: {
    alignItems: "center",
    borderCurve: "circular",
    borderTopStartRadius: 90,
    borderTopEndRadius: 90,
    paddingTop: 30,
    gap: 10,
    backgroundColor: "#fff",
  },
  select: {
    width: "75%",
  },
  input: {
    height: 44,
    width: wp(70),
    borderBottomWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  login: {
    fontSize: 25,
    fontWeight: "900",
  },
  image: {
    height: 100,
    width: wp(70),
    backgroundColor: "#f8f8ff",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Phone;
