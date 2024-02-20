//import liraries
import React, { useState } from 'react';
import { View, Button, Image,StyleSheet } from 'react-native';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import axios from 'axios';
// create a component
const Post = () => {
    const [image, setImage] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.error) {
        setImage(response);
      }
    });
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type || 'image/jpeg', // Add a default type if not provided
      name: image.fileName || 'image.jpg', // Add a default name if not provided
    });

    try {
      await axios.post('http://your_backend_url/upload', formData);
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <View>
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Post;
