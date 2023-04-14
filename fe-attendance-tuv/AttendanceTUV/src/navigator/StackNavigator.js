import {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import HomeScreen from '../screens/Home';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigatorContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import BottomNavigator from './BottomNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, headerBackTitleVisible: false}}
        />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeNavigator"
          component={BottomNavigator}
          options={{headerShown: false, headerBackTitleVisible: false}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#001ED2'} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, headerBackTitleVisible: false}}
        />
         <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{headerShown: false, headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="App"
          component={AppStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
}
