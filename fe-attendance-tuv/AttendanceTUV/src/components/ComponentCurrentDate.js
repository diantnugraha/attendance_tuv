import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const currentDate = new Date();
let currentDay = currentDate
  .toLocaleDateString('en-us', {weekday: 'long'})
  .split(',')[0];
const currentMonth = currentDate.toLocaleString('default', {month: 'long'});
const currentDateNumber = currentDate.getDate();
const currentYearNumber = currentDate.getFullYear();

export default function ComponentCurrentDate() {
  return (
    <View>
      <Text style={styles.textMonth}>
        {currentDay}, {currentDateNumber} {currentMonth} {currentYearNumber}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textMonth: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    fontSize: 16,
  },
});
