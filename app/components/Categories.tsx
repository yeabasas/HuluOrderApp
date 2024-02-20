import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Categories = ({navigation}) => {
  const [categories, setCategories] = React.useState("");
  const handlePress = (category: string) => {
      navigation.navigate("AddItem", { category: category });
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
                navigation.navigate('AddItem',{category:"Phone"});
              }}
          >
            <Text style={styles.innerButton}>Phone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
                setCategories("Tablet");
              handlePress("Tablet");
            }}
          >
            <Text style={styles.innerButton}>Tablet</Text>
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

export default Categories;

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
