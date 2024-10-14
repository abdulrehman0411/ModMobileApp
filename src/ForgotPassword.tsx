import {
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Modal,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './Naviagtors/index';
type ForgetPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPassword = ({navigation}: ForgetPasswordProps) => {
  const [modal, showModal] = useState(false);
  const [modal2, showModal2] = useState(false);
  const handleFP = () => {
    const res = '123456';
    const check = otp.join('');
    if (check === res) {
      showModal(true);
      setTimeout(() => {
        showModal(false);
        showModal2(true);
      }, 2000);
      setTimeout(() => {
        navigation.replace('Login');
        showModal2(false);
      }, 4500);
    }
  };

  const [code, showCode] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <ImageBackground
      className="flex-[1]"
      source={require('../assets/images/bgimg.png')}>
      <SafeAreaView className="flex-[1]">
        <KeyboardAvoidingView
          className="flex-[1]"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-[1] ">
              <View className="justify-center gap-1 mx-2 h-36">
                <Text className="text-white text-4xl font-bold">
                  Forgot Password
                </Text>
                <Text className="text-white text-base ">
                  You can easily reset your password here!
                </Text>
              </View>
              <View className="flex-[1] bg-[#061d22] rounded-t-xl justify-between">
                {!code ? (
                  <View className="gap-2 mt-10 mx-3">
                    <Text className="text-white font-bold">Email Address</Text>
                    <TextInput
                      className="p-3 bg-[#FAFAFA] rounded-xl pl-4"
                      placeholder="Type here"></TextInput>
                  </View>
                ) : (
                  <View className="mt-10 mx-4">
                    <Text className="text-white font-bold text-base mb-1">Code</Text>
                    <View className="flex-row gap-1">
                      {otp.map((_, index) => (
                        <TextInput
                          key={index}
                          className="bg-[#FAFAFA] w-[15.5%] h-16 rounded-xl text-center text-lg"
                          value={otp[index]}
                          onChangeText={text => handleChangeText(text, index)}
                          onKeyPress={e => handleKeyPress(e, index)}
                          ref={el => (inputRefs.current[index] = el)}
                          keyboardType="number-pad"
                          maxLength={1}
                        />
                      ))}
                    </View>
                    <Text className="text-white font-bold text-base mt-1 ">
                      Code is: 123456
                    </Text>
                  </View>
                )}

                {!code ? (
                  <LinearGradient
                    className="mb-12 mx-4 rounded-xl"
                    colors={['#01C6B2', '#01665C']}>
                    <Pressable
                      className="p-4 justify-center items-center"
                      onPress={() => showCode(true)}>
                      <Text className="text-white font-bold text-lg">Next</Text>
                    </Pressable>
                  </LinearGradient>
                ) : (
                  <LinearGradient
                    className="mb-12 mx-4 rounded-xl"
                    colors={['#01C6B2', '#01665C']}>
                    <Pressable
                      className="p-4 justify-center items-center"
                      onPress={() => handleFP()}>
                      <Text className="text-white font-bold text-lg">
                        Verify
                      </Text>
                    </Pressable>
                  </LinearGradient>
                )}
                {modal && (
                  <Modal>
                    <View className="flex-[1] bg-[#061d22] justify-end">
                      <View className="flex-[0.09] flex-row gap-3 bg-white mb-5 mx-4 pb-2 rounded-lg  justify-center items-center">
                        <LottieView
                          style={{width: wp(8), height: wp(8)}}
                          source={require('../Loader/Loader.json')}
                          autoPlay
                          loop
                        />
                        <Text className="text-black font-bold text-lg">
                          Verifying Code
                        </Text>
                      </View>
                    </View>
                  </Modal>
                )}
                {modal2 && (
                  <Modal>
                    <View className="flex-[1] bg-[#061d22] justify-end">
                      <View className="h-20 flex-row gap-3 bg-white mb-5 pb-2 mx-4 rounded-lg justify-center items-center">
                        <Image source={require('../assets/images/done.png')} />
                        <Text className="text-black font-bold text-lg">
                          Code Verified
                        </Text>
                      </View>
                    </View>
                  </Modal>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgotPassword;
