import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const currentDate = new Date();
let now = new Date()
  .toLocaleDateString('en-us', {weekday: 'long'})
  .split(',')[0];
console.log(now, 'dari crrent');

export default function ComponentCurrentDay() {
  return (
    <View>
      <Text style={styles.textDay}>{now}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textDay: {
    fontFamily: 'Oswald-Medium',
    fontSize: 30,
    color: 'black',
  },
});
