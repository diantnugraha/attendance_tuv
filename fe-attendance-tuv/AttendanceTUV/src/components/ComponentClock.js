import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const ComponentLiveTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currenSecond, setCurrentSecond] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentSecond(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };

  const options2 = {
    second: '2-digit',
    timeZone: 'Asia/Jakarta',
  };

  return (
    <View>
      <Text style={stylesheet.textClock}>
        {currentTime.toLocaleTimeString('en-US', options)}
      </Text>
    </View>
  );
};

export default ComponentLiveTime;

const stylesheet = StyleSheet.create({
  textClock: {
    fontFamily: 'Poppins-Bold',
    color: '#3B3B3B',
    fontSize: 55,
    marginBottom: '-2%',
    marginTop: '5%',
  },
  textSecond: {
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
  },
});
