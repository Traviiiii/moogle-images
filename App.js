import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeNavigator from './src/navigators/Home'
import PhotosNavigator from './src/navigators/Photos'
import CollectionsNavigator from './src/navigators/Collections'

import { useFonts, Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
  })

  if (!fontsLoaded) {
    return (
      console.log("Error loading custom font")
    )
  }

  const Drawer = createDrawerNavigator()

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#050504',
            width: 240,
            borderRightWidth: 2,
            borderRightColor: '#DE1A1A',
          },
          drawerLabelStyle: {
            color: '#ffffff',
            fontFamily: 'Quicksand_500Medium',
          },
          headerStyle: {
            backgroundColor: '#050504',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'Quicksand_700Bold',
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{ title: 'Home' }}
        />
        <Drawer.Screen
          name="Photos"
          component={PhotosNavigator}
          options={{ title: 'Photos' }}
        />
        <Drawer.Screen
          name="Collections"
          component={CollectionsNavigator}
          options={{ title: 'Collections' }}
        />
      </Drawer.Navigator>
      <StatusBar style="auto" hidden={true} />
    </NavigationContainer>
  )
}