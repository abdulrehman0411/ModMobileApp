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

type Screen2Props = NativeStackScreenProps<RootStackParamList, 'Screen2'>;
const Screen2 = ({navigation}: Screen2Props) => {
  return (
    <SafeAreaView className="flex-[1]">
      <ImageBackground
        className="flex-[1]"
        source={require('../assets/images/bgimg3.png')}>
        <View className="flex-[1]"></View>

        <ImageBackground
           className="flex-[1] overflow-hidden rounded-t-3xl"
          source={require('../assets/images/halfbgimg.png')}>
          <View className='flex-[1] mt-6'>
            <Text className='text-white text-4xl font-bold ml-4'>Service Is Service </Text>
            <Text className='text-white text-4xl font-bold ml-4'>User-Centered Care</Text>
            <Text className='text-white ml-4 mr-16 my-4 text-base'>
              Care that includes Service Users and their families as part of the
              care team's decision-making.
            </Text>
            <LinearGradient
              className='mt-4 mx-3 rounded-xl'
              colors={['#01C6B2', '#01665C']}>
              <Pressable
                className='justify-center items-center p-2'
                onPress={() => navigation.navigate('SignUp')}>
                <Text className='text-white my-1 text-xl'>
                  I am a Service User
                </Text>
              </Pressable>
            </LinearGradient>

            <LinearGradient
               className='mt-4 mx-3 rounded-xl'
              colors={['#01C6B2', '#01665C']}>
              <Pressable
                className='justify-center items-center p-2'
                onPress={() => navigation.navigate('SignUp')}>
                <Text className='text-white my-1 text-xl'>
                  I am a Care Giver
                </Text>
              </Pressable>
            </LinearGradient>

          </View>
        </ImageBackground>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Screen2;

