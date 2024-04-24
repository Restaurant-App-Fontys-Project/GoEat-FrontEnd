import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, Modal, FlatList } from "react-native";
import commonStyles from '../styles/commonStyles';
import citiesData from '../cities.json';
import { getRestaurantsByLocation } from '../apiCalls/getRestaurantsByLocation';
import GradientButton from '../styles/GradientButton';

const Location = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setCities(citiesData); 
    }, []);

    const handleSearch = async () => {
        try {
            const fetchedRestaurants = await getRestaurantsByLocation(selectedCity);
            setRestaurants(fetchedRestaurants);
            // Navigate to Home screen with search results
            navigation.navigate('Home', { restaurants: fetchedRestaurants, city: selectedCity });
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };
    

    const renderCityItem = ({ item }) => (
        <TouchableOpacity style={styles.cityItem} onPress={() => selectCity(item)}>
            <Text style={styles.cityText}>{item}</Text>
        </TouchableOpacity>
    );

    const selectCity = (city) => {
        setSelectedCity(city);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/backgrounds/location-bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/logoGE.png')} style={{ width: 160, height: 160, alignSelf: 'center' }} />
                    <Text style={styles.bigText}>
                        Discover Flavor, {'\n'}Reserve with Ease
                    </Text>
                    <TouchableOpacity style={styles.searchInput} onPress={() => setModalVisible(true)}>
                        <Text>{selectedCity || 'Select City'}</Text>
                    </TouchableOpacity>
                    <GradientButton text="Search" onPress={handleSearch} />
                </View>
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                       data={cities}
                       renderItem={renderCityItem}
                       keyExtractor={(item) => item}
                       contentContainerStyle={{ paddingTop: '5%', paddingBottom: '5%', paddingHorizontal: 20, width: '70%', backgroundColor: 'white', marginTop: '50%' }}
                    />
                </View>
            </Modal>
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
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    cityItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        width: '100%',
        backgroundColor: 'white',
    },
    cityText: {
        fontSize: 16,
    },
});

export default Location;
