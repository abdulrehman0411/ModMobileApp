import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
 import { RootStackParamList } from './App';

 type Screen1Props = NativeStackScreenProps<RootStackParamList,"Screen1">;
const Screen1 = ({navigation}:Screen1Props) => {
  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        style={styles.bgimg}
        source={require('../assets/images/bgimg2.png')}>
        <View style={styles.box1}></View>

        <ImageBackground
          style={styles.box2}
          source={require('../assets/images/halfbgimg.png')}>
          <View style={styles.box2View}>
            <Text style={styles.heading}>Find a Service</Text>
            <Text style={styles.heading}>for you healthcare</Text>
            <Text style={styles.text}>
              A healthy community benefits every person in it. And community
              health is one means of achieving a healthy community.
            </Text>
            <LinearGradient
              style={styles.press}
              colors={['#01C6B2', '#01665C']}>
              <Pressable style={styles.btn} onPress={()=>navigation.navigate('Screen2')}>
                <Text style={[styles.text, {fontSize: hp(2)}]}>
                  Create Account
                </Text>
              </Pressable>
            </LinearGradient>
            
              <Pressable style={styles.btn2} onPress={()=>navigation.navigate('Login')}>
                <Text style={[styles.text, {fontSize: hp(2)}]}>Login</Text>
              </Pressable>
            
          </View>
        </ImageBackground>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  bgimg:{
    flex: 1,
    overflow:'hidden',
  },
  box1: {
    flex: 1,
  },
  box2: {
    flex: 1,
    marginTop:hp(2),
    overflow:'hidden',
    borderTopLeftRadius:wp(5),
    borderTopRightRadius:wp(5),
  },
  box2View: {
    flex: 1,
    marginTop:hp(3)
  },
  heading: {
    color: 'white',
    fontSize: wp(9.5),
    fontWeight: 'bold',
    marginLeft: wp(4),
    marginRight: wp(9),
    marginVertical:hp(-0.5)
  },
  text: {
    color: 'white',
    fontSize: wp(4),
    marginLeft: wp(4),
    marginRight: wp(9),
    marginVertical: hp(1),
  },
  btn2: {
    padding: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    marginHorizontal: wp(3),
    borderRadius: 12,
    borderColor:'white',
    borderWidth:wp(0.3),
  },
  btn: {
    padding: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  press:{
    marginTop: hp(2),
    marginHorizontal: wp(3),
    borderRadius: 12,
  }
  
});
