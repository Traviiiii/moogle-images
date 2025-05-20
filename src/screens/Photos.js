import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { global } from '../config/global';
import SearchForm from '../components/SearchForm';

export default function PhotosScreen({ navigation }) {  
    const [searchQuery, setSearchQuery] = useState('Beach');
    const [photos, setPhotos] = useState(null);

    const searchPhotos = () => {
        console.log("Searching for:", searchQuery);
        
        fetch(`https://api.unsplash.com/search/photos?client_id=${global.unsplashAccessKey}&query=${searchQuery}`)
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

    return (
        <View style={styles.PhotosScreen}>
            <SearchForm setSearchQuery={setSearchQuery} type="photos"/>

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
                    style={{margin: 10, marginBottom: 100}}                
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
    PhotosScreen: {},
    loadingContainer: {
        height: '100%',
        justifyContent: 'center'
    },
    resultImage: {
        flex: 1,
        height: 200
    },
    resultImageTouchable: {
        flex: 1,
        margin: 10,
        height: 200
    }    
});