import {Image, StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import SmallLogo from '../assets/SmallLogo';
import {fetchDetailUser} from '../features/detailEmployeeSlice';
import LogoutDialog from '../components/ComponentDialogLogout';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Card, IconButton} from 'react-native-paper';
export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();

  const detailUserData = useSelector(state => state.detailUser.data);

  const [isLogoutDialogVisible, setLogoutDialogVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchDetailUser());
  }, [dispatch]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('id');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerHeader}>
          <SmallLogo style={styles.containerLogo} />
        </View>
        <View style={styles.containerImage}>
          <Image
            style={styles.styleImage}
            source={{
              uri: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.containerAllContents}>
          <View style={styles.containerAccount}>
            <Text style={styles.textName}>
              {detailUserData?.detailEmployee?.employee_name}
            </Text>
            <Text style={styles.textTitle}>
              {detailUserData?.jobTitle?.name}
            </Text>
          </View>
          <View style={styles.containerProfileDetail}>
            <Icon name="location-outline" color="#001ED2" size={20}></Icon>
            <Text style={styles.textCompany}>
              {detailUserData?.detailEmployee?.employee_location}
            </Text>
          </View>
          <View style={styles.containerProfileDetail}>
            <Icon name="mail-open-outline" color="#001ED2" size={20}></Icon>
            <Text style={styles.textCompany}>
              {detailUserData?.detailEmployee?.employee_email}
            </Text>
          </View>
          <View style={styles.containerProfileDetail}>
            <Icon name="call-outline" color="#001ED2" size={20}></Icon>
            <Text style={styles.textCompany}>
              {detailUserData?.detailEmployee?.employee_contact}
            </Text>
          </View>
          <View style={styles.containerLogout}>
            <Button
              icon="logout"
              mode="contained"
              textColor="#FFFFFF"
              buttonColor="#001ED2"
              onPress={() => setLogoutDialogVisible(true)}>
              Logout
            </Button>
            <LogoutDialog
              visible={isLogoutDialogVisible}
              onDismiss={() => setLogoutDialogVisible(false)}
              onLogout={handleLogout}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001ED2',
  },
  containerAllContents: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: '-10%',
  },
  containerHeader: {
    backgroundColor: '#001ED2',
    height: '8%',
    alignItems: 'center'
  },
  containerImage: {
    alignItems: 'center',
    zIndex: 1,
  },
  containerStatus: {
    alignItems: 'center',
    padding: '5%',
  },

  containerAccount: {
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginVertical: '15%',
    paddingVertical: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLocation: {
    flexDirection: 'row',
    marginVertical: '5%',
  },
  containerProfile: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 20,
    alignItems: 'center',
    padding: '5%',
  },
  containerProfileSekeleton: {
    paddingHorizontal: '5%',
    width: 150,
  },
  containerProfileDetail: {
    backgroundColor: '#FFFFF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  containerLogo: {
    marginTop: '2%',
  },
  styleImage: {
    height: 120,
    width: 120,
    zIndex: 1,
  },
  textName: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 16,
  },
  textTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginTop: '1%',
    fontSize: 14,
  },
  containerLogout: {
    marginVertical: '10%',
    alignItems: 'center',
  },
  textCompany: {
    fontSize: 14,
    marginLeft: '2%',
    color: '#000000',
  },
  button: {
    borderRadius: 40,
  },
  buttonLogOut: {
    backgroundColor: '#001ED2',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
