import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HeaderSimp from "../components/HeaderSimp";
import BottomSheet, { BottomSheetRefProps } from "../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Order = () => {
  const refModels = useRef<BottomSheetRefProps>(null);
  const refStorage = useRef<BottomSheetRefProps>(null);

  const onPressModels = useCallback(() => {
    const isActive = refModels?.current?.isActive();
    
    if (isActive) {
      refStorage?.current?.scrollTo(0);
      refModels?.current?.scrollTo(0);
    } else {
      refStorage?.current?.scrollTo(0);
      refModels?.current?.scrollTo(-500);
    }
  }, []);
  
  const onPressStorage = useCallback(() => {
    const isActive = refStorage?.current?.isActive();
    if (isActive) {
      refModels?.current?.scrollTo(0);
      refStorage?.current?.scrollTo(0);
    } else {
      refModels?.current?.scrollTo(0);
      refStorage?.current?.scrollTo(-600);
    }
  }, []);
  return (
    <View style={styles.container}>
      <HeaderSimp />
      <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{backgroundColor:'#243B2E',textAlign:'center',paddingBottom:10,color:'white',fontSize:20,fontWeight:'700'}}>Order Now</Text>
        <TouchableOpacity style={styles.button} onPress={onPressModels}>
          <Text>Models</Text>
        </TouchableOpacity>
        <BottomSheet ref={refModels} identifier="Models">
          <View style={{ flex: 1, }} >
            <ScrollView>
              <TouchableOpacity>
                <Text style={styles.innerButton}>Samsung</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.innerButton}>Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.innerButton}>Xiomi</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </BottomSheet>

        <TouchableOpacity style={styles.button} onPress={onPressStorage}>
          <Text>Storage</Text>
        </TouchableOpacity>
        <BottomSheet ref={refStorage} identifier="Storage">
          <View style={{ flex: 1, }} >
            <ScrollView>
              <TouchableOpacity>
                <Text style={styles.innerButton}>128 GB</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.innerButton}>256 GB</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.innerButton}>512 GB</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin:10,
    padding: 10,
    backgroundColor:"#eee",
    shadowColor:'#000',
    shadowOpacity:40,
    borderWidth:0.5,
    borderColor:'gray',
  },
  innerButton:{
    fontSize : 20,
    borderBottomWidth:1,
    paddingLeft:10,
    color:"black",
    borderColor:'gray'
  }
});

export default Order;
