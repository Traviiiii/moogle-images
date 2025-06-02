import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { global } from '../config/global';
import SearchForm from '../components/SearchForm';
import { useFonts, Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'

export default function PhotosScreen({ navigation }) { 
    const [fontsLoaded] = useFonts({
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_700Bold,
    })

    // Uses default search of 'avocado' if nothing is provided
    const [searchQuery, setSearchQuery] = useState('Avocado');
    const [photos, setPhotos] = useState(null);

    // Searches for Photos with given query
    const searchPhotos = () => {
        console.log("Searching for:", searchQuery);
        
        fetch(`https://api.unsplash.com/search/photos?client_id=${global.unsplashAccessKey}&query=${searchQuery}&per_page=30`)
            .then((response) => response.json())
            .then((json) => {
                setPhotos(json.results);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        searchPhotos();
    }, [searchQuery]);

    if (!fontsLoaded) {
        return null;
    }

    // Returns page
    return (
        <View style={styles.PhotosScreen}>
            <View style={styles.SearchFormWrapper}>
                <SearchForm setSearchQuery={setSearchQuery} type="photos"/>
            </View>

            {photos ? (
                <FlatList
                    data={photos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.resultImageTouchable}
                            onPress={() => {
                                navigation.navigate('Photo Details', {
                                    photoId: item.id,
                                });                                
                            }}>
                            <Image
                                style={styles.resultImage}
                                source={{uri: item.urls.regular}}
                            />
                        </TouchableOpacity>
                    )}
                    numColumns="2"
                    style={{margin: 10, marginBottom: 0}}                
                />
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    PhotosScreen: {
        backgroundColor: '#E6EBE0',
        flex: 1,
    },
    SearchFormWrapper: {
        backgroundColor: '#000',
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomColor: '#F79824',
        borderWidth: 2,
        fontFamily: 'Quicksand_400Regular',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    resultImage: {
        flex: 1,
        height: 200,
        borderWidth: 2,
        borderColor: '#F79824',
        borderRadius: 20,
    },
    resultImageTouchable: {
        flex: 1,
        margin: 5,
        height: 200,
    },
    photoContainer: {
        flex: 1,
    },
    pageWrapper: {
        flex: 1,
    },
});