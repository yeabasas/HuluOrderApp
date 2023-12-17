import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as DocumentPicker from 'expo-document-picker';

const Phone = () => {
  const [itemName, setItemName] = useState("");
  const [condition, setCondition] = useState("");
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");
  const [sim, setSim] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log(itemName, condition, storage, ram, sim, color, description);
  };

const docPicker =async () => {
  try{
  const doc = await DocumentPicker.getDocumentAsync()
  console.log(doc.assets.map((e)=>(
    e.name,e.size
  )))
} catch (err) {
  if ((await DocumentPicker.getDocumentAsync()).canceled) {
    console.log("error -----", err);
  } else {
    throw err;
  }
}
}

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.login}>Tablets</Text>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          onChangeText={(text: string) => setItemName(text)}
          value={itemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Condition"
          onChangeText={(text: string) => setCondition(text)}
          value={condition}
        />
        <TextInput
          style={styles.input}
          placeholder="Storage"
          onChangeText={(text: string) => setStorage(text)}
          value={storage}
        />
        <TextInput
          style={styles.input}
          placeholder="Ram"
          onChangeText={(text: string) => setRam(text)}
          value={ram}
        />
        <TextInput
          style={styles.input}
          placeholder="Sim"
          onChangeText={(text: string) => setSim(text)}
          value={sim}
        />
        <TextInput
          style={styles.input}
          placeholder="Color"
          onChangeText={(text: string) => setColor(text)}
          value={color}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
          onChangeText={(text: string) => setDescription(text)}
          value={description}
        />
          <TouchableOpacity
          style={styles.image}
            onPress={() => docPicker()}
          >
            <Text> {"upload  Image"}</Text>
          </TouchableOpacity>
        <Button color="#243b2e" title="Submit" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  image:{
    height:100,
    width:wp(70),
    backgroundColor: '#f8f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default Phone;
