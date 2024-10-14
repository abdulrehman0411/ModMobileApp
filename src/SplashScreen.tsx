import React, {useEffect} from 'react';
import {ImageBackground, View, Image, Text} from 'react-native';


import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './Naviagtors/index';
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
        className='flex-[1]'
        source={require('../assets/images/bgimg.png')}>
        <View className='flex-[1] gap-4 justify-start items-center mt-28'>
          <Image source={require('../assets/images/splash.png')} />
          <Text className='text-white font-bold text-5xl'>Medika</Text>
          <Text className='text-white text-xl'>Health at your Service</Text>
        </View>
      </ImageBackground>
    </>
  );
};



export default SplashScreen;
