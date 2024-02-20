import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import HeaderSimp from "../components/HeaderSimp";
// import Select2 from "react-native-select-two";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImagePicker, Album, Asset } from "expo-image-multiple-picker";
import BottomSheet, { BottomSheetRefProps } from "../components/BottomSheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddItems = ({ navigation }) => {
  const refModels = useRef<BottomSheetRefProps>(null);
  const refCategories = useRef<BottomSheetRefProps>(null);
  const refStorage = useRef<BottomSheetRefProps>(null);
  const refSim = useRef<BottomSheetRefProps>(null);
  const refProcessor = useRef<BottomSheetRefProps>(null);
  const refColor = useRef<BottomSheetRefProps>(null);
  const refCondition = useRef<BottomSheetRefProps>(null);
  const refRam = useRef<BottomSheetRefProps>(null);

  const onPressCategories = useCallback(() => {
    const isActive = refCategories?.current?.isActive();
    if (isActive) {
      refCategories?.current?.scrollTo(200);
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    } else {
      refCategories?.current?.scrollTo(-600);
      refModels?.current?.scrollTo(200);
      refStorage?.current?.scrollTo(200);
      refCondition?.current?.scrollTo(200);
      refSim?.current?.scrollTo(200);
      refRam?.current?.scrollTo(200);
      refColor?.current?.scrollTo(200);
      refProcessor?.current?.scrollTo(200);
    }
  }, []);
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
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");

  const FormData = global.FormData;

  // const handlePost = async () => {
  //   try {
  //     // const uri = assets[0].uri;
  //     // const responseImg = await fetch(uri);
  //     // const blob = await responseImg.blob();

  //     const formData = new FormData();
  //     // formData.append("image", blob, assets[0].uri);

  //     formData.append("name", name);
  //     formData.append("condition", condition);
  //     formData.append("sim", sim);
  //     formData.append("storage", storage);
  //     formData.append("ram", ram);
  //     formData.append("color", color);
  //     formData.append("processor", processor);
  //     formData.append("description", description);
  //     formData.append("price", price);

  //     const response = await fetch("http://192.168.8.4:8000/postItem", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.ok) {
  //       console.log("Post submitted successfully");
  //       // Reset form state after successful submission
  //       setAssets(null);
  //       setName("");
  //       setCondition("");
  //       setSim("");
  //       setStorage("");
  //       setRam("");
  //       setColor("");
  //       setProcessor("");
  //       setDescription("");
  //       setPrice("");
  //     } else {
  //       console.log("Failed to submit post");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting post:", error);
  //   }
  // };
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  };
  useEffect(() => {
    fetchUser();
    console.log();
  }, [fetchUser]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handlePost = async () => {
    const userId = await AsyncStorage.getItem("authToken");
    const item = {
      name: name,
      categories: categories,
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
  .post(`${apiUrl}/postItem/${userId}`, item, {
        headers: { Authorization: `Bearer ${userId}` },
      })
      .then((response) => {
        console.log(response);
        Alert.alert("Posted successful", "You item been Posted Successfully");
        setName("");
        setCategories("");
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

  const handleImage = async () => {
    if (assets.length === 0) {
      console.log("No image selected.");
      return;
    }

    const formData = new FormData();
    const image = assets[0];

    // Create a Blob from the image data
    const blob = await fetch(image.filename).then((response) =>
      response.blob()
    );

    // Append the Blob to the FormData
    formData.append("image", blob, image.filename);

    try {
      const response = await fetch("http://192.168.8.3:9000/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        console.log("Image uploaded successfully.");
        // Handle success, e.g., show a success message
      } else {
        console.log("Image upload failed.");
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState<Album | undefined>();
  const [assets, setAssets] = useState<Asset[]>([]);

  if (open) {
    return (
      <ImagePicker
        onSave={(assets) => {
          setAssets(assets);
          setOpen(false);
        }}
        onCancel={() => {
          setAssets([]);
          setAlbum(undefined);
          setOpen(false);
        }}
        onSelectAlbum={(album) => setAlbum(album)}
        selected={assets}
        selectedAlbum={album}
        multiple
        galleryColumns={3}
        albumColumns={3}
        limit={5}
      />
    );
  }

  return (
    <View style={styles.container}>
      <HeaderSimp />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
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
            <TouchableOpacity style={styles.button} onPress={onPressCategories}>
              {categories ? <Text>{categories}</Text> : <Text>Categories</Text>}
            </TouchableOpacity>
            <BottomSheet ref={refCategories} identifier="Categories">
              <View>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setCategories("Phone");
                      refCategories?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Phone</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCategories("Tablet");
                      refCategories?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Tablet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCategories("Computer");
                      refCategories?.current.scrollTo(0);
                    }}
                  >
                    <Text style={styles.innerButton}>Computer</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </BottomSheet>
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
                      refRam?.current.scrollTo(200);
                    }}
                  >
                    <Text style={styles.innerButton}>6 GB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setRam("8 GB");
                      refRam?.current.scrollTo(200);
                    }}
                  >
                    <Text style={styles.innerButton}>8 GB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setRam("12 GB");
                      refRam?.current.scrollTo(200);
                    }}
                  >
                    <Text style={styles.innerButton}>12 GB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setRam("16 GB");
                      refRam?.current.scrollTo(200);
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
                      refSim?.current.scrollTo(200);
                    }}
                  >
                    <Text style={styles.innerButton}>Dual</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSim("Single");
                      refSim?.current.scrollTo(200);
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
                      refProcessor?.current.scrollTo(200);
                    }}
                  >
                    <Text style={styles.innerButton}>SnapDargon</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setProcessor("Exness");
                      refProcessor?.current.scrollTo(200);
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
                value={description}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <TextInput
                placeholder="Price"
                onChangeText={(e) => setPrice(e)}
                value={price}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePost}>
              <Text style={styles.post}>Post</Text>
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

export default AddItems;
