import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [rowData, setRowData] = useState([]);

  console.log("cart items", cart);
  useEffect(() => {
    axios
      .get("http://192.168.8.30:8000/itemss")
      .then((items) => setRowData(items.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {rowData.map((item) => (
        <Pressable
          key={item._id}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ margin: 10 }}>
            {/* <Image
              style={{ width: 100, height: 100, borderRadius: 8 }}
              source={{ uri: item.image }}
            /> */}
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            {cart.includes(item) ? (
              <Pressable
                onPress={() => setCart(cart.filter((x) => x.id !== item._id))}
              >
                <Text
                  style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    marginVertical: 10,
                    padding: 5,
                  }}
                >
                  REMOVE FROM CART
                </Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setCart([...cart, item])}>
                <Text
                  style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    marginVertical: 10,
                    padding: 5,
                  }}
                >
                  ADD TO CART
                </Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      ))}
      <View style={{ height: 1, borderColor: "gray", borderWidth: 2 }} />
      <Text>CART ITEMS ADDED: </Text>
      {cart.map((item) => (
        <View style={{ margin: 10 }}>
          {/* <Image
            style={{ width: 100, height: 100, borderRadius: 8 }}
            source={{ uri: item.image }}
          /> */}
          <Text>{item.name}</Text>
        </View>
      ))}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({});
