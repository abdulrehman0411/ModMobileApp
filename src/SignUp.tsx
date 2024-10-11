import React, {useState} from 'react';
import PhoneInput, {ICountry} from 'react-native-international-phone-number';
import {Formik} from 'formik';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import Input from './components/Input';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: SignUpProps) => {
  const [endmodal, showEndModal] = useState(false);

  const serviceUserCondition = [
    'Hypertension',
    'Asthma',
    'Arthritis',
    'Hospice Care',
    "Alzheimer's and Dementia",
    'Respite',
    'Mental Health',
    'Diabetes',
  ];
  type Country = {
    phoneCode: string;
    flag: string;
  };

  const [modalView, showModalView] = useState(false);
  const [code, setCode] = useState('');

  //modal for confimation of signup submission
  const [modal, showModal] = useState(false);

  const [flag, setFlag] = useState('');
  const [show, setShow] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);
  const [fconditions, setFconditions] = useState<string[]>([]);
  const handleCountryChange = (item: Country) => {
    setCode(item.phoneCode);
    setFlag(item.flag);
  };
  const [profileImage, setProfileImage] = useState<string | undefined>('');
  const [attorney, setAttorney] = useState<string | undefined>('');
  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorMessage) {
        return;
      }
      setProfileImage(response.assets?.[0]?.uri);
    });
  };
  const selectAttorney = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorMessage) {
        return;
      }
      setAttorney(response.assets?.[0]?.uri);
    });
  };

  const handleTouch = (condition: string) => {
    if (conditions.includes(condition)) {
      setConditions(conditions.filter(con => con !== condition));
      return;
    }

    setConditions([...conditions, condition]);
  };
  function handleModal() {
    setFconditions([...conditions]);
    setTimeout(() => {
      showModalView(false);
    }, 100);
  }
  const handleModalView = () => {
    if (conditions.length != fconditions.length) {
      setConditions(fconditions);
    }

    showModalView(false);
  };
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>('');

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }
  return (
    <ImageBackground
      style={styles.inner}
      source={require('../assets/images/bgimg.png')}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.box1}>
            <Text style={styles.heading}>Hello there!</Text>
            <Text style={styles.short}>Enter your personal details</Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: '',
              firstname: '',
              lastname: '',
            }}
            onSubmit={values => console.log(values)}>
            {({}) => (
              <View style={styles.box2}>
                <View style={styles.ip1}>
                  <Text style={styles.label}>Profile Photo</Text>
                  <Pressable style={styles.image1} onPress={selectImage}>
                    {profileImage ? (
                      <Image
                        style={styles.image1}
                        source={{uri: profileImage}}></Image>
                    ) : (
                      <>
                        <Image
                          source={require('../assets/images/arrow.png')}></Image>
                        <Text style={{color: '#B6B7B8'}}>Upload</Text>
                      </>
                    )}
                  </Pressable>
                </View>
                <Input label='First Name' name='firstname'/>
                <Input label='Last Name' name='lastname'/>
                <View style={styles.ip1}>
                  <Text style={styles.label}>Phone Number</Text>
                  <PhoneInput
                    defaultCountry="US"
                    value={inputValue}
                    onChangePhoneNumber={handleInputValue}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={handleSelectedCountry}
                  />
                </View>
                <Input label='Email Address' name='email'/>
                <Input label='Password' name='password'/>

                <Pressable onPress={() => setShow(!show)} style={styles.ip1}>
                  {show ? (
                    <Text
                      style={[
                        styles.label,
                        {
                          color: '#96D701',
                          fontSize: wp(4),
                          textDecorationLine: 'underline',
                        },
                      ]}>
                      Show Less
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.label,
                        {
                          color: '#96D701',
                          fontSize: wp(4),
                          textDecorationLine: 'underline',
                        },
                      ]}>
                      Show More
                    </Text>
                  )}
                </Pressable>
                {show && (
                  <>
                    <View style={styles.ip1}>
                      <Text style={styles.label}>
                        Special Power of Attorney
                      </Text>
                      <Pressable style={styles.image2} onPress={selectAttorney}>
                        {attorney ? (
                          <>
                            <Image
                              style={styles.image2}
                              source={{uri: attorney}}
                            />
                            <Pressable
                              onPress={() => setAttorney('')}
                              style={styles.imageIcon}>
                              <Image
                                source={require('../assets/images/cross.png')}
                              />
                            </Pressable>
                          </>
                        ) : (
                          <>
                            <Image
                              source={require('../assets/images/plus.png')}></Image>
                          </>
                        )}
                      </Pressable>
                    </View>
                    <View style={[styles.ip1, {width: wp(80)}]}>
                      <Text style={styles.label}>Service User Condition</Text>
                      <TextInput
                        style={[styles.input2]}
                        placeholder="Type here"
                        textAlignVertical="top"
                        multiline={true}></TextInput>
                    </View>
                    <View style={[styles.ip1]}>
                      <View style={{flexDirection: 'row', gap: wp(2)}}>
                        <Pressable
                          style={styles.image2}
                          onPress={selectAttorney}>
                          {attorney ? (
                            <Image
                              style={styles.image2}
                              source={{uri: attorney}}></Image>
                          ) : (
                            <>
                              <Image
                                source={require('../assets/images/plus.png')}></Image>
                            </>
                          )}
                        </Pressable>
                        <Pressable
                          style={styles.image2}
                          onPress={selectAttorney}>
                          {attorney ? (
                            <Image
                              style={styles.image2}
                              source={{uri: attorney}}></Image>
                          ) : (
                            <>
                              <Image
                                source={require('../assets/images/plus.png')}></Image>
                            </>
                          )}
                        </Pressable>
                        <Pressable
                          style={styles.image2}
                          onPress={selectAttorney}>
                          {attorney ? (
                            <Image
                              style={styles.image2}
                              source={{uri: attorney}}></Image>
                          ) : (
                            <>
                              <Image
                                source={require('../assets/images/plus.png')}></Image>
                            </>
                          )}
                        </Pressable>
                      </View>
                    </View>
                    <View style={styles.ip1}>
                      <Text style={styles.label}>Service User Condition</Text>
                      <View style={styles.boxes}>
                        {fconditions &&
                          fconditions.map(condition => (
                            <View key={condition} style={styles.su2}>
                              <>
                                <Text style={{color: 'white'}}>
                                  {condition}
                                </Text>
                                <Pressable
                                  onPress={() => {
                                    setFconditions(
                                      fconditions.filter(
                                        con => con !== condition,
                                      ),
                                    );
                                    setConditions(
                                      conditions.filter(
                                        con => con !== condition,
                                      ),
                                    );
                                  }}
                                  style={styles.imageIcon}>
                                  <Image
                                    source={require('../assets/images/cross.png')}
                                  />
                                </Pressable>
                              </>
                            </View>
                          ))}
                        <Pressable
                          style={styles.su}
                          onPress={() => showModalView(true)}>
                          <>
                            <Text style={{color: '#B6B7B8'}}>Add</Text>
                          </>
                        </Pressable>
                      </View>
                    </View>
                    {modalView && (
                      <Modal>
                        <View style={styles.modal}>
                          <View style={styles.modalhead}>
                            <Pressable onPress={() => handleModalView()}>
                              <Image
                                source={require('../assets/images/leftArrow.png')}
                              />
                            </Pressable>
                            <Text style={styles.modalHeading}>
                              Service User Condition
                            </Text>
                          </View>
                          <View style={styles.cbox}>
                            {serviceUserCondition.map(condition => (
                              <TouchableOpacity
                                onPress={() => handleTouch(condition)}
                                key={condition}>
                                <View
                                  style={[
                                    styles.cBoxView,
                                    conditions.includes(condition) && {
                                      backgroundColor: '#01C0AD',
                                    },
                                  ]}>
                                  <Text
                                    style={[
                                      styles.cBoxText,
                                      conditions.includes(condition) && {
                                        color: 'white',
                                      },
                                    ]}>
                                    {condition}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            ))}
                          </View>
                          <LinearGradient
                            style={styles.press}
                            colors={['#01C6B2', '#01665C']}>
                            <Pressable style={styles.btn} onPress={handleModal}>
                              <Text style={[styles.text, {fontSize: hp(2)}]}>
                                Save
                              </Text>
                            </Pressable>
                          </LinearGradient>
                        </View>
                      </Modal>
                    )}
                  </>
                )}
                <LinearGradient
                  style={styles.press1}
                  colors={['#01C6B2', '#01665C']}>
                  <Pressable style={styles.btn} onPress={() => showModal(true)}>
                    <Text style={[styles.label, {fontSize: hp(2)}]}>Save</Text>
                  </Pressable>
                </LinearGradient>
                {modal && (
                  <Modal>
                    <View style={styles.modal2}>
                      <View style={styles.modal2View}>
                        <Text style={styles.modalText}>
                          Are you sure you want to save your profile details?
                        </Text>
                        <View style={styles.modalButton}>
                          <Pressable
                            onPress={() => {
                              showModal(false);
                              showEndModal(true);
                              setTimeout(() => {
                                navigation.navigate('Login');
                                showEndModal(false);
                              }, 1500);
                            }}
                            style={styles.modalButton1}>
                            <Text style={styles.text}>Yes</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => showModal(false)}
                            style={[
                              styles.modalButton1,
                              {backgroundColor: '#FD003A'},
                            ]}>
                            <Text style={styles.text}>No</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </Modal>
                )}
                {endmodal && (
                  <Modal>
                    <View style={styles.modal2}>
                      <View style={styles.modal3View}>
                        <Image source={require('../assets/images/done.png')} />
                        <Text
                          style={{
                            fontSize: wp(4),
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'black',
                          }}>
                          Profile Saved
                        </Text>
                      </View>
                    </View>
                  </Modal>
                )}

                <LinearGradient
                  style={styles.press2}
                  colors={['#061d22', '#061d22']}>
                  <Pressable
                    style={styles.btn}
                    onPress={() => navigation.navigate('Screen1')}>
                    <Text style={[styles.label, {fontSize: hp(2)}]}>Back</Text>
                  </Pressable>
                </LinearGradient>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
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
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
  image1: {
    backgroundColor: '#FAFAFA',
    width: hp(16),
    height: hp(16),
    borderRadius: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(1),
  },
  input: {
    padding: wp(2.1),
    backgroundColor: '#FAFAFA',
    borderRadius: wp(2.5),
    paddingLeft: wp(4),
    color: 'black',
  },
  drop: {
    backgroundColor: '#EDEADE',
    padding: wp(3),
    flex: 1,
    borderTopLeftRadius: wp(2.5),
    borderBottomLeftRadius: wp(2.5),
  },
  btn: {
    padding: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  press1: {
    marginTop: hp(2),
    marginHorizontal: wp(9),
    borderRadius: 12,
    marginBottom: hp(1),
  },
  press2: {
    marginHorizontal: wp(9),
    borderRadius: 12,
    marginBottom: hp(1),
  },
  image2: {
    backgroundColor: '#0E4450',
    width: hp(13.1),
    height: hp(13.1),
    borderRadius: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: 'white',
    borderWidth: wp(0.4),
    position: 'relative',
  },
  imageIcon: {
    position: 'absolute',
    top: hp(0.5),
    right: hp(0.5),
  },
  input2: {
    height: hp(15),
    backgroundColor: '#FAFAFA',
    borderRadius: wp(2.5),
    padding: wp(4),
    color: 'black',
  },
  su: {
    backgroundColor: '#0E4450',
    width: hp(13.5),
    height: hp(6.1),
    borderRadius: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: 'white',
    borderWidth: wp(0.4),
  },
  su2: {
    backgroundColor: '#01C0AD',
    width: hp(13.5),
    height: hp(6.1),
    borderRadius: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modal: {
    flex: 1,
    backgroundColor: '#061d22',
  },
  modalhead: {
    flexDirection: 'row',
    height: hp(10),
    gap: wp(4),
    marginVertical: hp(2),
    marginHorizontal: wp(8),
    alignItems: 'center',
  },
  modalHeading: {
    color: 'white',
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  cbox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: wp(4),
    gap: wp(4),
  },
  cBoxView: {
    padding: wp(3),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: wp(3.5),
  },
  cBoxText: {
    color: '#D9D9D9',
    fontSize: wp(5),
  },
  boxes: {
    flexDirection: 'row',
    gap: wp(2),
    flexWrap: 'wrap',
  },
  press: {
    marginHorizontal: wp(3),
    borderRadius: 12,
    marginBottom: hp(8),
  },
  text: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: wp(3.5),
  },
  modal2: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  modal2View: {
    borderRadius: hp(3),
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: hp(4),
  },
  modalText: {
    textAlign: 'center',
    fontSize: wp(6),
    color: '#000000',
    fontWeight: 'bold',
    marginHorizontal: wp(13),
  },
  modalButton: {
    flexDirection: 'row',

    gap: wp(5),
  },
  modalButton1: {
    padding: hp(2),
    width: wp(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01C0AD',
    borderRadius: wp(4),
  },
  modal3View: {
    borderRadius: hp(2),
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: wp(4),
  },
});

export default SignUp;
