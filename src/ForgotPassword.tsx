import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  NativeSyntheticEvent, TextInputKeyPressEventData,
  Modal,
  Image
} from 'react-native';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from './App';
type ForgetPasswordProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>

const ForgotPassword = ({navigation}:ForgetPasswordProps) => {
    const[modal, showModal] = useState(false)
    const[modal2, showModal2] = useState(false)
    const handleFP = () =>{
        const res = '123456';
        const check = otp.join('');
        if(check === res){
            showModal(true)
            setTimeout(() => {
              showModal(false)
                showModal2(true)
            }, 2000);
            setTimeout(() => {
                navigation.replace('Login')
                showModal2(false)
            }, 4500);

        }

    }
    
    const [code, showCode] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '','']);
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

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <ImageBackground
      style={styles.main}
      source={require('../assets/images/bgimg.png')}>
      <SafeAreaView style={styles.main}>
        <KeyboardAvoidingView
          style={styles.main}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}>
                <View style={styles.main}>
                <View style={styles.box1}>
                    <Text style={styles.heading}>Forgot Password</Text>
                    <Text style={styles.short}>You can easily reset your password here!</Text>
                </View>
                <View style={styles.box2}>
                    {!code ? <View style={styles.ip1}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Type here"></TextInput>
            </View> : <View style={styles.ip1}>
            <Text style={styles.label}>Code</Text>
            <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          
          key={index}
          style={styles.input2}
          value={otp[index]}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          keyboardType="number-pad"
          maxLength={1}
        />
      ))}
      
    </View>
    <Text style={styles.label}>Code is: 123456</Text>
    </View>}
                
            
          {!code ? <LinearGradient
              style={styles.press1}
              colors={['#01C6B2', '#01665C']}>
              <Pressable style={styles.btn} onPress={()=>showCode(true)}>
                <Text style={[styles.label, {fontSize: hp(2)}]}>Next</Text>
              </Pressable>
            </LinearGradient> : <LinearGradient
              style={styles.press1}
              colors={['#01C6B2', '#01665C']}>
              <Pressable style={styles.btn} onPress={()=>handleFP()}>
                <Text style={[styles.label, {fontSize: hp(2)}]}>Verify</Text>
                
              </Pressable>
            </LinearGradient>} 
            {modal && <Modal >
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                    <LottieView style={{width:wp(8), height:wp(8)}} source={require('../Loader/Loader.json')} autoPlay loop />
                    <Text style={{fontSize:wp(4), fontWeight:'bold', color:'black'}}>Verifying Code</Text>
                    </View>
                </View>
            </Modal>}
            {modal2 && <Modal >
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                    <Image source={require('../assets/images/done.png')}/>
                    <Text style={{fontSize:wp(4), fontWeight:'bold', color:'black'}}>Code Verified</Text>
                    </View>
                </View>
            </Modal>}
                </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  box1: {
    justifyContent: 'center',
    gap: hp(0.5),
    marginHorizontal: wp(2),
    height: hp(15),
  },
  box2: {
    flex: 1,
    backgroundColor: '#061d22',
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    justifyContent:'space-between',
    
  },
  heading: {
    color: 'white',
    fontSize: wp(10),
    fontWeight: 'bold',
  },
  short: {
    color: 'white',
    fontSize: wp(4.3),
  },
  ip1: {
    gap: hp(1),
    marginTop: hp(4),
    marginHorizontal: wp(3),
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    padding: wp(3),
    backgroundColor: '#FAFAFA',
    borderRadius: wp(2.5),
    paddingLeft: wp(4),
    color:'black'
  },
  btn: {
    padding: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  press1: {
    marginTop: hp(2),
    marginHorizontal: wp(3),
    borderRadius: 12,
    marginBottom: hp(8),
  },
  container: {
    flexDirection: 'row',
    
    gap:wp(1),
  },
  input2: {
    backgroundColor: '#FAFAFA',
    width: wp(14.5),
    height: wp(14.5),
    borderRadius: wp(3),
    textAlign: 'center',
    fontSize: wp(4),
  },
  modal: {
    flex:1,
    backgroundColor:'#061d22',
    justifyContent:'flex-end',
  },
  modalView: {
    flex:0.09,
    flexDirection:'row',
    gap:wp(3),
    backgroundColor:'white',
    marginBottom:hp(5),
    marginHorizontal:wp(4),
    borderRadius: wp(3),
    justifyContent:'center',
    alignItems:'center'
  }
});
