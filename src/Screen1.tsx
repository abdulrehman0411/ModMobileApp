import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './Naviagtors/index';

type Screen1Props = NativeStackScreenProps<RootStackParamList, 'Screen1'>;
const Screen1 = ({navigation}: Screen1Props) => {
  return (
    <SafeAreaView className="flex-[1]">
      <ImageBackground
        className="flex-[1]"
        source={require('../assets/images/bgimg2.png')}>
        <View className="flex-[1]"></View>

        <ImageBackground
          className="flex-[1] overflow-hidden rounded-t-3xl"
          source={require('../assets/images/halfbgimg.png')}>
          <View className='flex-[1] mt-8'>
            <Text className='text-white text-4xl font-bold ml-4'>Find a Service</Text>
            <Text className='text-white text-4xl font-bold ml-4'>for you healthcare</Text>
            <Text className='text-white ml-4 mr-24 my-4 text-base' >
              A healthy community benefits every person in it. And community
              health is one means of achieving a healthy community.
            </Text>
            <LinearGradient
              className='mt-4 mx-3 rounded-xl'
              colors={['#01C6B2', '#01665C']}>
              <Pressable
                className='justify-center items-center p-2'
                onPress={() => navigation.navigate('Screen2')}>
                <Text className='text-white my-1 text-xl'>
                  Create Account
                </Text>
              </Pressable>
            </LinearGradient>

            <Pressable
              className='justify-center items-center p-2 mt-4 mx-3 rounded-xl border-white border-2'
              onPress={() => navigation.navigate('Login')}>
              <Text className='text-white my-1 text-xl'>Login</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Screen1;


