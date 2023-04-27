import {Image, StyleSheet, Text, View} from 'react-native';
import LogoTUV from '../assets/Logo1';


export default function SplashScreen({navigation}) {

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
