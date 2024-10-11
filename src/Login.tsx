import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import {Formik} from 'formik';
import axios from 'axios';
import userSchema from '../validation_schema/login_schema';




import {NativeStackScreenProps} from "@react-navigation/native-stack"
import {RootStackParamList} from './App'


type HomeProps = NativeStackScreenProps<RootStackParamList, 'Login'>

import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}:HomeProps) => {
  const [toggleC, setToggleC] = useState(false);
  const [toggleP, setToggleP] = useState(true);
  return (
    <ImageBackground
      style={styles.inner}
      source={require('../assets/images/bgimg.png')}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.box1}>
            <Image source={require('../assets/images/logo.png')} />
            <Text style={styles.heading}>Welcome Back!</Text>
            <Text style={styles.text}>Login to your account</Text>
          </View>

          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values =>
              axios
                .post('http://10.0.2.2:3000/users/login', values)
                .then(res => {
                AsyncStorage.setItem('token',res.data.token).then(()=>{
                  navigation.replace('Dashboard');
                }).catch(error=>{
                  console.warn( error )
                })
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
              <View style={styles.box2}>
                <View style={styles.ip}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    placeholder="Type here"
                  
                  />
                  {touched.email && errors.email ? (
                    <Text style={{color: 'red', fontSize: 15, marginLeft: 23}}>
                      {errors.email}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.ip}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={[styles.input, {position: 'relative'}]}
                    placeholder="Type here"
                    secureTextEntry={toggleP}
                  />
                  <Pressable
                    style={styles.eyeIcon}
                    onPress={() => setToggleP(!toggleP)}>
                    {toggleP ? (
                      <Image source={require('../assets/images/eye.png')} />
                    ) : (
                      <Image source={require('../assets/images/eye-off.png')} />
                    )}
                  </Pressable>
                  {touched.password && errors.password ? (
                    <Text style={{color: 'red', fontSize: 15, marginLeft: 23}}>
                      {errors.password}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.fp}>
                  <Text onPress={()=>navigation.navigate('ForgotPassword')} style={styles.fptext}>Forgot password?</Text>
                </View>
                <LinearGradient
                  style={styles.press}
                  colors={['#01C6B2', '#01665C']}>
                  <Pressable onPress={(e:any) => handleSubmit(e)} style={styles.btn}>
                    <Text style={[styles.text, {fontSize: hp(2)}]}>Login</Text>
                  </Pressable>
                </LinearGradient>
                <View style={styles.check}>
                  <CheckBox
                    tintColors={{true: 'white', false: 'white'}}
                    disabled={false}
                    value={toggleC}
                    onValueChange={newValue => setToggleC(newValue)}
                  />
                  <Text style={[styles.text]}>Remember Me</Text>
                </View>
              </View>
            )}
          </Formik>
          <View style={styles.box3}>
            <Text style={[styles.text, {textAlign: 'center'}]}>
              By signing in to your account, you are agreeing to our{' '}
              <Text style={{color: '#96D701'}}>Privacy & Policy</Text> and{' '}
              <Text style={{color: '#96D701'}}>Terms & Conditions.</Text>
            </Text>
            <Text style={[styles.text, {textAlign: 'center'}]}>
              Don't have an account yet?{' '}
              <Text onPress={()=>navigation.navigate('SignUp')} style={{color: 'cyan'}}> Create one </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  box1: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(1),
  },
  heading: {
    color: 'white',
    fontSize: wp(6),
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: wp(3.5),
  },
  box2: {
    flex: 2,
    justifyContent: 'center',
  },
  box3: {
    flex: 2,
    marginHorizontal: wp(3),
    gap: hp(6),
  },
  input: {
    backgroundColor: 'white',
    padding: wp(3),
    marginHorizontal: wp(3),
    borderWidth: 1,
    borderRadius: 12,
    color:'black'
  },
  label: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: wp(4),
    marginHorizontal: wp(3),
  },
  ip: {
    gap: hp(1),
    marginBottom: hp(2),
  },
  fp: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: wp(3),
  },
  fptext: {
    color: '#FFA3A3',
    fontWeight: 'medium',
    fontSize: wp(4),
  },
  eyeIcon: {
    position: 'absolute',
    top: wp(11),
    right: wp(7),
  },
  btn: {
    padding: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  press: {
    marginTop: hp(2),
    marginHorizontal: wp(3),
    borderRadius: 12,
    marginBottom: hp(1),
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(3),
  },
});

export default Login;
