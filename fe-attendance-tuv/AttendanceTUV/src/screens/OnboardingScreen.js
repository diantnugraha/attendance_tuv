import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';


const data = [
  {
    title: 'Get Your Location',
    text: 'Allow your location and ready to check-in',
    image: require('../assets/images/Location.png'),
  },
  {
    title: 'Ready to CheckIn',
    text: 'You can check-in or check-out for attendance today',
    image: require('../assets/images/Checklist.png'),
  },
  {
    title: 'History Your Attendance',
    text: 'You can track all history attendance',
    image: require('../assets/images/Logs.png'),
  },
];

const OnboardingScreen = (props) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Done</Text>
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>Prev</Text>
      </View>
    );
  };

  const handleDone = () => {
    props.handleDone();
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        renderDoneButton={renderDoneButton}
        showPrevButton
        onDone={handleDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    height: 250,
    width: 250
  },
  title: {
    fontSize: 24,
    color: "#808080",
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 60,
  },
  text: {
    fontSize: 14,
    color: "#808080",
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 60,
    marginTop: 20,
  },
  dotStyle: {
    backgroundColor: "gray",
  },
  activeDotStyle: {
    backgroundColor: "#001ED2",
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rightText: {
    color: "#001ED2",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  leftText: {
    color: "#001ED2",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 50,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: -40,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: "#FFFFFF",
  },
});

export default OnboardingScreen;