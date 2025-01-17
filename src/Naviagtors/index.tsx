import React from 'react';

//screens
import Login from '../Login';
import SignUp from '../SignUp';
import SplashScreen from '../SplashScreen';
import Screen1 from '../Screen1';
import ForgotPassword from '../ForgotPassword';
import Screen2 from '../Screen2';
//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../Dashboard';

export type RootStackParamList = {
  SplashScreen: undefined;
  Screen1: undefined;
  Screen2: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigators(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigators;
