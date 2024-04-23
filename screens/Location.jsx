import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image, KeyboardAvoidingView } from "react-native";
import {  getRestaurantsByLocation } from '../apiCalls/getRestaurantsByLocation'; // Import the fetchRestaurantsByCity function
import commonStyles from '../styles/commonStyles';
import GradientButton from '../styles/GradientButton';

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
               
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                 <Image source={require('../assets/logo1.png')} style={{ width: 160, height: 160, alignSelf: 'center' }} />
                    <Text style={styles.bigText}>
                        Discover Flavor, {'\n'}Reserve with Ease
                    </Text>
                {/* <Text style={styles.smallText}>
                    The perfect Restaurant for any occasion with our advanced search tools !
                </Text> */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Location"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={handleSearch} 
                >
                    <Text style={commonStyles.buttonText}>Search</Text>
                </TouchableOpacity> */}
                <GradientButton text="Search" onPress={handleSearch} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchInput: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        marginLeft: 15,
        marginTop:20,
        marginHorizontal: 20,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%', 
        height: '100%', 
    },
    bigText: {
        marginTop: 30,
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left'
    },
    smallText: {
        marginTop: 30,
        fontSize: 16,
        fontWeight: 'medium',
        color: 'white',
        textAlign: 'left'
    },
    button: {
        backgroundColor: '#C34F5A',
        padding: 10,
        marginTop: 20,
        borderRadius: 50,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
    },
});

export default Location;
