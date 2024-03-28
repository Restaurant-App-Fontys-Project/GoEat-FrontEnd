import React, { useState  } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import commonStyles from '../styles/commonStyles';

const Location = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        // Implement search functionality here
        console.log('Search text:', searchText);
     
    };
    return (
        
        <View style={styles.container}>
        <ImageBackground
        source={require('../assets/backgrounds/location-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
            <TextInput
                style={styles.searchInput}
                placeholder="Choose Location"
                value={searchText}
                onChangeText={setSearchText}
            />
          
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('Home')}>
                <Text style={commonStyles.buttonText}>Explore Restaurants</Text>
            </TouchableOpacity>
        
    </ImageBackground>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%', 
        height: '100%', 

      },
});
export default Location;

