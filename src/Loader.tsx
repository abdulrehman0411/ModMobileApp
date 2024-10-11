import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.main}>
      <ActivityIndicator size={"large"}/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})