import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFonts, Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'

export default function SearchForm({setSearchQuery, type}) {
    const [fontsLoaded] = useFonts({
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_700Bold,
    })

    const [text, setText] = useState();

    const changeHandler = (val) => {
        setText(val);
    }

    const submitHandler = () => {
        Keyboard.dismiss();
        setSearchQuery(text);
    }    
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.searchForm}>
            <TextInput style={styles.input} placeholder={"Search "+type+"..."} onChangeText={changeHandler}/>
            <TouchableOpacity style={styles.searchButton} onPress={() => submitHandler()}>
                <Feather style={styles.icon} name="search" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchForm: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#E6EBE0',
        borderRadius: 10,
        borderColor: '#E6EBE0',
        borderWidth: 2,
    },
    input: {
        flexGrow: 1,
        color: '#000',
        paddingHorizontal: 8,
        fontFamily: 'Quicksand_400Regular',
    },
    searchButton: {
        width: 35,
        height: 35,
        padding: 2, 
        backgroundColor: '#000',
        borderRadius: 10,
    },
    icon: {
        flex: 1,
        justifyContent:'center',
        alignSelf:'center',
        lineHeight: 32, 
    }    
});
