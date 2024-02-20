import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Brand = () => {
  const [categories, setCategories] = React.useState("");
  const navigation: any = useNavigation();
  const handlePress = (category: string) => {
      navigation.navigate("AddItems", { brand: category });
  };
  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <TouchableOpacity
           onPress={() => {
            navigation.setOptions({
              params: { category: "Phone" },
            });
            navigation.navigate('AddItem',{category:"sam"});
          }}
          >
            <Text style={styles.innerButton}>samsung</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
                setCategories("Tablet");
              handlePress("Apple");
            }}
          >
            <Text style={styles.innerButton}>apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handlePress("Computer");
            }}
          >
            <Text style={styles.innerButton}>Computer</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Brand;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
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
});
