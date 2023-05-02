import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {attendanceIn, attendanceOut} from '../features/attendanceSlice';
import {useDispatch, useSelector} from 'react-redux';
import SmallLogo from '../assets/SmallLogo';
import ComponentLiveTime from '../components/ComponentClock';
import Icon from 'react-native-vector-icons/Ionicons';
import {detailAttendance} from '../features/detailAttendanceSlice';
import {fetchDetailUser} from '../features/detailEmployeeSlice';
import {fetchCurrentLocation} from '../features/locationSlice';

export default function Home({navigation}) {
  const dispatch = useDispatch();

  const detailUserData = useSelector(state => state.detailUser.data);
  const detailUserAttendanceData = useSelector(
    state => state.detailAttendance.data,
  );

  const currentDate = new Date();
  let currentDay = currentDate
    .toLocaleDateString('en-us', {weekday: 'long'})
    .split(',')[0];
  const currentMonth = currentDate.toLocaleString('default', {month: 'long'});
  const currentDateNumber = currentDate.getDate();
  const currentYearNumber = currentDate.getFullYear();

  const [employee_latitude, setLatitude] = useState('');
  const [employee_longitude, setLongitude] = useState('');
  const [id_attendance, setDetailAttendance] = useState(null);
  const [employee_latitude_out, setLatitudeOut] = useState('');
  const [employee_longitude_out, setLongitudeOut] = useState('');
  const [employee_imei, setImei] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getRoad = useSelector(state => state.locationUser.data);
  const getDeviceNumber = async () => {
    try {
      const uniqueId = await DeviceInfo.syncUniqueId();
      setImei(uniqueId);
    } catch (err) {
      throw err;
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
      setLocation({latitude, longitude});
      setLatitude(latitude);
      setLongitude(longitude);
      setLatitudeOut(latitude);
      setLongitudeOut(longitude);
    } catch (error) {
      throw error;
    }
  };

  const postAttendance = async () => {
    try {
      const result = await dispatch(
        attendanceIn({
          employee_imei,
          employee_latitude,
          employee_longitude,
        }),
      );
      if (result.error) {
        setStatus('in');
        throw result.error.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const detailAttendanceUser = async () => {
    setTimeout(async () => {
      try {
        let data = await dispatch(detailAttendance());

        let id = data.payload.id;
        setDetailAttendance(id);
      } catch (error) {
        throw error;
      }
    }, 2000);
  };

  const postAttendanceOut = async () => {
    try {
      await dispatch(
        attendanceOut({
          id_attendance,
          employee_latitude_out,
          employee_longitude_out,
        }),
      );
    } catch (error) {
      throw error;
    }
  };

  const fetchData = () => {
    getDeviceNumber();
    getCurrentLocation();
    getStatus();
    currentDay;
    currentDateNumber;
    currentMonth;
    currentYearNumber;
    dispatch(fetchDetailUser());
    dispatch(detailAttendance());
    dispatch(fetchCurrentLocation(location));
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(fetchCurrentLocation(location));
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getDeviceNumber();
    getCurrentLocation();
    getStatus();
    dispatch(fetchDetailUser());
    dispatch(detailAttendance());
  }, [dispatch]);

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
      throw error;
    }
    setIsLoading(false);
  };

  const handleToggleButton = async () => {
    setIsLoading(true);
    if (status === 'in') {
      try {
        await getCurrentLocation();
        await postAttendance();
        await detailAttendanceUser();
        setStatus('out');
        await AsyncStorage.setItem('toggleStatus', 'out');
      } catch (error) {
        setStatus('in');
      }
    } else {
      try {
        await postAttendanceOut();
        setStatus('in');
        await AsyncStorage.setItem('toggleStatus', 'in');
      } catch (error) {
        throw error;
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerHeader}>
          <SmallLogo style={styles.containerLogo} />
        </View>
        {loading ? (
          <View style={styles.containerProfile}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
        ) : (
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
        )}
        <View style={{flex: 1}}>
          {loading ? (
            <View style={styles.containerAllContentsLoading} >
                <ActivityIndicator size="large" color="#001ED2" />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.containerAllContents}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View
                style={{
                  marginHorizontal: '5%',
                  marginTop: '15%',
                  marginBottom: '5%',
                }}>
                <Text style={styles.textWelcome}>
                  Welcome Back,{' '}
                  {detailUserData?.detailEmployee?.employee_nickname} !
                </Text>
                <Text style={styles.textReady}>
                  Are you ready to working today?
                </Text>
              </View>
              <View style={styles.containerContentClock}>
                <ComponentLiveTime />
                <Text style={styles.textMonth}>
                  {currentDay}, {currentDateNumber} {currentMonth}{' '}
                  {currentYearNumber}
                </Text>

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
                      name="location"
                      style={{marginTop: '5.5%'}}
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
                      <Icon name="time" size={40} color="#001ED2" />
                      {detailUserAttendanceData?.attendance_time_in ? (
                        <>
                          <Text style={styles.textStatus}>
                            {detailUserAttendanceData?.attendance_time_in.slice(
                              0,
                              5,
                            )}
                          </Text>
                          <Text
                            style={{
                              color: '#808080',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Clock In
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.textStatus}>.. : ..</Text>
                          <Text
                            style={{
                              color: '#808080',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Clock In
                          </Text>
                        </>
                      )}
                    </View>
                    <View style={styles.containerStatus}>
                      <Icon name="timer" size={40} color="#001ED2" />
                      {detailUserAttendanceData?.attendance_time_out ? (
                        <>
                          <Text style={styles.textStatus}>
                            {detailUserAttendanceData?.attendance_time_out.slice(
                              0,
                              5,
                            )}
                          </Text>
                          <Text
                            style={{
                              color: '#808080',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Clock Out
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.textStatus}>.. : ..</Text>
                          <Text
                            style={{
                              color: '#808080',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Clock Out
                          </Text>
                        </>
                      )}
                    </View>
                    <View style={styles.containerStatus}>
                      <Icon name="stopwatch" size={40} color="#001ED2" />
                      {detailUserAttendanceData?.total_hours ? (
                        <>
                          <Text style={styles.textStatus}>
                            {detailUserAttendanceData.total_hours} Hrs
                          </Text>
                          <Text
                            style={{
                              color: '#808080',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Work Hr's
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.textStatus}>Hrs</Text>
                          <Text
                            style={{
                              color: '#808080',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Work Hr's
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
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
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: '-10%',
  },
  containerAllContentsLoading: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: '-10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerHeader: {
    backgroundColor: '#001ED2',
    height: '10%',
    alignItems: 'center',
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

  textReady: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    fontSize: 14,
  },

  containerContentClock: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: '5%',
    paddingVertical: '5%',
    alignItems: 'center',
  },
  containerAttendanceContent: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerAccount: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
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
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: '2%',
    marginVertical: '5%',
    color: '#808080',
    fontSize: 14,
  },
  textCompany: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  textMonth: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    fontSize: 16,
  },
});
