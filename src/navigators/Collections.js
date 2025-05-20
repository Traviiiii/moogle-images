import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import CollectionsScreen from '../screens/Collections';
import CollectionDetailsScreen from '../screens/CollectionDetails';
import PhotoDetailsScreen from '../screens/PhotoDetails';

export default function CollectionsNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator style={styles.CollectionsScreen}>
            <Stack.Screen name=" Collections" component={CollectionsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Collection Details" component={CollectionDetailsScreen} />
            <Stack.Screen name="Photo Details" component={PhotoDetailsScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    CollectionsNavigator: {
        /* Styles here */
    },
});