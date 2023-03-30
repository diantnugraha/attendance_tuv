import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home';
import LogScreen from '../screens/Log';
import ProfileScreen from '../screens/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={true}
      activeColor="#FFFFFF"
      inactiveColor="#a8a8a8"
      height={10}
      barStyle={{
        backgroundColor: '#001ED2',
        height: 70,
        alignSelf: 'auto',
      }}
      tabBarOptions={{
        showLabel: true,
        tabBarLabelStyle: {fontSize: 14, color: '#FFFFFF'},
        tabBarActiveTintColor: '#FFFFFF',
        tabBarLabelStyle: {color: '#FFFFFF'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Logs"
        component={LogScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="receipt-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
