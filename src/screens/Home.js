import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

export default function HomeScreen ({ navigation }) {
  return (
    <View style={styles.HomeScreen}>
      <TouchableOpacity onPress={() => navigation.navigate('Photos')}>
        <Text>Browse Photos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Collections')}>
        <Text>Browse Collections</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  HomeScreen: {
    padding: 20
  }
})
