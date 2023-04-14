import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useState} from 'react';
import LogoTUV from '../assets/Logo1';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {login} from '../features/usersSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {Button} from 'react-native-paper';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_imei, setImei] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  console.log(email, 'ini email');
  console.log(password, 'ini passss');

  const getUserUniqueId = async () => {
    try {
      const uniqueId = await DeviceInfo.syncUniqueId();
      setImei(uniqueId);
    } catch (err) {
      console.log(err, 'ini dari eeeerrrrr');
      throw err;
    }
  };

  useEffect(() => {
    getUserUniqueId();
  }, []);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const handleLogin = async () => {
    try {
      const res = await dispatch(login({email, password, user_imei}));
      console.log('sampai dsini');
      if (res?.payload?.access_token) {
        const access_token = res?.payload?.access_token;
        const id = String(res?.payload?.payload?.id);
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('id', id);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'App'}],
          }),
        );
      } else {
        throw res.error;
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <LogoTUV />
        </View>
        <ScrollView>
          <View style={styles.containerContent}>
            <View>
              <Text style={styles.textSignIn}>Sign In</Text>
              <Text style={styles.textContinue}>
                Please sign in to continue
              </Text>
            </View>
            <View>
              <Text style={styles.textFieldEmail}>Email Address</Text>
              <TextInput
                label="Email"
                mode="outlined"
                onChangeText={email => setEmail(email)}
                value={email}
                activeOutlineColor="#001ED2"
                textColor="black"
                selectionColor="black"
                placeholder="Email address"
                outlineStyle={{borderRadius: 10}}
                style={{marginHorizontal: '8%', backgroundColor: '#FFFFFF'}}
              />
              <Text style={styles.textFieldPassword}>Password</Text>
              <TextInput
                label="Password"
                mode="outlined"
                onChangeText={password => setPassword(password)}
                value={password}
                activeOutlineColor="#001ED2"
                textColor="black"
                selectionColor="black"
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                right={
                  <TextInput.Icon icon="eye" onPress={toggleSecureTextEntry} />
                }
                outlineStyle={{borderRadius: 10}}
                style={{marginHorizontal: '8%', backgroundColor: '#FFFFFF'}}
              />
            </View>

            <View style={{margin: '8%'}}>
              <Button
                mode="contained"
                buttonColor="#001ED2"
                textColor="#FFFFFF"
                onPress={handleLogin}>
                Sign In
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerLogo: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#001ED2',
    justifyContent: 'center',
    height: '20%',
    alignItems: 'center',
    alignContent: 'flex-end',
  },
  textSignIn: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    paddingLeft: '8%',
    paddingTop: '15%',
    fontWeight: 'bold',
    color: 'black',
  },
  textContinue: {
    fontSize: 20,
    paddingLeft: '8%',
    paddingTop: '1%',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  textFieldEmail: {
    fontSize: 16,
    paddingLeft: '8%',
    paddingTop: '15%',
    paddingBottom: '2%',
    color: 'black',
    fontWeight: 'bold',
  },
  textFieldPassword: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingLeft: '8%',
    paddingTop: '5%',
    paddingBottom: '2%',
    color: 'black',
  },
});
