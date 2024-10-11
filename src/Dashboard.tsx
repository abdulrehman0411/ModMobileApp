import { StyleSheet, Text, View, Pressable , Button} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './App'
type DashboardProps = NativeStackScreenProps<RootStackParamList,'Dashboard'>

const Dashboard = ({navigation}:DashboardProps) => {
    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('token'); // Remove the token
          navigation.navigate('Screen1'); // Navigate to Screen1
        } catch (error) {
          console.warn(error);
        }
      };
  return (
    <View>
      <Text>Dashboard</Text>
      <Button title='LogOut' onPress={()=>handleLogout()}/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})