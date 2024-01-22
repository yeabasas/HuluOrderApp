import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostsProfile = () => {
  const [posts,setPosts]=useState([]);

    const fetchPost = useCallback(async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
    
        const response = await axios.get(`http://192.168.8.4:8000/order/${token}`)
    
        if (response.data.error) {
          throw new Error(response.data.error);
        }
    
        setPosts([response.data.user]);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        // handle error more gracefully, such as by displaying an error message to the user
      }
    }, []);
  useEffect(()=>{
    fetchPost();
  },[fetchPost])
  return (
    <View style={{flex:1, justifyContent:'center',alignSelf:'center'}}>
      {
        posts?.map((p)=>(
          <Text key={Math.random()} style={{fontSize:35,marginBottom:5}}>{p.product}</Text>
        ))
      }
      <Text>PostsProfile</Text>
    </View>
  )
}

export default PostsProfile