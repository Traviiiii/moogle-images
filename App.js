import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeNavigator from './src/navigators/Home';
import PhotosNavigator from './src/navigators/Photos';
import CollectionsNavigator from './src/navigators/Collections';

export default function App () {
  const Drawer = createDrawerNavigator()

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name='Home'
          component={HomeNavigator}
          options={{ title: 'Photo Lens' }}
        />
        <Drawer.Screen
          name='Photos'
          component={PhotosNavigator}
          options={{ title: 'Photos' }}
        />
        <Drawer.Screen
          name='Collections'
          component={CollectionsNavigator}
          options={{ title: 'Photo Collections' }}
        />
      </Drawer.Navigator>
      <StatusBar style='auto' hidden={true} />
    </NavigationContainer>
  )
}