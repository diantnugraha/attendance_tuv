import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLogAttendance} from '../features/logAttendanceSlice';
import {useEffect, useState} from 'react';
import SmallLogo from '../assets/SmallLogo';
import moment from 'moment';

export default function LogScreen() {
  const dispatch = useDispatch();

  const logAttendance = useSelector(state => state.fetchLogAttendance.data);

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    dispatch(fetchLogAttendance());
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerHeader}>
          <SmallLogo style={styles.containerLogo} />
        </View>
        <View style={styles.containerAllContents}>
          <Text
            style={{
              marginLeft: '3%',
              marginTop: '5%',
              fontFamily: 'Poppins-SemiBold',
              marginBottom: '2%',
              fontSize: 16,
            }}>
            History Attendance
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: '15%'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {logAttendance?.map((log, index) => (
              <Card
                style={{
                  marginHorizontal: '2%',
                  backgroundColor: '#FFFFFF',
                  marginVertical: '2%',
                }}
                key={log.id}>
                <Card.Content>
                  <View>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                      {moment(log?.attendance_date).format('dddd, D MMMM YYYY')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '2%',
                      borderTopWidth: 1,
                      borderColor: '#CCCCCC',
                    }}>
                    <View style={{marginTop: '2%'}}>
                      <Text
                        style={{
                          marginTop: '2%',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Clock In
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {log?.attendance_time_in.slice(0, 5)}
                      </Text>
                    </View>
                    <View style={{marginTop: '2%', marginLeft: '15%'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Clock Out
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {log?.attendance_time_out.slice(0, 5)}
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop: '2%'}}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                      Total Working Hours : {log?.total_hours} Hours
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
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
    marginTop: '5%',
  },
  containerHeader: {
    backgroundColor: '#001ED2',
    height: '5%',
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
});
