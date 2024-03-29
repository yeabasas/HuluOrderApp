import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import HeaderSimp from "../components/HeaderSimp";
import BottomSheet, { BottomSheetRefProps } from "../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { assets } from "../../react-native.config";
import { AntDesign } from "@expo/vector-icons";
import { ImagePicker, Album, Asset } from "expo-image-multiple-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const Order = (route) => {
  
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState<Album | undefined>();
  const [assets, setAssets] = useState<Asset[]>([]);

  const refModels = useRef<BottomSheetRefProps>(null);
  const refStorage = useRef<BottomSheetRefProps>(null);
  const refSim = useRef<BottomSheetRefProps>(null);
  const refProcessor = useRef<BottomSheetRefProps>(null);
  const refColor = useRef<BottomSheetRefProps>(null);
  const refCondition = useRef<BottomSheetRefProps>(null);
  const refRam = useRef<BottomSheetRefProps>(null);

  const onPressModels = useCallback(() => {
    const isActive = refModels?.current?.isActive();
    if (isActive) {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    } else {
      refModels?.current?.scrollTo(-600);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    }
  }, []);

  const onPressStorage = useCallback(() => {
    const isActive = refStorage?.current?.isActive();
    if (isActive) {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    } else {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(-600);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    }
  }, []);

  const onPressCondition = useCallback(() => {
    const isActive = refCondition?.current?.isActive();
    if (isActive) {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    } else {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(-600);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    }
  }, []);

  const onPressColor = useCallback(() => {
    const isActive = refColor?.current?.isActive();
    if (isActive) {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    } else {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(-600);
      refProcessor?.current?.scrollTo(200);
    }
  }, []);

  const onPressProcessor = useCallback(() => {
    const isActive = refProcessor?.current?.isActive();
    if (isActive) {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    } else {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(-400);
    }
  }, []);

  const onPressRam = useCallback(() => {
    const isActive = refRam?.current?.isActive();
    if (isActive) {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    } else {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(-450);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    }
  }, []);

  const onPressSim = useCallback(() => {
    const isActive = refSim?.current?.isActive();
    if (isActive) {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    } else {
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(-400);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    }
  }, []);

  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");
  const [color, setColor] = useState("");
  const [sim, setSim] = useState("");
  const [processor, setProcessor] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handlePost = async () => {
    const userId = await AsyncStorage.getItem("authToken");
    const item = {
      name: name,
      condition: condition,
      storage: storage,
      ram: ram,
      color: color,
      sim: sim,
      processor: processor,
      description: description,
    };

    axios
      .post(`${apiUrl}/order/${userId}`, 
      item,
      {
        headers: { Authorization: `Bearer ${userId}` },
      })
      .then((response) => {
        console.log(response);
        Alert.alert("Posted successful", "You item is Ordered Successfully Please wait for price confirmation");
        setName("");
        setCondition("");
        setStorage("");
        setRam("");
        setColor("");
        setSim("");
        setProcessor("");
        setDescription("");
      })
      .catch((error) => {
        Alert.alert("Post Error", "An error occurred while Posting");
        console.log("Posting failed", error);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderSimp />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Text
          style={{
            backgroundColor: "#243B2E",
            textAlign: "center",
            paddingBottom: 10,
            color: "white",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Order Phones
        </Text>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressModels}>
              {name ? <Text>{name}</Text> : <Text>Models</Text>}
            </TouchableOpacity>
            <BottomSheet ref={refModels} identifier="Models">
              <View>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setName("Samsung");
                      refModels?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Samsung</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setName("Apple");
                      refModels?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Apple</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setName("Xiomi");
                      refModels?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Xiomi</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </BottomSheet>

            <TouchableOpacity style={styles.button} onPress={onPressStorage}>
              {storage ? <Text>{storage}</Text> : <Text>Storage</Text>}
            </TouchableOpacity>
            <BottomSheet ref={refStorage} identifier="Storage">
              <View>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setStorage("128 GB");
                      refStorage?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>128 GB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setStorage("256 GB");
                      refStorage?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>256 GB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setStorage("512 GB");
                      refStorage?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>512 GB</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </BottomSheet>

            <TouchableOpacity style={styles.button} onPress={onPressColor}>
              {color ? <Text>{color}</Text> : <Text>Color</Text>}
            </TouchableOpacity>
            <BottomSheet ref={refColor} identifier="Color">
              <View>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setColor("Black");
                      refColor?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Black</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setColor("Red");
                      refColor?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Red</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setColor("White");
                      refColor?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>White</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </BottomSheet>

            <TouchableOpacity style={styles.button} onPress={onPressCondition}>
              {condition ? <Text>{condition}</Text> : <Text>Condition</Text>}
            </TouchableOpacity>
            <BottomSheet ref={refCondition} identifier="Condition">
              <View>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setCondition("Brand New");
                      refCondition?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Brand New</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCondition("Refurbished");
                      refCondition?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Refurbished</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCondition("other");
                      refCondition?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Other</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </BottomSheet>

            <TouchableOpacity style={styles.button} onPress={onPressRam}>
              {ram ? <Text>{ram}</Text> : <Text>Ram</Text>}
            </TouchableOpacity>
            <BottomSheet ref={refRam} identifier="Ram">
              <View>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setRam("6 GB");
                      refRam?.current.scrollTo(100);
                    }}
                  >
                    <Text style={styles.innerButton}>6 GB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setRam("8 GB");
                      refRam?.current.scrollTo(100);
                    }}
                  >
                    <Text style={styles.innerButton}>8 GB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setRam("12 GB");
                      refRam?.current.scrollTo(100);
                    }}
                  >
                    <Text style={styles.innerButton}>12 GB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setRam("16 GB");
                      refRam?.current.scrollTo(100);
                    }}
                  >
                    <Text style={styles.innerButton}>16 GB</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </BottomSheet>

            <TouchableOpacity style={styles.button} onPress={onPressSim}>
              {sim ? <Text>{sim}</Text> : <Text>Sim</Text>}
            </TouchableOpacity>
            <BottomSheet ref={refSim} identifier="Sim">
              <View>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setSim("Dual");
                      refSim?.current.scrollTo(100);
                    }}
                  >
                    <Text style={styles.innerButton}>Dual</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSim("Single");
                      refSim?.current.scrollTo(100);
                    }}
                  >
                    <Text style={styles.innerButton}>Single</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSim("Single & E-sim");
                      refSim?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Single & E-sim</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </BottomSheet>

            <TouchableOpacity style={styles.button} onPress={onPressProcessor}>
              {processor ? <Text>{processor}</Text> : <Text>Processor</Text>}
            </TouchableOpacity>
            <BottomSheet ref={refProcessor} identifier="Processor">
              <View>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setProcessor("SnapDragon");
                      refProcessor?.current.scrollTo(100);
                    }}
                  >
                    <Text style={styles.innerButton}>SnapDargon</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setProcessor("Exness");
                      refProcessor?.current.scrollTo(100);
                    }}
                  >
                    <Text style={styles.innerButton}>Exness</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </BottomSheet>
            <TouchableOpacity style={styles.button}>
              <TextInput
                placeholder="Description"
                multiline
                onChangeText={(e) => setDescription(e)}
              />
            </TouchableOpacity>
            <View style={{ display: "flex", flexDirection: "row", margin: 10 }}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <AntDesign name="plussquare" size={60} color="#243B2E" />
              </TouchableOpacity>
              {assets ? (
                <View style={styles.container1}>
                  {assets?.map((p, index) => (
                    <View key={index} style={styles.item}>
                      <Image source={{ uri: p.uri }} height={60} width={60} />
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{ alignSelf: "center", marginStart: 30 }}>
                  <Text>Upload Image</Text>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={handlePost}>
              <Text style={styles.post}>Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerButton: {
    fontSize: 15,
    borderWidth: 1,
    paddingLeft: 10,
    paddingVertical: 10,
    color: "gray",
    borderColor: "gray",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 40,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  container1: {
    marginHorizontal: "auto",
    width: wp(80),
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",
  },

  item: {
    marginRight: 4,
    // Android-specific: controls the appearance of the shadow
  },
  post: {
    backgroundColor: "#243B2E",
    color: "white",
    padding: 7,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "800",
    margin: 20,
    elevation: -10,
  },
});

export default Order;
