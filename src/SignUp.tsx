import React, {useState} from 'react';
import PhoneInput, {ICountry} from 'react-native-international-phone-number';
import {Formik} from 'formik';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './Naviagtors/index';
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
      className="flex-[1]"
      source={require('../assets/images/bgimg.png')}>
      <SafeAreaView className="flex-[1]">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View className="justify-center gap-1 mx-3 h-36">
            <Text className="text-white text-4xl font-bold">Hello there!</Text>
            <Text className="text-white text-base ">
              Enter your personal details
            </Text>
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
              <View className="flex-[1] bg-[#061d22] rounded-t-xl">
                <View className="gap-1 mt-2 mx-3">
                  <Text className="text-white font-bold">Profile Photo</Text>
                  <Pressable
                    className="bg-[#FAFAFA] w-36 h-36 rounded-full justify-center items-center gap-1"
                    onPress={selectImage}>
                    {profileImage ? (
                      <>
                        <Image
                          className="w-36 h-36 rounded-full"
                          source={{uri: profileImage}}
                          resizeMode="cover"
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          source={require('../assets/images/arrow.png')}></Image>
                        <Text className="text-[#B6B7B8]">Upload</Text>
                      </>
                    )}
                  </Pressable>
                </View>
                <Input label="First Name" name="firstname" />
                <Input label="Last Name" name="lastname" />
                <View className="mx-4 mt-3 ">
                  <Text className="text-white mb-2 -ml-1 font-bold">
                    Phone Number
                  </Text>
                  <PhoneInput
                    defaultCountry="US"
                    value={inputValue}
                    onChangePhoneNumber={handleInputValue}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={handleSelectedCountry}
                  />
                </View>
                <Input label="Email Address" name="email" />
                <Input label="Password" name="password" />

                <Pressable
                  onPress={() => setShow(!show)}
                  className="gap-1 mt-2 mx-3">
                  {show ? (
                    <Text className="text-[#96D701] text-base underline font-bold">
                      Show Less
                    </Text>
                  ) : (
                    <Text className="text-[#96D701] text-base underline font-bold">
                      Show More
                    </Text>
                  )}
                </Pressable>
                {show && (
                  <>
                    <View className="gap-1 mt-2 mx-3">
                      <Text className="text-white font-bold mb-1">
                        Special Power of Attorney
                      </Text>
                      <Pressable
                      style={{borderStyle:'dashed', borderColor:'white', borderWidth:1}}
                        className="bg-[#0E4450] w-[26%] h-28 rounded-lg justify-center items-center"
                        onPress={selectAttorney}>
                        {attorney ? (
                          <>
                            <Image
                              className="w-28 h-28 rounded-lg"
                              source={{uri: attorney}}
                            />
                            <Pressable
                              onPress={() => setAttorney('')}
                              className="absolute top-1 right-1">
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
                    <View className="gap-1 mt-2 mx-3 w-4/5">
                      <Text className="text-white font-bold mb-1">
                        Service User Condition
                      </Text>
                      <TextInput
                        className="bg-[#FAFAFA] h-40 p-4 text-black rounded-xl"
                        placeholder="Type here"
                        textAlignVertical="top"
                        multiline={true}></TextInput>
                    </View>
                    <View className=" mt-4 mx-4">
                      <View className="flex-row gap-2">
                        <Pressable
                        style={{borderStyle:'dashed', borderColor:'white', borderWidth:1}}
                          className="bg-[#0E4450] w-[26%] h-28 rounded-lg justify-center items-center"
                          onPress={selectAttorney}>
                          {attorney ? (
                            <Image
                              className="w-28 h-28 rounded-lg"
                              source={{uri: attorney}}></Image>
                          ) : (
                            <>
                              <Image
                                source={require('../assets/images/plus.png')}></Image>
                            </>
                          )}
                        </Pressable>
                        <Pressable
                        style={{borderStyle:'dashed', borderColor:'white', borderWidth:1}}
                          className="bg-[#0E4450] w-[26%] h-28 rounded-lg justify-center items-center"
                          onPress={selectAttorney}>
                          {attorney ? (
                            <Image
                              className="w-28 h-28 rounded-lg"
                              source={{uri: attorney}}></Image>
                          ) : (
                            <>
                              <Image
                                source={require('../assets/images/plus.png')}></Image>
                            </>
                          )}
                        </Pressable>
                        <Pressable
                          style={{borderStyle:'dashed', borderColor:'white', borderWidth:1}}
                          className="bg-[#0E4450] w-[26%] h-28 rounded-lg justify-center items-center"
                          onPress={selectAttorney}>
                          {attorney ? (
                            <Image
                              className="w-28 h-28 rounded-lg"
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
                    <View className="gap-1 mt-2 mx-3">
                      <Text className="text-white font-bold">
                        Service User Condition
                      </Text>
                      <View className="flex-row flex-wrap ">
                        {fconditions &&
                          fconditions.map(condition => (
                            <View
                              key={condition}
                              className="bg-[#01C0AD] mr-2 mb-2 w-28 h-12 rounded-xl justify-center items-center relative ">
                              <>
                                <Text className="text-white">{condition}</Text>
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
                                  className="absolute top-1 right-1">
                                  <Image
                                    source={require('../assets/images/cross.png')}
                                  />
                                </Pressable>
                              </>
                            </View>
                          ))}
                        <Pressable
                          style={{borderStyle:'dashed', borderColor:'white', borderWidth:1}}
                          className="bg-[#0E4450] w-28 h-12 rounded-xl justify-center items-center "
                          onPress={() => showModalView(true)}>
                          <>
                            <Text className="text-[#B6B7B8]">Add</Text>
                          </>
                        </Pressable>
                      </View>
                    </View>
                    {modalView && (
                      <Modal>
                        <View className="flex-[1] bg-[#061d22]">
                          <View className="flex-row h-20 gap-4 my-2 mx-4 items-center">
                            <Pressable onPress={() => handleModalView()}>
                              <Image
                                className="p-2"
                                source={require('../assets/images/leftArrow.png')}
                              />
                            </Pressable>
                            <Text className="text-white font-bold text-2xl">
                              Service User Condition
                            </Text>
                          </View>
                          <View className="flex-[1] flex-row flex-wrap gap-4 mx-5">
                            {serviceUserCondition.map(condition => (
                              <TouchableOpacity
                                onPress={() => handleTouch(condition)}
                                key={condition}>
                                <View
                                  className={`p-4 border-x border-y border-[#D9D9D9] rounded-xl ${
                                    conditions.includes(condition) &&
                                    'bg-[#01C0AD]'
                                  } `}>
                                  <Text
                                    className={`text-[#D9D9D9] text-lg ${
                                      conditions.includes(condition) &&
                                      'text-white'
                                    }`}>
                                    {condition}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            ))}
                          </View>
                          <LinearGradient
                            className="mx-4 rounded-xl mb-8"
                            colors={['#01C6B2', '#01665C']}>
                            <Pressable
                              className="p-4 justify-center items-center"
                              onPress={handleModal}>
                              <Text className="text-white font-normal text-lg">
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
                  className="mt-8 mx-10 mb-1 rounded-xl"
                  colors={['#01C6B2', '#01665C']}>
                  <Pressable
                    className="p-4 justify-center items-center"
                    onPress={() => showModal(true)}>
                    <Text className="text-white font-bold text-lg">Save</Text>
                  </Pressable>
                </LinearGradient>
                {modal && (
                  <Modal>
                    <View className="flex-[1] bg-[#000000] justify-end">
                      <View className="rounded-3xl flex-[0.3] justify-center items-center bg-white">
                        <Text className="text-center text-2xl text-[#000000] font-bold mx-20 mb-6">
                          Are you sure you want to save your profile details?
                        </Text>
                        <View className="flex-row gap-6">
                          <Pressable
                            onPress={() => {
                              showModal(false);
                              showEndModal(true);
                              setTimeout(() => {
                                navigation.navigate('Login');
                                showEndModal(false);
                              }, 1500);
                            }}
                            className="p-2 w-32 justify-center items-center bg-[#01C0AD] rounded-2xl">
                            <Text className="text-white font-normal text-lg">
                              Yes
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() => showModal(false)}
                            className="bg-[#FD003A] p-2 w-32 justify-center items-center rounded-2xl">
                            <Text className="text-white font-normal text-lg">
                              No
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </Modal>
                )}
                {endmodal && (
                  <Modal>
                    <View className="flex-[1] bg-[#000000] justify-end">
                      <View className="rounded-3xl flex-[0.1] flex-row justify-center items-center bg-white ">
                        <Image source={require('../assets/images/done.png')} />
                        <Text className="text-xl font-bold text-center text-black ml-4">
                          Profile Saved
                        </Text>
                      </View>
                    </View>
                  </Modal>
                )}

                <LinearGradient
                  className="mx-10 rounded-xl mb-1"
                  colors={['#061d22', '#061d22']}>
                  <Pressable
                    className="p-4 justify-center items-center"
                    onPress={() => navigation.navigate('Screen1')}>
                    <Text className="text-white font-bold text-lg">Back</Text>
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

export default SignUp;
