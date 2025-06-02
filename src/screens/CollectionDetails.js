import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { global } from '../config/global';

export default function CollectionDetailsScreen({ route, navigation }) {
    const [collectionData, setCollectionData] = useState();
    const { collectionId } = route.params;

    // Calls All images in collection with the provided ID

    const getCollectionData = () => {
        fetch('https://api.unsplash.com/collections/'+collectionId+'?client_id='+global.unsplashAccessKey)
        .then((response) => response.json())
        .then((json) => {
            setCollectionData(json);
        })
        .catch((error) => {
            console.error(error);
        });
    }


    useEffect(() => {
        getCollectionData();
    }, [collectionId]);

    // Returns the screen view with all images 

    return (
        <View style={styles.collectionDetailsScreen}>
            {collectionData ? (
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{collectionData.title}</Text>
                    {collectionData.preview_photos ? (
                    <FlatList 
                        data={ collectionData.preview_photos }
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.resultImageTouchable}
                                onPress={() => {
                                    navigation.navigate('Photo Details', {
                                        photoId: item.id,
                                    });
                                }}
                            >
                                <Image
                                    style={styles.resultImage}
                                    source={{uri: item.urls.regular}}
                                />
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                        style={{margin: 10, marginBottom: 10}}
                    />
                    ) : (
                        <View style={styles.noPhotos}>
                            <Text style={styles.noPhotosText}>Collection has no photos!</Text>
                        </View>
                    )}
                </View>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#000"/>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    collectionDetailsScreen: {
        backgroundColor: '#E6EBE0',
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 1,
    },
    noPhotos: {
        backgroundColor: '#000',
        borderWidth: 2,
        borderColor: '#F79824',
        borderRadius: 20,
        margin: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPhotosText: {
        color: '#FFF',
        fontSize: 16,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'Quicksand_700Bold',
    }  
});