import {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LogoTUV from '../assets/Logo1';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     const bootstrapAsync = async () => {
  //       try {
  //         const access_token = await AsyncStorage.getItem('access_token');
  //         const routes = access_token ? ['App'] : ['OnboardingScreen', 'Auth'];
  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 0,
  //             routes: routes.map(route => ({ name: route })),
  //           }),
  //         );
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     };

  //     bootstrapAsync();
  //   }, 2500);
  // }, []);

  return (
    <>
      <View style={styles.container}>
        <LogoTUV />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001ED2',
  },
});
