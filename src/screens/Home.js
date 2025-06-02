import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useFonts, Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
  })

  if (!fontsLoaded) return null

  return (
    <View style={styles.HomeScreen}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/8/88/MoogleFFIXConcept.png' }}
        style={styles.headerImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Moogle Images</Text>
      <View style={styles.divider} />
      <Text style={styles.text}>
        Moogle Images is an app that allows you to search, view and download photos.
        You can view images as individual photos or browse by collections.
        {'\n'}{'\n'}
        Click one of the buttons below or the navigation button in the top left to get started!
      </Text>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Photos')}>
        <Text style={styles.buttonText}>Browse Photos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Collections')}>
        <Text style={styles.buttonText}>Browse Collections</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  HomeScreen: {
    padding: 20,
    flex: 1,
    backgroundColor: '#E6EBE0',
  },
  headerImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Quicksand_700Bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#050504',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
    marginBottom: 20,
    color: '#050504',
  },
  divider: {
    height: 2,
    backgroundColor: '#F79824',
    marginBottom: 20,
    marginHorizontal: 30,
    borderRadius: 1,
  },
  button: {
    backgroundColor: '#F79824',
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#050504',
    fontSize: 18,
    fontFamily: 'Quicksand_500Medium',
  },
})