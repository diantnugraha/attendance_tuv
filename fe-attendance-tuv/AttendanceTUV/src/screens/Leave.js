import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function LeaveScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="flask" size={60} color="#001ED2"></Icon>
        <Text style={{fontSize: 18}}>COMING SOON</Text>
      </View>
    </SafeAreaView>
  );
}
