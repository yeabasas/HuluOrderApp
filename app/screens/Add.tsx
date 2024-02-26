// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Button,
//   Image,
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import * as FileSystem from "expo-file-system";
// import * as ImagePicker from "expo-image-picker";
// import {
//   GestureHandlerRootView,
//   ScrollView,
// } from "react-native-gesture-handler";
// import { Alert } from "react-native";

// const imgDir = FileSystem.documentDirectory + "images/";

// const ensureDirExists = async () => {
//   const dirInfo = await FileSystem.getInfoAsync(imgDir);
//   if (!dirInfo.exists) {
//     await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
//   }
// };

// const Add = () => {
//   const [images, setImages] = React.useState<string[] | null>([]);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const apiUrl = process.env.EXPO_PUBLIC_API_URL;

//   useEffect(() => {
//     loadImages();
//   }, [images]);
//   const loadImages = async () => {
//     await ensureDirExists();
//     const files = await FileSystem.readDirectoryAsync(imgDir);
//     if (files.length > 0) {
//       setImages(files.map((f) => imgDir + f));
//     }
//   };
//   const selectImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if (!result.canceled) {
//       saveImage(result.assets[0].uri);
//       console.log(result.assets[0].uri);
//     }
//   };

//   const saveImage = async (uri: string) => {
//     await ensureDirExists();
//     const filename = new Date().getTime() + ".jpg";
//     const dest = imgDir + filename;
//     await FileSystem.copyAsync({ from: uri, to: dest });
//     alert("Saved image to " + dest);
//     setImages([...images, dest]);
//   };

//   const renderImage = ({ item }: { item: string }) => {
//     return (
//       <GestureHandlerRootView>
//         <ScrollView
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         >
//           <View style={{ flex: 1, gap: 20 }}>
//             <Image
//               source={{ uri: item }}
//               style={{ width: 100, height: 100, margin: 5 }}
//             />
//           </View>
//         </ScrollView>
//       </GestureHandlerRootView>
//     );
//   };

//   const onRefresh = () => {
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 5000);
//     loadImages();
//   };

//   const deleteImage = async () => {
//     const promises = images.map(async (uri) => {
//       await FileSystem.deleteAsync(uri);
//       setImages(images.filter((value) => value !== uri));
//     });
//   };

//   const uploadImage = async () => {
//     setLoading(true);
//     const promises = images.map((uri) =>
//       FileSystem.uploadAsync(`http://192.168.8.28:9000/upload`, uri, {
//         httpMethod: "POST",
//         uploadType: FileSystem.FileSystemUploadType.MULTIPART,
//         fieldName: "file",
//       })
//     );

//     try {
//       await Promise.all(promises);
//       deleteImage();
//       setLoading(false);
//       Alert.alert("Success", "All files have been uploaded!");
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       setLoading(false);
//       Alert.alert("Error", "Failed to upload all files");
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, gap: 20, marginTop: 40 }}>
//       <View>
//         <Button title="Select an image" onPress={selectImage} />
//       </View>
//       <FlatList data={images} renderItem={renderImage} />
//       <Button title="Upload All" onPress={uploadImage} disabled={loading} />
//       <Button title="delete" onPress={deleteImage} disabled={loading} />
//       {loading && (
//         <View
//           style={[
//             StyleSheet.absoluteFill,
//             {
//               backgroundColor: "rgba(0,0,0,0.3)",
//               alignItems: "center",
//               justifyContent: "center",
//             },
//           ]}
//         >
//           <ActivityIndicator color="#000" animating size="large" />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Add;

// const styles = StyleSheet.create({});
