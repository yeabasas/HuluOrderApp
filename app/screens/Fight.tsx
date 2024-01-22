import React, { useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { ImagePicker, Album, Asset } from "expo-image-multiple-picker";

const Fight = () => {
  const [open, setOpen] = useState(true);
  const [album, setAlbum] = useState<Album | undefined>();
  const [assets, setAssets] = useState<Asset[]>([]);

  if (open) {
    return (
      <View style={{ flex: 1 }}>
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
        />
      </View>
    );
  }
  console.log("image", assets);
  return (
    <View style={{marginTop:50}}>
      <Button title="select image" onPress={()=>setOpen(true)}/>
      {assets?.map((p, index) => (
        <View key={index}>
          <Image source={{ uri: p.uri }} height={100} width={100}/>
        </View>
      ))}
    </View>
  );
};

export default Fight;
