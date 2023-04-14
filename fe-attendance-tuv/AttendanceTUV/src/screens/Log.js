import {Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogAttendance } from '../features/logAttendanceSlice';
import { useEffect } from 'react';
import SmallLogo from '../assets/SmallLogo';


export default function LogScreen() {
  const dispatch = useDispatch()

  const logAttendance = useSelector(state => state.fetchLogAttendance.data)
 
  useEffect(()=> {
    dispatch(fetchLogAttendance())
  }, [dispatch])


  return (
    <>
    <SafeAreaView style={styles.container}>
    <View style={styles.containerHeader}>
          <SmallLogo style={styles.containerLogo} />
        </View>
      <View style={styles.containerAllContents}>
        {/* <Icon name="flask" size={120} color="#001ED2"></Icon>
        <Text>Coming Soon</Text> */}
        <DataTable>
        <DataTable.Header>
          {/* <DataTable.Title>No</DataTable.Title> */}
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Clock In</DataTable.Title>
          <DataTable.Title>Clock Out</DataTable.Title>
        </DataTable.Header>

        {logAttendance?.map((log, index)=>(
        <DataTable.Row key={log.id}>
          {/* <DataTable.Cell style={{padding: 0.5}}>{index+1}</DataTable.Cell> */}
          <DataTable.Cell>{log?.attendance_date}</DataTable.Cell>
          <DataTable.Cell>{log?.attendance_status}</DataTable.Cell>
          <DataTable.Cell>{log?.attendance_time_in.slice(0, 5)}</DataTable.Cell>
          <DataTable.Cell>{log?.attendance_time_out.slice(0,5)}</DataTable.Cell>
        </DataTable.Row>
        ))}

          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
            console.log(page);
            }}
          label="1-2 of 6"
        />
        </DataTable>
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

  textReady: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    fontSize: 14,
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
    fontFamily: 'Poppins-Regular',
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