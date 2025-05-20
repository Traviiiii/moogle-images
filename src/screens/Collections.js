import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { global } from '../config/global';
import SearchForm from '../components/SearchForm';

export default function CollectionsScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('Cars');
    const [collections, setCollections] = useState();

    const searchCollections = () => {
        fetch('https://api.unsplash.com/search/collections?client_id='+global.unsplashAccessKey+'&query='+searchQuery)
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
    

return (
        <View style={styles.CollectionsScreen}>
            <SearchForm setSearchQuery={setSearchQuery} type="collections"/>

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
    },
    noImage: {
        backgroundColor: '#b2bec3',
        height: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }      
});
