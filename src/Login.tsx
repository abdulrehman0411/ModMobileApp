import React, {useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import {Formik} from 'formik';
import axios from 'axios';
import userSchema from '../validation_schema/login_schema';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './Naviagtors/index';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: HomeProps) => {
  const [toggleC, setToggleC] = useState(false);
  const [toggleP, setToggleP] = useState(true);
  return (
    <ImageBackground
      className="flex-[1]"
      source={require('../assets/images/bgimg.png')}>
      <SafeAreaView className="flex-[1] ">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <View className="flex-[2] gap-3 justify-center items-center">
            <Image source={require('../assets/images/logo.png')} />
            <Text className="text-white text-3xl  font-bold">
              Welcome Back!
            </Text>
            <Text className="text-white font-normal text-lg">
              Login to your account
            </Text>
          </View>

          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values =>
              axios
                .post('http://10.0.2.2:3000/users/login', values)
                .then(res => {
                  AsyncStorage.setItem('token', res.data.token)
                    .then(() => {
                      navigation.replace('Dashboard');
                    })
                    .catch(error => {
                      console.warn(error);
                    });
                })
                .catch(error => {
                  console.warn('Login failed. Please check your credentials.');
                })
            }
            validationSchema={userSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View className=" flex-[2] mx-3 mt-2">
                <View className="gap-2 mb-4">
                  <Text className="text-white font-normal text-base ">
                    Email Address
                  </Text>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    className="bg-white p-3  border-0 rounded-xl text-black"
                    placeholder="Type here"
                  />
                  {touched.email && errors.email ? (
                    <Text className='text-red-600 text-base pl-1'>
                      {errors.email}
                    </Text>
                  ) : null}
                </View>
                <View className="gap-2 mb-4">
                  <Text className="text-white font-normal text-base ml-4">
                    Password
                  </Text>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    className="bg-white p-3  border-0 rounded-xl text-black relative"
                    placeholder="Type here"
                    secureTextEntry={toggleP}
                  />
                  <Pressable
                    className="absolute top-11 right-4"
                    onPress={() => setToggleP(!toggleP)}>
                    {toggleP ? (
                      <Image source={require('../assets/images/eye.png')} />
                    ) : (
                      <Image source={require('../assets/images/eye-off.png')} />
                    )}
                  </Pressable>
                  {touched.password && errors.password ? (
                    <Text className='text-red-600 text-base pl-1'>
                      {errors.password}
                    </Text>
                  ) : null}
                </View>
                <View className="flex-row  justify-end ">
                  <Text
                    onPress={() => navigation.navigate('ForgotPassword')}
                    className="text-[#FFA3A3] font-medium text-base">
                    Forgot password?
                  </Text>
                </View>
                <LinearGradient
                  className="mt-4 mb-1 rounded-xl"
                  colors={['#01C6B2', '#01665C']}>
                  <Pressable
                    onPress={(e: any) => handleSubmit(e)}
                    className="p-4 justify-center items-center">
                    <Text className="text-white font-normal text-lg">
                      Login
                    </Text>
                  </Pressable>
                </LinearGradient>
                <View className="flex-row -ml-1 items-center">
                  <CheckBox
                    tintColors={{true: 'white', false: 'white'}}
                    disabled={false}
                    value={toggleC}
                    onValueChange={newValue => setToggleC(newValue)}
                  />
                  <Text className="text-white font-normal text-base">
                    Remember Me
                  </Text>
                </View>
              </View>
            )}
          </Formik>
          <View className="flex-[2] mx-3 gap-10">
            <Text className="text-white font-normal text-base text-center">
              By signing in to your account, you are agreeing to our{' '}
              <Text className="text-[#96D701]">Privacy & Policy</Text> and{' '}
              <Text className="text-[#96D701]">Terms & Conditions.</Text>
            </Text>
            <Text className="text-white font-normal text-base text-center">
              Don't have an account yet?{' '}
              <Text
                onPress={() => navigation.navigate('SignUp')}
                className='text-cyan-400'>
                {' '}
                Create one{' '}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
