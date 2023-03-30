import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LogScreen() {
  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Icon name="flask" size={120} color="#001ED2"></Icon>
        <Text>Coming Soon</Text>
      </View>
    </>
  );
}
