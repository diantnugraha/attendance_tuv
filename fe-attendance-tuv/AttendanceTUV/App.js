/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, SafeAreaView, Image, View, SafeAreaViewBase} from 'react-native';
import {Provider} from 'react-redux';
import StackNavigator from './src/navigator/StackNavigator';
import {store} from './src/stores/store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001ED2',
    justifyContent: 'center',
  },
});
