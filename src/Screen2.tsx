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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';

type Screen2Props = NativeStackScreenProps<RootStackParamList, 'Screen2'>;
const Screen2 = ({navigation}: Screen2Props) => {
  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        style={styles.bgimg}
        source={require('../assets/images/bgimg3.png')}>
        <View style={styles.box1}></View>

        <ImageBackground
          style={styles.box2}
          source={require('../assets/images/halfbgimg.png')}>
          <View style={styles.box2View}>
            <Text style={styles.heading}>Service Is Service </Text>
            <Text style={styles.heading}>User-Centered Care</Text>
            <Text style={styles.text}>
              Care that includes Service Users and their families as part of the
              care team's decision-making.
            </Text>
            <LinearGradient
              style={styles.press}
              colors={['#01C6B2', '#01665C']}>
              <Pressable
                style={styles.btn}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.text, {fontSize: hp(2),fontWeight:'bold'}]}>
                  I am a Service User
                </Text>
              </Pressable>
            </LinearGradient>

            <LinearGradient
              style={styles.press}
              colors={['#01C6B2', '#01665C']}>
              <Pressable
                style={styles.btn}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.text, {fontSize: hp(2),fontWeight:'bold'}]}>
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  bgimg: {
    flex: 1,
    overflow: 'hidden',
  },
  box1: {
    flex: 1,
  },
  box2: {
    flex: 1,
    marginTop: hp(2),
    overflow: 'hidden',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  box2View: {
    flex: 1,
    marginTop: hp(3),
  },
  heading: {
    color: 'white',
    fontSize: wp(9.3),
    fontWeight: 'bold',
    marginLeft: wp(4),
    marginRight: wp(12),
    marginVertical: hp(-0.5),
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
    borderColor: 'white',
    borderWidth: wp(0.3),
  },
  btn: {
    padding: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  press: {
    marginTop: hp(2),
    marginHorizontal: wp(3),
    borderRadius: 12,
  },
});
