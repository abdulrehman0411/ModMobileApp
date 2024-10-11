import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View, Image, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Screen1 from './Screen1';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;
const SplashScreen = ({navigation}: SplashScreenProps) => {
  const storage = async () => {
    try {
      const data = await AsyncStorage.getItem('token');
      if (data) {
        navigation.replace('Dashboard'); // User is logged in
      } else {
        navigation.replace('Screen1'); // User is not logged in
      }
    } catch (error) {
      console.warn(error);
      navigation.replace('Screen1'); // Navigate to Screen1 in case of error
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      storage();
    }, 1000);

    return () => clearTimeout(timer);
  },[]);
  return (
    <>
      <ImageBackground
        style={styles.main}
        source={require('../assets/images/bgimg.png')}>
        <View style={styles.box}>
          <Image source={require('../assets/images/splash.png')} />
          <Text style={styles.heading}>Medika</Text>
          <Text style={styles.bodyText}>Health at your Service</Text>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  box: {
    flex: 1,
    marginTop: hp(18),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: hp(6),
    color: 'white',
    fontWeight: 'bold',
  },
  bodyText: {
    color: 'white',
    fontSize: hp(2.3),
  },
});

export default SplashScreen;
