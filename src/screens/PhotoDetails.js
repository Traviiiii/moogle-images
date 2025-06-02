import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, Linking } from 'react-native';
import { global } from '../config/global';

export default function PhotoDetailsScreen({ route, navigation }) {
    const { photoId } = route.params;
    const [photoData, setPhotoData] = useState();

    const getPhotoData = () => {
        fetch('https://api.unsplash.com/photos/'+photoId+'?client_id='+global.unsplashAccessKey)
            .then((response) => response.json())
            .then((json) => {
                setPhotoData(json);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getPhotoData();
    }, [photoId]);    

    return (
        <View style={styles.PhotoDetailsScreen}>
            {photoData ? (
                <View style={styles.detailsContainer}>
                    <Image
                        style={styles.photoImage}
                        source={{uri: photoData.urls.regular}}
                    />
                    <View style={styles.metaDataContainer}>
                        <Text style={styles.metaDataText}><Text style={{fontWeight: 'bold'}}>Photographer:</Text> {photoData.user.first_name} {photoData.user.last_name}</Text>
                        <Text style={styles.metaDataText}><Text style={{fontWeight: 'bold'}}>Location:</Text> {photoData.location?.title || 'Unknown'}</Text>
                        <Text style={styles.metaDataText}><Text style={{fontWeight: 'bold'}}>Num of views:</Text> {photoData.views}</Text>
                        <Text style={styles.metaDataText}><Text style={{fontWeight: 'bold'}}>Num of downloads:</Text> {photoData.downloads}</Text>
                        <Text style={[styles.metaDataText, {marginTop: 10}]}>
                            <Text style={{fontWeight: 'bold'}}>View Photo: </Text>
                            <Text style={styles.linkText} onPress={() => { Linking.openURL(photoData.links.html) }}>click here</Text>
                        </Text>
                        <Text style={styles.metaDataText}>
                            <Text style={{fontWeight: 'bold'}}>Download Photo: </Text>
                            <Text style={styles.linkText} onPress={() => { Linking.openURL(photoData.links.download) }}>click here</Text>
                        </Text>
                    </View>
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
    PhotoDetailsScreen: {
        backgroundColor: '#E6EBE0',
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
    },   
    detailsContainer: {
        flex: 1,
    },
    photoImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#F79824',
    }, 
    metaDataContainer: {
        margin: 20
    },
    metaDataText: {
        fontSize: 17,
        marginVertical: 4,
    },
    linkText: {
        color: '#F79824',
        textDecorationLine: 'underline',
    }
});