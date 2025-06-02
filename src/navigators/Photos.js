import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import PhotosScreen from '../screens/Photos';
import PhotoDetailsScreen from '../screens/PhotoDetails';

export default function PhotosNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Photos" component={PhotosScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Photo Details" component={PhotoDetailsScreen}  options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
