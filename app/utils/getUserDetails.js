import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../../UserContext';
import {useContext} from 'react';

export const getUserDetails = async () => {
    
    try {
      const { userId, setUserId } = useContext(UserType);
    // Get the token from AsyncStorage
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      // Token not found, handle accordingly
      return null;
    }

    // Make a request to a protected endpoint on your server
    const response = await axios.get(`http://192.168.8.2:8000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the user details
    return response.data;
  } catch (error) {
    // Handle error (e.g., token expired, network error)
    return null;
  }
};
