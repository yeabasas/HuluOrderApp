import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './Order';
import Profile from './Harry';
import Login from './Login';
import Ionicons from '@expo/vector-icons/Ionicons';

const RightDrawer = createDrawerNavigator();
const Stack = createStackNavigator();


const DashboardIcon =({focused, color, size})=><Ionicons name='md-speedometer' size={size} color={color} />
const ProfileIcon =({focused, color, size})=><Ionicons name='md-person' size={size} color={color} />


const Fight = () => {
  return (
          <RightDrawer.Navigator
          screenOptions={{
            drawerStyle:{
              backgroundColor:'#fff',
              width:230
            },
            headerTitle:'',
            headerTransparent: true,
            headerStyle:{
              backgroundColor:'#fff',

            },
            headerTintColor:'#fff'
          }}
          >
            <RightDrawer.Screen name="Dashboard" component={Dashboard} options={{ drawerIcon: DashboardIcon }} />
            <RightDrawer.Screen name="Profile" component={Profile} options={{ drawerIcon: ProfileIcon }} />
            <RightDrawer.Screen name="Login" component={Login} options={{ drawerIcon: ProfileIcon }} />
          </RightDrawer.Navigator>
      
    

  );
};

export default Fight;