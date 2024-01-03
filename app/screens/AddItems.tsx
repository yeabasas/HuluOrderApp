import {
  View,
  Button,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import HeaderSimp from "../components/HeaderSimp";
// import Select2 from "react-native-select-two";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AddItems = ({navigation}) => {
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");
  const [color, setColor] = useState("");
  const [sim, setSim] = useState("");
  const [processor, setProcessor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const mockData = [
    { id: 1, name: "React Native Developer" }, // set default checked for render option item
    { id: 2, name: "Android Developer" },
    { id: 3, name: "iOS Developer" },
  ];
  const handlePost = () => {
    const item = {
      name: name,
      condition: condition,
      storage: storage,
      ram: ram,
      color: color,
      sim: sim,
      processor: processor,
      description: description,
      price: price,
    };

    axios
      .post("http://192.168.0.4:8000/postItem", item)
      .then((response) => {
        console.log(response);
        Alert.alert("Posted successful", "You Phone been Posted Successfully");
        setName("");
        setCondition("");
        setStorage("");
        setRam("");
        setColor("");
        setSim("");
        setProcessor("");
        setDescription("");
        setPrice("");
      })
      .catch((error) => {
        Alert.alert("Post Error", "An error occurred while Posting");
        console.log("Posting failed", error);
      });
  };
  // hooks

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  return (
    <GestureHandlerRootView>
      <ScrollView>
      <HeaderSimp />
        <Pressable style={{ marginHorizontal: 20, marginVertical: 20 }}>
          {/* <View style={{ height: 50, backgroundColor: "#00CED1" }} /> */}
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Add an Item
            </Text>

            <View style={styles.container}>
              <Button title="Close" onPress={() => navigation.navigate('Fight')} />
              
            </View>
            {/* <View style={{ width: "100%" }}>
              <Select2
                isSelectSingle
                style={{ borderRadius: 1 }}
                colorTheme="#243b2e"
                popupTitle="Select Category"
                title="Select Category"
                listEmptyTitle="Noting to show"
                searchPlaceHolderText="Search Category"
                selectButtonText="Select"
                cancelButtonText="Cancel"
                useNativeDriver={true}
                data={mockData}
                onSelect={(data: React.SetStateAction<string>) => {
                  setState(data);
                }}
                onRemoveItem={(data: React.SetStateAction<string>) => {
                  setState(data);
                }}
              />
            </View> */}
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Phone Brand
              </Text>

              <TextInput
                value={name}
                onChangeText={(text: string) => setName(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Eg: Samsung s20"
              />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Condition
              </Text>

              <TextInput
                value={condition}
                onChangeText={(text: string) => setCondition(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Eg: 95% new"
              />
            </View>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Sim</Text>

              <TextInput
                value={sim}
                onChangeText={(text: string) => setSim(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Eg: single"
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Storage</Text>

              <TextInput
                value={storage}
                onChangeText={(text: string) => setStorage(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Eg: 256GB"
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Ram</Text>
              <TextInput
                value={ram}
                onChangeText={(text: string) => setRam(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Eg: 12GB"
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Color</Text>
              <TextInput
                value={color}
                onChangeText={(text: string) => setColor(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Eg: black"
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Processor
              </Text>
              <TextInput
                value={processor}
                onChangeText={(text: string) => setProcessor(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Eg: snapDragon"
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Description
              </Text>
              <TextInput
                value={description}
                onChangeText={(text: string) => setDescription(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder=""
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Price</Text>
              <TextInput
                value={price}
                onChangeText={(text: string) => setPrice(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder=""
              />
            </View>

            <Pressable
              style={{
                backgroundColor: "#FFC72C",
                padding: 19,
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Button title="Post" onPress={handlePost} />
              {/* <Text style={{ fontWeight: "bold" }}>Post</Text> */}
            </Pressable>
          </View>
        </Pressable>
      </ScrollView>
    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default AddItems;
