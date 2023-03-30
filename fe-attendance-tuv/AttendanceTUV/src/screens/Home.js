import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import ComponentCurrentDate from '../components/ComponentCurrentDate';
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {attendanceIn, attendanceOut} from '../features/attendanceSlice';
import {useDispatch, useSelector} from 'react-redux';
import SmallLogo from '../assets/SmallLogo';
import ComponentLiveTime from '../components/ComponentClock';
import Icon from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {detailAttendance} from '../features/detailAttendanceSlice';
import {fetchDetailUser} from '../features/detailEmployeeSlice';
import LogoutDialog from '../components/ComponentDialogLogout';
import {fetchCurrentLocation} from '../features/locationSlice';

export default function Home({navigation}) {
  const dispatch = useDispatch();

  const detailUserData = useSelector(state => state.detailUser.data);
  const detailUserAttendanceData = useSelector(
    state => state.detailAttendance.data,
  );
  const getRoad = useSelector(state => state.locationUser.data);

  const [employee_latitude, setLatitude] = useState('');
  const [employee_longtitude, setLongitude] = useState('');
  const [attendance_time_in, setCurrentTime] = useState(null);
  const [attendance_time_out, setCurrentTimeOut] = useState(null);
  const [id_attendance, setDetailAttendance] = useState(null);
  const [employee_latitude_out, setLatitudeOut] = useState('');
  const [employee_longtitude_out, setLongitudeOut] = useState('');
  const [user_detail, setUserDetail] = useState(null);
  const [employee_imei, setImei] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [isLogoutDialogVisible, setLogoutDialogVisible] = useState(false);

  const [inDisabled, setInDisabled] = useState(false);
  const [outDisabled, setOutDisabled] = useState(false);
  const [errorIn, setErrorIn] = useState(false);

  const getDeviceNumber = async () => {
    try {
      const uniqueId = await DeviceInfo.syncUniqueId();
      setImei(uniqueId);
      console.log(uniqueId);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 50000,
      });
      const latitude = location.latitude;
      const longitude = location.longitude;
      setLatitude(latitude);
      setLongitude(longitude);
      setLatitudeOut(latitude);
      setLongitudeOut(longitude);
    } catch (error) {
      console.log(error);
      const {code, message} = error;
      console.warn(code, message);
    }
  };

  // const handleCheckIn = async () => {
  //   await AsyncStorage.removeItem('access_token');
  //   await AsyncStorage.removeItem('id');
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{name: 'Auth'}],
  //     }),
  //   );
  // };

  const attendanceCurrentTime = async () => {
    try {
      const currentDate = new Date();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      const currentTime = hours + ':' + minutes + ':' + seconds;
      setCurrentTime(currentTime);
      setCurrentTimeOut(currentTime);
    } catch (error) {
      console.log(error);
      const {code, message} = error;
      console.warn(code, message);
    }
  };

  const postAttendance = async () => {
    try {
      const result = await dispatch(
        attendanceIn({
          employee_imei,
          attendance_time_in,
          employee_latitude,
          employee_longtitude,
        }),
      );
      if (result.error) {
        setStatus('in');
        throw result.error.message;
      }
    } catch (error) {
      setStatus('in');
      throw error;
    }
  };

  const detailAttendanceUser = async () => {
    setTimeout(async () => {
      try {
        let data = await dispatch(detailAttendance());
        console.log(data.payload.id, 'ini dari detail');
        let id = data.payload.id;
        setDetailAttendance(id);
        console.log(id_attendance, 'ini detail');
      } catch (error) {
        console.log(error);
        const {code, message} = error;
        console.warn(code, message);
      }
    }, 2000);
  };

  const postAttendanceOut = async () => {
    try {
      await dispatch(
        attendanceOut({
          id_attendance,
          employee_latitude_out,
          employee_longtitude_out,
        }),
      );
    } catch (error) {
      console.log(error);
      const {code, message} = error;
      console.warn(code, message);
    }
  };

  const getNamedRoad = async () => {
    try {
      dispatch(
        fetchCurrentLocation({
          employee_latitude,
          employee_longtitude,
        }),
      );
    } catch (error) {
      console.log(error);
      const {code, message} = error;
      console.warn(code, message);
    }
  };

  useEffect(() => {
    getDeviceNumber();
    getCurrentLocation();
    attendanceCurrentTime();
    getNamedRoad();
    getStatus();
    dispatch(fetchDetailUser());
    dispatch(detailAttendance());
    dispatch(fetchCurrentLocation());
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

  const getStatus = async () => {
    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('toggleStatus');
      if (value !== null) {
        setStatus(value);
      } else {
        setStatus('in');
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleToggleButton = async () => {
    setIsLoading(true);
    if (status === 'in') {
      try {
        await getCurrentLocation();
        await attendanceCurrentTime();
        await postAttendance();
        await detailAttendanceUser();
        setStatus('out');
        await AsyncStorage.setItem('toggleStatus', 'out');
      } catch (error) {
        setStatus('in');
      }
    } else {
      try {
        await detailAttendance();
        await getCurrentLocation();
        await attendanceCurrentTime();
        await postAttendanceOut();
        await detailAttendanceUser();
        setStatus('in');
        await AsyncStorage.setItem('toggleStatus', 'in');
      } catch (error) {
        console.error(error);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <SmallLogo style={styles.containerLogo} />
        </View>
        <View style={styles.containerProfile}>
          <Image
            style={styles.styleImage}
            source={{
              uri: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
            }}
          />
          <View style={styles.containerProfileDetail}>
            <Text style={styles.textName}>
              {detailUserData?.detailEmployee?.employee_name}
            </Text>
            <Text style={styles.textTitle}>
              {detailUserData?.jobTitle?.name}
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.containerAllContents}>
          <View
            style={{
              marginHorizontal: '5%',
              marginTop: '15%',
              marginBottom: '5%',
            }}>
            <Text style={styles.textWelcome}>
              Welcome Back, {detailUserData?.detailEmployee?.employee_nickname}{' '}
              !
            </Text>

            {/* <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Current Time
            </Text> */}
          </View>
          <View style={styles.containerContentClock}>
            <ComponentLiveTime />
            <ComponentCurrentDate />

            <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
              <Button
                style={{paddingHorizontal: '10%'}}
                onPress={handleToggleButton}
                mode="contained"
                buttonColor="#001ED2">
                {isLoading ? (
                  <Icon name="stopwatch-outline" size={16} color="#FFFFFF">
                    Loading
                  </Icon>
                ) : (
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    {status === 'in' ? 'Check-in' : 'Check-out'}
                  </Text>
                )}
              </Button>
              <View style={styles.containerLocation}>
                <Icon
                  name="location-outline"
                  style={{marginTop: '5%'}}
                  size={18}
                  color="#808080"></Icon>
                <Text
                  style={styles.textNameRoad}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {getRoad?.display_name}
                </Text>
              </View>
              <View style={styles.containerAttendanceContent}>
                <View style={styles.containerStatus}>
                  <Icon name="time-outline" size={40} color="#001ED2" />
                  <Text style={styles.textStatus}>
                    {detailUserAttendanceData?.attendance_time_in.slice(0, 5)}
                  </Text>
                  <Text
                    style={{color: '#808080', fontFamily: 'Poppins-Regular'}}>
                    Clock In
                  </Text>
                </View>
                <View style={styles.containerStatus}>
                  <Icon name="timer-outline" size={40} color="#001ED2" />
                  <Text style={styles.textStatus}>
                    {detailUserAttendanceData?.attendance_time_out.slice(0, 5)}
                  </Text>
                  <Text
                    style={{color: '#808080', fontFamily: 'Poppins-Regular'}}>
                    Clock Out
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              marginHorizontal: '5%',
              marginTop: '8%',
              marginBottom: '5%',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Attendance Status
            </Text>
          </View> */}

          <View
            style={{
              marginHorizontal: '5%',
              marginTop: '8%',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Account
            </Text>
          </View>
          <View style={styles.containerAccount}>
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
          </View>
        </ScrollView>
      </View>

      {/* <View style={styles.containerFooter}>
        <Text style={styles.textCompany}>PT TÜV NORD Indonesia</Text>
      </View> */}
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
    height: '10%',
  },
  containerImage: {
    alignItems: 'center',
    marginTop: '-15%',
  },
  containerStatus: {
    alignItems: 'center',
    padding: '5%',
  },

  textWelcome: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginVertical: '1%',

    fontSize: 20,
  },

  containerContentClock: {
    backgroundColor: 'white',
    marginHorizontal: '5%',
    paddingVertical: '5%',
    alignItems: 'center',
    // borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  containerAttendanceContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  containerAccount: {
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginVertical: '5%',
    paddingVertical: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    marginTop: '-5%',
    marginHorizontal: '5%',
    zIndex: 1,
  },
  containerProfileSekeleton: {
    paddingHorizontal: '5%',
    width: 150,
  },
  containerProfileDetail: {
    paddingHorizontal: '5%',
  },
  containerLogo: {
    marginTop: '2%',
    marginLeft: '5%',
  },
  styleImage: {
    height: 55,
    width: 55,
  },
  textName: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textTitle: {
    color: 'black',
    marginTop: '1%',
    fontSize: 14,
    width: 200,
  },
  containerLogout: {
    marginVertical: '5%',
    alignItems: 'center',
  },
  containerFooter: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#001ED2',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    marginTop: '2%',
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  textNameRoad: {
    marginLeft: '2%',
    marginRight: '2%',
    fontFamily: 'Poppins-Reguler',
    paddingHorizontal: '2%',
    marginVertical: '5%',
    color: '#808080',
    fontSize: 14,
  },
  textCompany: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
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
