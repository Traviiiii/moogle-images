import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { global } from '../config/global';
import SearchForm from '../components/SearchForm';
import { useFonts, Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'

export default function CollectionsScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_700Bold,
    })
    // Loads default query of 'nature' if nothing has been set
    const [searchQuery, setSearchQuery] = useState('Nature');
    const [collections, setCollections] = useState();

    // Searches API for collections with query
    const searchCollections = () => {
        fetch(`https://api.unsplash.com/search/collections?client_id=${global.unsplashAccessKey}&query=${searchQuery}&per_page=30`)
        .then((response) => response.json())
        .then((json) => {setCollections(json["results"]);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    useEffect(() => {
        searchCollections();
    }, [searchQuery]);

    if (!fontsLoaded) {
        return null;
    }

    // Returns page 
    return (
        <View style={styles.CollectionsScreen}>
            <View style={styles.SearchFormWrapper}>
                <SearchForm setSearchQuery={setSearchQuery} type="collections"/>
            </View>

            {collections ? (
                <FlatList
                    data={collections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.resultImageTouchable}
                            onPress={() => {
                                navigation.navigate('Collection Details', {
                                    collectionId: item.id,
                                });                                
                            }}>
                            {item.cover_photo ? (
                                <Image
                                    style={styles.resultImage}
                                    source={{uri: item.cover_photo.urls.regular}}
                                />
                            ) : (
                                <View style={styles.noImage}>
                                    <Text>No Preview</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                    numColumns={2}
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
    CollectionsScreen: {
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
    pageWrapper: {
        flex: 1,
    },
    noImage: {
        backgroundColor: '#b2bec3',
        height: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F79824',
        borderRadius: 20,
        margin: 5,
    }      
});
