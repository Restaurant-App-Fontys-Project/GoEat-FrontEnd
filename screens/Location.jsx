import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import {  getRestaurantsByLocation } from '../apiCalls/getRestaurantsByLocation'; // Import the fetchRestaurantsByCity function
import commonStyles from '../styles/commonStyles';

const Location = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    const handleSearch = async () => {
        try {
            const fetchedRestaurants = await getRestaurantsByLocation(searchText);
            setRestaurants(fetchedRestaurants);
            // Navigate to Home screen with search results
            navigation.navigate('Home', { restaurants: fetchedRestaurants, city: searchText });
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/backgrounds/location-bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Location"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleSearch} // Call handleSearch function when button is pressed
                >
                    <Text style={commonStyles.buttonText}>Search Restaurants</Text>
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
        marginLeft: 15,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%', 
        height: '100%', 
    },
});

export default Location;
